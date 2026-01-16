import { prisma } from "../config/db.js";

const addToWatchList = async (req,res)=>{
    const {movieId,userId,status,rating,notes}=req.body;

    //Verify that the movie exists

    const movie = await prisma.movies.findUnique({
        where:{id:movieId}
    });

    if(!movie){
        return res.status(404).json({error:"Movie not found!!"})
    }
    //Check if movie is already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where:{userId_moviesId:{
            userId:userId,
            moviesId:movieId
        }}

    })
    if(existingInWatchlist){
        return res.status(400).json({error:"Movie already in the watchlist"})
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data:{
            userId,
            moviesId:movieId,
            status:status || "PLANNED",
            rating,
            notes
        }
    });
    res.status(201).json({
        status:"success",
        data:{
            watchlistItem
        }
    })
}
export {addToWatchList}