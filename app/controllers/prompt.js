import fs from "fs-extra";
import Mustache from "mustache";
import prisma from "../../prisma/index.js";

import {
  createChannelWrapper,
  mqConnectionEmitter,
  publishMessage,
} from "../services/rabbitmq.js";

mqConnectionEmitter.on("connected", () => {
  createChannelWrapper({
    name: "prompt",
    exchange: "prompt",
    queue: "prompt_queue_prompt",
    routingKey: "prompt.send",
  });
});

const sendPrompt = async prompt => {
  try {
    // Publish a message to the 'prompt' channel and capture the response
    const response = await publishMessage("prompt", prompt);
    console.log("Prompt message sent successfully!");
    console.log("Response:", response); // Log the response from publishing the message
    return response; // Return the response if needed for further processing
  } catch (error) {
    console.error("Error sending prompt message:", error);
    return null; // Return null or handle the error as needed
  }
};

const createPrompt = async (req, res) => {
  try {
    const parameters = req.body;
    console.log(parameters.promptTemplateId);
    const templateText = fs.readFileSync(
      `app/prompt-templates/${parameters.promptTemplateId}.txt`,
      "utf-8"
    );

    const arrangedParameters = {
      promptTemplateId: parameters.promptTemplateId,
      title: parameters.title,
      username: parameters.fields.includes("Username"),
      password: parameters.fields.includes("Password"),
      passwordAgain: parameters.fields.includes("Password Again"),
      mui: parameters.style,
      css: parameters.style,
      titleActive: parameters.titleExists,
    };

    const prompt = {
      templateName: "LoginRegister",
      text: Mustache.render(templateText, arrangedParameters),
    };

    const createdPrompt = await prisma.prompt.create({
      data: {
        text: prompt.text,
        parameters: parameters,
        promptTemplateId: parameters.promptTemplateId,
      },
    });
    console.log(prompt);

    res.status(201).json({
      message: "Prompt created successfully.",
      text: createdPrompt,
    });
  } catch (error) {
    console.error("Error updating prompt text:", error);
    res.status(500).json({ error: "Could not update prompt text" });
  }
};

const getPrompt = async (req, res) => {
  try {
    const prompt = await prisma.prompt.findFirst({
      orderBy: { createdAt: "desc" },
    });
    res.json(prompt.text);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { createPrompt, getPrompt, sendPrompt };
