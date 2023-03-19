import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movies-routes.js';
import bookingsRouter from './routes/booking-routes.js';

dotenv.config()

const app =express();
app.use(cors());
app.use(express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/bookings",bookingsRouter)


try {
mongoose.connect(process.env.MONGO_URL) 
console.log("mongodb server connected succesfully")
} catch (error) {
    console.log(error)
}
app.use("/",(err,req,res,next)=>{
    res.status(200).send("operation success")
    });


app.listen(9000,()=>{
    console.log('9000 server connected succesfully')
})