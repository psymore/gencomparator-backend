import prisma from "../../prisma/index.js";

const upsertApiKeys = async (req, res) => {
  try {
    const { PalmApiKey, OpenAiApiKey, BardApiKey, CodyApiKey } = req.body;

    const keysToSave = [
      { llmName: "PaLM", key: PalmApiKey },
      { llmName: "Open", key: OpenAiApiKey },
      { llmName: "Bard", key: BardApiKey },
      { llmName: "Cody", key: CodyApiKey },
    ];

    const savedKeys = await Promise.all(
      keysToSave.map(async keyData => {
        const apiKeys = await prisma.apiKey.upsert({
          where: { userId: req.userId, name: keyData.llmName },
          create: {
            userId: req.userId,
            name: keyData.llmName,
            key: keyData.key,
          },
          update: { userId: req.userId, key: keyData.key },
        });
        return apiKeys;
      })
    );

    res.json(savedKeys);
  } catch (error) {
    console.error("Error saving API keys:", error);
    res.status(500).json({ error: "Could not save API keys" });
  }
};

const getApiKeys = async (req, res) => {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: req.userId },
    });
    res.json(apiKeys);
  } catch (error) {
    console.error("Error saving API keys:", error);
    res.status(500).json({ error: "Could not save API keys" });
  }
};

export { upsertApiKeys, getApiKeys };
