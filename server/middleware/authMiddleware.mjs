import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "No Authorization header provided",
      });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Authorization format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      throw new Error("userId missing in token");
    }

    req.user = {
      userId: decoded.userId,
      role_id: decoded.role_id,
    };

    next();
  } catch (error) {
    console.error("Caught error in authMiddleware:", error);

    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;
