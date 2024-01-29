import prisma, { prismaEncrypted } from "../../prisma/index.js";

const upsertApiKeys = async (req, res) => {
  try {
    const { GeminiKey, OpenAiKey, AlephAlphaKey } = req.body;

    console.log(req.body);

    const keysToSave = [
      { llmName: "Gemini", key: GeminiKey },
      { llmName: "OpenAi", key: OpenAiKey },
      { llmName: "AlephAlpha", key: AlephAlphaKey },
      // { llmName: "Cody", key: CodyApiKey },
    ];

    keysToSave.forEach(async keyData => {
      if (!keyData.key) {
        return;
      }
      await prismaEncrypted.apiKey.upsert({
        where: { userId: req.userId, name: keyData.llmName },
        create: {
          userId: req.userId,
          name: keyData.llmName,
          key: keyData.key,
        },
        update: { userId: req.userId, key: keyData.key },
      });
    });

    res.json("ok");
  } catch (error) {
    console.error("Error saving API keys:", error);
    res.status(500).json({ error: "Could not save API keys" });
  }
};

const getApiKeys = async (req, res) => {
  try {
    const apiKeys = await prismaEncrypted.apiKey.findMany({
      where: { userId: req.userId },
    });

    res.json(apiKeys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    res.status(500).json({ error: "Could not fetch API keys" });
  }
};

export { upsertApiKeys, getApiKeys };
