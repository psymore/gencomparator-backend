import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sign, verify } from "jsonwebtoken";
import { isEmail } from "validator";
const jwt_secret = process.env.MY_SECRET;
import { v4 as uuidv4 } from "uuid";
import { send_magic_link } from "./emails.js";

const register = async email => {
  try {
    const newUser = {
      data: { email: email, MagicLink: uuidv4() },
    };
    const user = await prisma.User.create(newUser);
    send_magic_link(email, user.MagicLink, "signup");
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
    let user = await prisma.User.findUnique({ where: { email: email } });

    if (!user) {
      let reg = await register(email);
      return res.send({
        ok: true,
        message:
          "Your account has been created. Click the link in email to sign in 👻",
      });
    } else if (!magicLink) {
      user = await prisma.User.update({
        where: { email: email },
        data: { MagicLink: uuidv4(), MagicLinkExpired: false },
      });
      send_magic_link(email, user.MagicLink);
      return res.send({
        ok: true,
        message: "Hit the link in email to sign in",
      });
    } else if (user.MagicLink == magicLink && !user.MagicLinkExpired) {
      const token = sign({ userId: user.id }, jwt_secret, {
        expiresIn: "1h",
      });
      await prisma.User.update({
        where: { email: email },
        data: { MagicLinkExpired: true },
      });
      return res.json({ ok: true, message: "Welcome back", token, email });
    } else {
      return res.json({
        ok: false,
        message: "Magic link expired or incorrect 🤔",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.json({ ok: false, error });
  }
};

const verify_token = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.json({ ok: false, message: "Token not provided" });

  verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.json({ ok: false, message: "Token verification failed" });
    }
    return res.json({ ok: true, decoded });
  });
};

export default { login, verify_token };
