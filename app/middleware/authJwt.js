import jwt from "jsonwebtoken";

const jwtSecret = process.env.MY_SECRET;
const { verify } = jwt;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.json({ ok: false, message: "Token not provided" });

    verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error("Token verification failed");
      }

      req.userId = decoded.userId;

      console.log(decoded);
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

export { verifyToken };
