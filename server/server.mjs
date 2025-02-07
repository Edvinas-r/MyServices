import cors from "cors";
import routes from "./routes/index.mjs";
import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middleware/errorHandlerMiddleware.mjs";
import { connectDB } from "./database/postgresConnection.mjs";

if (process.env.NODE_ENV === "prod") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    const PORT = process.env.APP_PORT;

    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("failed", error);
    process.exit(1);
  }
};

startServer();
