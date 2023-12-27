import axios from "axios";

export async function useAlephAlpha() {
  try {
    const options = {
      method: "GET",
      url: "https://api.aleph-alpha.com/version",
      headers: {
        Accept: "text/plain",
      },
    };

    const response = await axios(options);
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    // Handle errors appropriately
  }
}
