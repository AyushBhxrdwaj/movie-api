import express from "express";
import {
  addToWatchList,
  removefromWatchlist,
  updatefromWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addToWatchList);
router.put("/:id",updatefromWatchlist);
router.delete("/:id", removefromWatchlist);
export default router;
