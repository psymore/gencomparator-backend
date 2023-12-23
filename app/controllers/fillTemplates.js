import Mustache from "mustache";
import { PrismaClient } from "@prisma/client";
import express, { json } from "express";

// ... rest of your code

const prisma = new PrismaClient();
const app = express();

app.use(json());

export const createPrompt = app => {
  app.post("/create-prompt", async (req, res) => {
    try {
      const { keywords } = req.body;

      const data = {
        linkStyle: keywords.includes("MUI Links") ? "MUI Links" : "<a> tags",
      };

      const templateText = "This is a {{linkStyle}} response template";

      const prompt = {
        templateName: "LoginRegister",
        responseText: Mustache.render(templateText, data),
      };

      const createdPrompt = await prisma.prompt.update({
        data: {
          template_name: prompt.templateName,
          pTLoginRegister: prompt.responseText,
          parameters: "",
        },
      });
      // res.status(201).json({ prompt: createdPrompt });
      res.json({ createdPrompt });
    } catch (error) {
      console.error("Error updating prompt text:", error);
      res.status(500).json({ error: "Could not update prompt text" });
    }
  });
};
