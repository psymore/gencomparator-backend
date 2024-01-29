import { AlephAlpha } from "alephalphajs";
import axios from "axios";

export async function useAlephAlpha() {
  const aleph = new AlephAlpha({
    API_TOKEN: process.env.ALEPH_ALPHA_KEY,
  });

  try {
    const response = await aleph.completion({
      prompt:
        "How to solve: This is longer than the model's maximum context length of 2048. To reduce the context size you would typically consider using a smaller prompt or limit the number of completion tokens. in your aleph.completion function?",
      model: "luminous-base-control",
      maximum_tokens: 2000,

      // stop_sequences: ["outlined requirements."],
    });

    const responsee = await axios(response);
    console.log(responsee.data);
  } catch (error) {
    console.error("Error:", error.message);
    // Handle errors appropriately
  }
}
