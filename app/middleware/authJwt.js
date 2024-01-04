import jwt from "jsonwebtoken";

const jwtSecret = process.env.MY_SECRET;
const { verify } = jwt;

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing." });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.json({ ok: false, message: "Token not provided" });

    verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error("Token verification failed");
      }

      req.userId = decoded.userId;
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

export { verifyToken };

// import jwt from "jsonwebtoken";

// const jwtSecret = process.env.MY_SECRET;
// const { verify } = jwt;

// const verifyToken = (req, res, next) => {
//   try {
//     const authorizationHeader = req.headers.authorization;
//     if (!authorizationHeader) {
//       return res.status(401).json({ error: "Authorization header missing." });
//     }
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//       return res.json({ ok: false, message: "Token not provided" });
//     }

//     verify(token, jwtSecret, (err, decoded) => {
//       if (err) {
//         console.error("Token verification failed:", err);
//         return res.status(401).json({ error: "Token verification failed" });
//       }

//       // Assign decoded userId to the request object
//       req.userId = decoded.userId;

//       console.log(decoded);

//       // Call next after the userId is set
//       next();
//     });
//   } catch (error) {
//     console.error("Error in verifyToken middleware:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { verifyToken };
