import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  //Verify that the movie exists

  const movie = await prisma.movies.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found!!" });
  }
  //Check if movie is already added
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_moviesId: {
        userId: req.user.id,
        moviesId: movieId,
      },
    },
  });
  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      moviesId: movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};
//deletion of the watchlist item

const removefromWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Movie not found..." });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to delete this item" });
  }
  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({
    status: "Success",
    message: "Movie successfully removed..",
  });
};

const updatefromWatchlist = async (req, res) => {
  const { status, rating, notes } = req.body;
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchlistItem) {
    return res.status(404).json({ error: "Movie not found..." });
  }
  if (watchlistItem.userId !== res.user.id) {
    return res.status(403).json({ error: "Operation not allowed.." });
  }
  //Build update data

  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;
};
export { addToWatchList, removefromWatchlist, updatefromWatchlist };
