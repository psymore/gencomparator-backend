import express, { json } from "express";
import cors from "cors";
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// app.use(require("express").urlencoded({ extended: true }));
app.use(json());

// import { upsertApiKeys } from "./app/controllers/apiKey.js";
// app.use(upsertApiKeys);

import userRoutes from "./app/routes/user.js";
app.use("/users", userRoutes);

import { verifyToken } from "./app/middleware/authJwt.js";
app.use("/users/verify", verifyToken);

import {
  createPromptTemplates,
  getPromptTemplates,
} from "./app/controllers/promptTemplate.js";
app.use(createPromptTemplates);
app.use(getPromptTemplates);

import { createPrompt } from "./app/controllers/prompt.js";
app.use(createPrompt);

// import { useGemini } from "./app/llms/generativeAi.js";
// useGemini();

// import { useChatGpt } from "./app/llms/openAi.js";
// useChatGpt();

// import { useAlephAlpha } from "./app/llms/alephAlpha.js";
// useAlephAlpha();

app.listen(3001, () => console.log(`Server running on port ${3001}`));
