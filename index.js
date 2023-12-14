const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await prisma.user.create({
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

    const updatedUser = await prisma.user.update({
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

    const deletedUser = await prisma.user.delete({
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

app.listen(3001, () => console.log(`Server running on port ${3001}`));
