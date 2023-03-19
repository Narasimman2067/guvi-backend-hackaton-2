import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movies from "../models/Movies.js";
import User from "../models/User.js";

export const newBookings = async (req, res, next) => {
  const { movie, seatNumber, date, user } = req.body;
  let existingMovie;
  let existingUser;
  try {
    existingMovie =await Movies.findById(movie)
    existingUser =await User.findById(user);
  } catch (error) {
    return console.log(error)
  }
  if (!existingMovie) {
    return res.status(500).json({ message: "Movie Not Found with Given ID" });
  }
  if (!existingUser) {
    return res.status(500).json({ message: "User Not Found with Given ID" });
  }

  
  let bookings;

  try {
    bookings = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    // bookings = await bookings.save();
    const session =await mongoose.startSession();
    session.startTransaction();
    await bookings.save({session})
    existingUser.bookings.push(bookings);
    existingMovie.bookings.push(bookings);
    await existingMovie.save({session})
    await existingUser.save({session})
    session.commitTransaction();

  } catch (error) {
    return console.log(error);
  }
  if (!bookings) {
    return res.status(500).json({ message: "unable to create bookings" });
  }
  return res.status(201).json({ bookings });
};

export const getAllbookings = async (req, res, next) => {
    let bookings;
    try {
      bookings = await Bookings.find();
      if (!bookings) {
        return res.status(500).Json({ message: "unexpected Error Occured" });
      }
      return res.status(200).json({ bookings });
    } catch (error) {
      return console.log(error);
    }
  };

  export const getBookingsById = async (req, res, next) => {
    const id =req.params.id;
    let booking;
    try {
        // bbokings creating
      booking = await Bookings.findById(id);
    } catch (error) {
      return console.log(error)
    }
    if (!booking) {
      return res.status(404).json({ message: "unexpected Error Occured" });
    }
    return res.status(200).json({ booking});
    } ;




    export const deleteBookings= async (req, res, next) => {
    //    get id using params
        const id = req.params.id;
    //   declare delete booking
      let booking;
      try {
     booking = await Bookings.findByIdAndRemove(id).populate("user movie");
     const session =await mongoose.startSession();
     session.startTransaction();
     await booking.user.bookings.pull(booking)
     await booking.movie.bookings.pull(booking)
     await booking.movie.save({session})
     await booking.user.save({session})
     await session.commitTransaction();  
    
    
    } catch (err) {
       return console.log(err)
      }
      if (!booking) {
      return res.status(500).json({ message: "something went wrong" });
      }
      res.status(200).json({ message: "deleted succesfully" });
      };
      


