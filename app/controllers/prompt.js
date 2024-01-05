import fs from "fs-extra";
import Mustache from "mustache";
import prisma from "../../prisma/index.js";

<<<<<<< Updated upstream
const getPromptTemplateId = async () => {
  try {
    const template = await prisma.promptTemplate.findFirst({});
    console.log(template.id);
    return template.id;
  } catch (error) {
    console.error(error);
    return null;
=======
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

const sendPrompt = async (req, res, next) => {
  try {
    const response = await prepareToSendPrompt(); // Fetch last created prompt
    console.log(req.userId);
    console.log(req);
    // console.log("Response:", getPrompt());
    if (response) {
      const message = {
        userId: req.userId,
        promptText: response,
        promptTemplateId: req.promptTemplateId,
      };
      console.log(message);
      const sendPromptToLlms = await publishMessage(
        "prompt",
        message.promptText,
        message.promptTemplateId
        // message.userId
      ); // Send the prompt text
      console.log("Prompt message sent successfully!");
      console.log("Sent Response:", sendPromptToLlms); // Log the sent response
    }
    next();
  } catch (error) {
    console.error("Error sending prompt message:", error);
>>>>>>> Stashed changes
  }
};

const createAndSendPrompt = async (req, res) => {
  try {
    const templateId = await getPromptTemplateId();

    const parameters = req.body;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    const templateText = fs.readFileSync(
      "app/prompt-templates/LoginRegister.txt",
      "utf-8"
    );

    const arrangedParameters = {
      title: parameters.title,
      username: parameters.fields.includes("Username"),
      password: parameters.fields.includes("Password"),
      passwordAgain: parameters.fields.includes("Password Again"),
      mui: parameters.style,
      css: parameters.style,
      titleActive: parameters.titleExists,
    };
    console.log(parameters.titleExists);

    const prompt = {
      templateName: "LoginRegister",
      text: Mustache.render(templateText, arrangedParameters),
    };

<<<<<<< Updated upstream
    const createdPrompt = await prisma.prompt.create({
      data: {
        text: prompt.text,
        parameters: parameters,
        promptTemplateId: templateId,
      },
    });

    console.log("req.body:", req.body);
    res.status(201).json({
      message: "Prompt created successfully.",
      text: createdPrompt,
=======
    console.log("MY req:", req.userId);

    const existingPrompt = await prisma.prompt.findFirst({
      where: { userId: req.userId },
>>>>>>> Stashed changes
    });

    console.log(existingPrompt);
    if (!existingPrompt) {
      const createdPrompt = await prisma.prompt.create({
        data: {
          userId: req.userId,
          text: prompt.text,
          parameters: parameters,
          promptTemplateId: parameters.promptTemplateId,
        },
      });
      const sendPromptToLlms = await publishMessage("prompt", createdPrompt);
      return res.json({
        message: "Created a new prompt and sent to llm",
        prompt: createdPrompt,
      });
    }
    if (existingPrompt) {
      const updatedPrompt = await prisma.prompt.create({
        data: {
          userId: req.userId,
          text: prompt.text,
          parameters: parameters,
          promptTemplateId: parameters.promptTemplateId,
        },
      });
      const sendPromptToLlms = await publishMessage("prompt", updatedPrompt);
      console.log("Message published.");
      return res.json({
        message: "Created a new prompt and sent to llm",
        prompt: updatedPrompt,
      });
    }

    console.log("Updated existing prompt:", updatedPrompt);

    res.json({ message: "An error ocurred." });
  } catch (error) {
    console.error("Error updating prompt text:", error);
    res.status(500).json({ error: "Could not update prompt text" });
  }
};

const getPrompt = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const prompt = await prisma.prompt.findFirst({});
    console.log(prompt.text);
    res.json(prompt.text);
=======
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
const prepareToSendPrompt = async (req, res) => {
  try {
    const latestPrompt = await prisma.prompt.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const promptText = latestPrompt ? latestPrompt.text : null;
    const promptTemplateId = latestPrompt.promptTemplateId;

    console.log(promptText);
    return promptText, promptTemplateId;
>>>>>>> Stashed changes
  } catch (error) {
    console.error(error);
    return null;
  }
};

<<<<<<< Updated upstream
export { createPrompt, getPrompt };
=======
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
>>>>>>> Stashed changes
