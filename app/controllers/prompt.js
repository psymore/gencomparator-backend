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

const createAndSendPrompt = async (req, res) => {
  try {
    const parameters = req.body;

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

    console.log("createAndSendPrompt req.userId:", req.userId);

    const existingPrompt = await prisma.prompt.findFirst({
      where: { userId: req.userId },
    });

    console.log("existingPrompt", existingPrompt);
    if (!existingPrompt) {
      const createdPrompt = await prisma.prompt.create({
        data: {
          userId: req.userId,
          text: prompt.text,
          parameters: parameters,
          promptTemplateId: parameters.promptTemplateId,
        },
      });
      console.log("existingPrompt", createdPrompt.id);

      const sendPromptToLlms = await publishMessage("prompt", createdPrompt.id);
      console.log("Message published.", createdPrompt.id);

      // return res.json({
      //   message: "Created a new prompt and sent to llm",
      //   prompt: createdPrompt,
      // });
    }

    if (existingPrompt) {
      const createdPrompt = await prisma.prompt.create({
        data: {
          userId: req.userId,
          text: prompt.text,
          parameters: parameters,
          promptTemplateId: parameters.promptTemplateId,
        },
      });
      const sendPromptToLlms = await publishMessage("prompt", createdPrompt.id);
      console.log("Message published.", createdPrompt.id);

      // return res.json({
      //   message: "Created a new prompt and sent to llm",
      //   prompt: updatedPrompt,
      // });
    }

    res.json({ message: "An error ocurred." });
  } catch (error) {
    console.error("Error updating prompt text:", error);
    res.status(500).json({ error: "Could not update prompt text" });
  }
};

const getPrompt = async (req, res) => {
  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: { createdAt: "desc" },
    });

    const promptTexts = prompts.map(prompt => prompt.text);

    res.status(200).json(promptTexts);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getResponse = async (req, res) => {
  try {
    const llmResponse = await prisma.prompt.findMany({
      orderBy: { createdAt: "desc" },
    });
    const llmResponses = llmResponse.map(response => response.response);
    res.status(200).json(llmResponses);
  } catch (error) {
    console.error(error);
  }
};

export { getPrompt, createAndSendPrompt, getResponse };
