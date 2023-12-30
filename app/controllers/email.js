import {
  createChannelWrapper,
  mqConnectionEmitter,
  publishMessage,
} from "../services/rabbitmq.js";

const URL = "http://localhost:3000/enter/";

mqConnectionEmitter.on("connected", () => {
  createChannelWrapper({
    name: "email",
    exchange: "email",
    queue: "email_queue_email",
    routingKey: "email.send",
  });
});

const sendMagicLink = async (email, link, which) => {
  if (which == "signup") {
    var subj = "Your sign up link",
      body =
        "<p>Hello friend and welcome to our website. This is your link to confirm your account: " +
        (URL + email + "/" + link) +
        "</p><p>Needless to remind you not to share this link with anyone 🤫</p>";
  } else {
    var subj = "Your sign in link",
      body =
        "<p>Hello friend and welcome back. This is your link to sign in to your account: " +
        (URL + email + "/" + link) +
        "</p><p>Needless to remind you not to share this link with anyone 🤫</p>";
  }
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subj,
    html: body,
  };

  publishMessage("email", mailOptions);
};

export default sendMagicLink;
