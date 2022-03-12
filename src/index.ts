import express, { Request, Response, NextFunction } from "express";

import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      if (err.message === "Not Found") {
        return response.status(404).json({
          error: err.message,
        });
      }

      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error.",
    });
  }
);

export { app };
