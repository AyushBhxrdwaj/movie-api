import "dotenv/config";
import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";
//import routes
import movieRoutes from "./routes/movieRoutes.js";
connectDB();
const app = express();

//api routes
app.use("/movies", movieRoutes); //localhost:5000/movies/hello

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandled exception: ", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.log("uncaught exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("sigterm received");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
