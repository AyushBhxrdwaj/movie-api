import express from 'express'

const router = express.Router()

router.get("/hello",(req,res)=>{
    res.json({message:'hello'})
})

router.get("/",(req,res)=>{
    res.json({message:'get req'})
})

router.post("/",(req,res)=>{
    res.json({message:"post req"})
})

router.put("/",(req,res)=>{
    res.json({message:"put req"})
})

router.delete("/",(req,res)=>{
    res.json({message:"delete req"})
})

export default router

