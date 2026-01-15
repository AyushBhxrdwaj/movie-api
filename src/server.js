import "dotenv/config";
import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";
//import routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"

connectDB();


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//api routes
app.use("/movies", movieRoutes); //localhost:5000/movies/
app.use("/auth",authRoutes)
app.use("/watchlist",watchlistRoutes)

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
