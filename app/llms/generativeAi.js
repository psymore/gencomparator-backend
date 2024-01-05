// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs-extra";

// const geminiKey = process.env.GEMINI_KEY;

// if (!geminiKey) {
//   console.error(
//     "No API key found. Please set the GEMINI_KEY environment variable."
//   );
//   process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(geminiKey);

// export async function useGemini() {
//   try {
//     const generationConfig = {
//       stopSequences: ["red"],
//       maxOutputTokens: 2000,
//       temperature: 0.9,
//       topP: 0.1,
//       topK: 16,
//     };

//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro",
//       generationConfig,
//     });

//     const prompt = fs.readFileSync(
//       "app/prompt-templates/LoginRegister.txt",
//       "utf-8"
//     );

//     // const prompt = "What is gemini-pro's character limit for a single prompt?";
//     console.log(prompt);
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     console.log(text);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiKey = process.env.GEMINI_KEY;

if (!geminiKey) {
  console.error(
    "No API key found. Please set the GEMINI_KEY environment variable."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiKey);

const prompt = "Write me a react code for a textfield using mui.";

const useGemini = async () => {
  // Pass prompt as a parameter
  try {
    const generationConfig = {
      stopSequences: ["red"],
      maxOutputTokens: 2000,
      temperature: 0.9,
      topP: 0.1,
      topK: 16,
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
    });

    // Use the passed prompt parameter instead of reading from a file
    console.log(prompt);
    const result = await model.generateContent(prompt);
    // console.log("Result:", result);ö
    const response = result.response;
    // console.log("Response Object:", response); // Log and inspect the response object
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default useGemini;
