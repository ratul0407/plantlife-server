import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose
      .connect(envVars.DB_URL)
      .then(() => console.log("Connected to mongodb"));
    server = app.listen(envVars.PORT, () => {
      console.log(`Server listening from port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection detected.... Shutting server down....");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
