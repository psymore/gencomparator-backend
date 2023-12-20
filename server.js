const { PrismaClient } = require("@prisma/client");

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
// const setupLoginRoute = require("./routes/login");
// const setupAddRoute = require("./routes/add");
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// app.use(require("express").urlencoded({ extended: true }));
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const allUsers = await prisma.User.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await prisma.User.create({
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

    const updatedUser = await prisma.User.update({
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

    const deletedUser = await prisma.User.delete({
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

app.post("/prompt-template", async (req, res) => {
  try {
    const { text } = req.body;

    const promptTemplate = await prisma.Prompt_template.create({
      data: {
        text: text,
        api_key_id: "asdasd",
      },
    });
    res.json(promptTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the prompt template" });
  }
});

require("./app/routes/api_keys.routes")(app);
app.use("/users", require("./app/routes/users"));

// //SSO Login from https://hackernoon.com/how-to-build-a-passwordless-authentication-with-email-and-jwt-o33w3311
// app.post("/login", (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     res.status(404);
//     res.send({
//       message: "You didn't enter a valid email address.",
//     });
//   }
//   const token = makeToken(email);
//   const mailOptions = {
//     from: "You Know",
//     html: emailTemplate({
//       email,
//       link: `http://localhost:8080/account?token=${token}`,
//     }),
//     subject: "Your Magic Link",
//     to: email,
//   };
//   return transport.sendMail(mailOptions, error => {
//     if (error) {
//       res.status(404);
//       res.send("Can't send email.");
//     } else {
//       res.status(200);
//       res.send(
//         `Magic link sent. : http://localhost:8080/account?token=${token}`
//       );
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });

app.listen(3001, () => console.log(`Server running on port ${3001}`));
