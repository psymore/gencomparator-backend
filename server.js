import { PrismaClient } from "@prisma/client";

import express, { json } from "express";
import cors from "cors";
const app = express();
import path from "path";
// const setupLoginRoute = require("./routes/login");
// const setupAddRoute = require("./routes/add");
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// app.use(require("express").urlencoded({ extended: true }));
app.use(json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const allUsers = await prisma.User.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await prisma.User.create({
      data: {
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newEmail = req.body.email;

    const updatedUser = await prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });

    console.log("Updated user:", updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the user" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await prisma.User.delete({
      where: {
        id: userId,
      },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the user" });
  }
});

app.post("/prompt-template", async (req, res) => {
  try {
    const { text } = req.body;

    const promptTemplate = await prisma.Prompt_template.create({
      data: {
        text: text,
        api_key_id: "asdasd",
      },
    });
    res.json(promptTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the prompt template" });
  }
});

// require("./app/routes/api_keys.routes.js").default(app);
import { saveApiKeys } from "./app/routes/api_keys.routes.js";
saveApiKeys(app);
// app.use("/users", require("./app/routes/users"));
import userRoutes from "./app/routes/users.js";
app.use("/users", userRoutes);

import { createPrompt } from "./app/controllers/fillTemplates.js";
createPrompt(app);

app.listen(3001, () => console.log(`Server running on port ${3001}`));
