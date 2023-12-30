import fs from "fs-extra";
import Mustache from "mustache";
import prisma from "../../prisma/index.js";

const getPromptTemplateId = async (req, res) => {
  try {
    const template = await prisma.promptTemplate.findFirst({});
    return template.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createPrompt = async (req, res) => {
  try {
    const templateId = await getPromptTemplateId();
    const { titleActive, title, mui, css, promptTemplateId } = req.body;

    const templateText = fs.readFileSync(
      "app/prompt-templates/LoginRegister.txt",
      "utf-8"
    );

    const parameters = {
      titleActive: titleActive,
      title: title,
      mui: mui,
      css: css,
      promptTemplateId: templateId,
    };

    const prompt = {
      templateName: "LoginRegister",
      text: Mustache.render(templateText, parameters),
    };

    const createdPrompt = await prisma.prompt.create({
      data: {
        text: prompt.text,
        promptTemplateId,
      },
    });

    console.log("req.body:", req.body);
    res
      .status(201)
      .json({ message: "Prompt created successfully.", text: createdPrompt });
  } catch (error) {
    console.error("Error updating prompt text:", error);
    res.status(500).json({ error: "Could not update prompt text" });
  }
};

export { createPrompt };
