import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveApiKeys = app => {
  app.post("/save-keys", async (req, res) => {
    try {
      const { userId, PalmApiKey, OpenAiApiKey, BardApiKey, CodyApiKey } =
        req.body;

      const keysToSave = [
        { llmName: "PaLM", key: PalmApiKey },
        { llmName: "Open", key: OpenAiApiKey },
        { llmName: "Bard", key: BardApiKey },
        { llmName: "Cody", key: CodyApiKey },
      ];

      const savedKeys = await Promise.all(
        keysToSave.map(async keyData => {
          const apiKeys = await prisma.api_keys.upsert({
            where: { name: keyData.llmName },
            create: { name: keyData.llmName, key: keyData.key },
            update: { key: keyData.key },
          });
          return apiKeys;
        })
      );

      res.json(savedKeys);
    } catch (error) {
      console.error("Error saving API keys:", error);
      res.status(500).json({ error: "Could not save API keys" });
    }
  });
};
