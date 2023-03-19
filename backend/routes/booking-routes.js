import express from "express";
import { deleteBookings, getAllbookings, getBookingsById, newBookings } from "../controllers/booking-controllers.js";



const bookingsRouter=express.Router()

bookingsRouter.post("/",newBookings)
bookingsRouter.get("/",getAllbookings)
bookingsRouter.get("/:id",getBookingsById)
bookingsRouter.delete("/:id",deleteBookings)

export default bookingsRouter