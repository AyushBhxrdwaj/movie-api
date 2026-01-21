import express from "express";
import {
  addToWatchList,
  removefromWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchList);
router.delete("/:id", removefromWatchlist);
export default router;
