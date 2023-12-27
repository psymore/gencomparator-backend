import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
const { sign } = jwt;

import isEmail from "validator/lib/isEmail.js";
const jwtSecret = process.env.MY_SECRET;
import { v4 as uuidv4 } from "uuid";
import sendMagicLink from "./emails.js";

const register = async email => {
  try {
    const newUser = {
      data: { email: email, magicLink: uuidv4() },
    };
    const user = await prisma.user.create(newUser);
    sendMagicLink(email, user.magicLink, "signup");
    return { ok: true, message: "User created" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { ok: false, error };
  }
};

const login = async (req, res) => {
  const { email, magicLink } = req.body;
  if (!email)
    return res.json({ ok: false, message: "All fields are required" });
  if (!isEmail(email))
    return res.json({ ok: false, message: "Invalid email provided" });

  try {
    let user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      let reg = await register(email);
      return res.send({
        ok: true,
        message:
          "Your account has been created. Click the link in email to sign in 👻",
      });
    }

    if (!magicLink) {
      user = await prisma.user.update({
        where: { email: email },
        data: { magicLink: uuidv4(), magicLinkExpired: false },
      });
      sendMagicLink(email, user.magicLink);
      return res.send({
        ok: true,
        message: "Hit the link in email to sign in",
      });
    }

    if (user.magicLink == magicLink && !user.magicLinkExpired) {
      const token = sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      await prisma.user.update({
        where: { email: email },
        data: { magicLinkExpired: true },
      });
      return res.json({ ok: true, message: "Welcome back", token, email });
    }

    return res.json({
      ok: false,
      message: "Magic link expired or incorrect 🤔",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.json({ ok: false, error });
  }
};

export default { login };
