import express from "express";
import { deleteUsers, editUpdateUsers, getAllUsers, getBoookingsOfUser, loginUser, signUp } from "../controllers/user-controller.js";



const userRouter=express.Router()

userRouter.get("/",getAllUsers)
userRouter.post("/signup",signUp)
userRouter.post("/login",loginUser)
userRouter.put("/:id",editUpdateUsers)
userRouter.delete("/:id",deleteUsers)

userRouter.get("/bookings/:id",getBoookingsOfUser)

export default userRouter