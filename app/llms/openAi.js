import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function useChatGpt() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: "Who won the world series in 2020?" },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = chatCompletion;
  console.log(JSON.stringify(response));
}
