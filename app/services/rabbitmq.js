import amqp from "amqp-connection-manager";

const { RABBITMQ_PASS, RABBITMQ_USER, RABBITMQ_HOST, RABBITMQ_PORT } =
  process.env;

import EventEmitter from "events";

const mqConnectionEmitter = new EventEmitter();

const connection = amqp.connect([
  `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
]);

connection.on("connect", function () {
  console.log("Rabbit MQ service successfully connected.");
  mqConnectionEmitter.emit("connected");
});

connection.on("disconnect", function (err) {
  console.log("Rabbit MQ service disconnected.", err);
  mqConnectionEmitter.emit("disconnected");
});

let channelWrapper;

const createChannelWrapper = ({ name, exchange, queue, routingKey }) => {
  try {
    channelWrapper = {
      ...channelWrapper,
      [name]: {
        exchange,
        queue,
        routingKey,
      },
    };

    const wrapper = connection.createChannel({
      json: true,
      setup: function (channel) {
        // channel here is a regular amqplib ConfirmChannel.
        // Note that this here is the channelWrapper instance.
        return Promise.all([
          channel.assertExchange(exchange, "topic"),
          channel.assertQueue(queue, { durable: true, expires: 86400000 }),
          channel.bindQueue(queue, exchange, routingKey),
        ]);
      },
    });

    channelWrapper = {
      ...channelWrapper,
      [name]: {
        ...channelWrapper[name],
        wrapper,
      },
    };
    return wrapper;
  } catch (e) {
    console.log(e);
  }
};

const publishMessage = async (channelName, data) => {
  try {
    if (!channelWrapper?.[channelName]) {
      console.log(`No channel wrapper for this channel name: ${channelName}.`);
      return;
    }

    const { wrapper, exchange, routingKey } = await channelWrapper[channelName];

    await wrapper.publish(exchange, routingKey, data, {
      contentType: "application/json",
      persistent: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  mqConnectionEmitter,
  channelWrapper,
  createChannelWrapper,
  publishMessage,
};
