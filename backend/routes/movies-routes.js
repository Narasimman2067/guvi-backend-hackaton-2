import express from "express";
import { addMovies, deleteMovies, getAllMovies, getMoviesById } from "../controllers/movie-controllers.js";



const movieRouter=express.Router()
movieRouter.post("/addmovies",addMovies)
movieRouter.get("/",getAllMovies)
movieRouter.get("/:id",getMoviesById)
movieRouter.delete("/:id",deleteMovies)


export default movieRouter