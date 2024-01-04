import cors from "cors";
import express, { json } from "express";
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// app.use(require("express").urlencoded({ extended: true }));
app.use(json());

import {
  default as getApiKeys,
  default as upsertApiKeys,
} from "./app/routes/apiKey.js";

app.use(upsertApiKeys);
app.use(getApiKeys);

import userRoutes from "./app/routes/user.js";
app.use("/users", userRoutes);

import { verifyToken } from "./app/middleware/authJwt.js";
app.use("/users/verify", verifyToken);

import { createPromptTemplates } from "./app/controllers/promptTemplate.js";
createPromptTemplates();

import promptTemplateRoutes from "./app/routes/promptTemplate.js";
app.use(promptTemplateRoutes);

import promptRoutes from "./app/routes/prompt.js";
app.use(promptRoutes);

// import { useGemini } from "./app/llms/generativeAi.js";
// useGemini();

// import { useChatGpt } from "./app/llms/openAi.js";
// useChatGpt();

// import { useAlephAlpha } from "./app/llms/alephAlpha.js";
// useAlephAlpha();

app.listen(3001, () => console.log(`Server running on port ${3001}`));
