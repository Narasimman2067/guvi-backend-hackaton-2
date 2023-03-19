import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movies from "../models/Movies.js";

export const addMovies = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "token not found" });
  }
  let adminId;
  // verify the token first

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  // create new movie

  const { title, description, releaseDate, posterUrl, featured,actors} = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !actors &&
    actors.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }
  let movie;
  try {
    movie = new Movies({
      title,
      actors,
      description,
      releaseDate:new Date( `${releaseDate}`),
      posterUrl,
      featured,
      admin:adminId,
    });
      
    // movie =await movie.save();it is used when the backend are not related 
  // relation has done with admin
    const session =await mongoose.startSession();
  const adminUser =await Admin.findById(adminId);
  session.startTransaction();
  await movie.save({session})
  adminUser.addedMovies.push(movie);
  await adminUser.save({session})
  await session.commitTransaction();
 
  } catch (error) {
    return console.log(error);
  }
  if(!movie){

    return res.status(500).json({message:"request failed"})

  }
  return res.status(201).json({movie})

};




export const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movies.find();
    if (!movies) {
      return res.status(500).Json({ message: "unexpected Error Occured" });
    }
    return res.status(200).json({ movies });
  } catch (error) {
    return console.log(error);
  }
};

export const getMoviesById = async (req, res, next) => {
const id =req.params.id;
let movie;
try {
  movie = await Movies.findById(id);
} catch (error) {
  return console.log(error)
}
if (!movie) {
  return res.status(404).json({ message: "unexpected Error Occured" });
}
return res.status(200).json({ movie });
} ;







// delete movies
export const deleteMovies = async (req, res, next) => {
  const id = req.params.id;

let movie1
try {
movie1 = await Movies.findByIdAndDelete(id, {
   
  });
} catch (err) {
 return console.log(err)
}
if (!movie1) {
return res.status(500).json({ message: "something went wrong" });
}
res.status(200).json({ message: "deleted succesfully" });
};





