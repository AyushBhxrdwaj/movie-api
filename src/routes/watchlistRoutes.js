import express from "express";
import {
  addToWatchList,
  removefromWatchlist,
  updatefromWatchlist,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { watchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/",validateRequest(watchlistSchema),addToWatchList);
router.put("/:id",updatefromWatchlist);
router.delete("/:id", removefromWatchlist);
export default router;
