import prisma from "../../prisma/index.js";

const createPromptTemplates = async (req, res) => {
  try {
    const requestData = [
      {
        name: "Login-Register Page",
        description: "A switchable login and register page in one function.",
        titleExists: true,
        isActive: true,
        fields: {
          username: "Username",
          email: "Email",
          password: "Password",
          passwordAgain: "Password Again",
        },
        cssFrameworks: {
          mui: "mui",
          css: "css",
        },
      },
      {
        name: "Login Page",
        description: "A single page login form.",
        titleExists: true,
        isActive: true,
        fields: {
          username: "Username",
          email: "Email",
          password: "Password",
        },
        cssFrameworks: {
          mui: "mui",
          css: "css",
        },
      },
      {
        name: "Register Page",
        description: "A single page register form.",
        titleExists: true,
        isActive: true,
        fields: {
          username: "Username",
          email: "Email",
          password: "Password",
          passwordAgain: "Password Again",
        },
        cssFrameworks: {
          mui: "mui",
          css: "css",
        },
      },
    ];

    const foundTemplates = await prisma.promptTemplate.findMany();

    if (foundTemplates.length === 0) {
      const promptTemplateList = await prisma.promptTemplate.createMany({
        data: requestData,
      });
      // res.json({ promptTemplateList });
      return;
    }
  } catch (error) {
    console.error("Error creating prompt templates:", error);
    res.status(500).json({ error: "Could not create prompt templates" });
    if (res) {
      res.status(500).json({ error: "Could not create prompt templates" });
    } else {
      console.error("Response object 'res' is undefined");
    }
  }
};

const getPromptTemplates = async (req, res) => {
  try {
    const promptTemplates = await prisma.promptTemplate.findMany();
    res.json({ promptTemplates });
  } catch (error) {
    console.error("Error fetching prompt text:", error);
    res.status(500).json({ error: "Could not fetch prompt templates" });
  }
};

export { getPromptTemplates, createPromptTemplates };
