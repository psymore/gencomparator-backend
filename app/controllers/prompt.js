import fs from "fs-extra";
import Mustache from "mustache";
import prisma from "../../prisma/index.js";

const getPromptTemplateId = async () => {
  try {
    const template = await prisma.promptTemplate.findFirst({});
    console.log(template.id);
    return template.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createPrompt = async (req, res) => {
  try {
    const templateId = await getPromptTemplateId();

    const parameters = req.body;

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
    });
  } catch (error) {
    console.error("Error updating prompt text:", error);
    res.status(500).json({ error: "Could not update prompt text" });
  }
};

const getPrompt = async (req, res) => {
  try {
    const prompt = await prisma.prompt.findFirst({});
    console.log(prompt.text);
    res.json(prompt.text);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { createPrompt, getPrompt };
