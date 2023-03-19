import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req, res, next) => {
  let user;
  try {
    user = await User.find();
    if (!user) {
      return res.status(500).json({ message: "unexpected Error Occured" });
    }
    return res.status(200).json({user });
  } catch (error) {
    return console.log(error);
  }
};
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occcured" });
  }
  return res.status(201).json({id:user._id,message:"user created succesfully" });
};

// login user
export const loginUser=async (req,res,next)=>{
  // it checks the body data of login
  const{email,password}=req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }
  let existingUser;
  try {
    existingUser=await User.findOne({email})
  } catch (error) {
    return console.log(error)
  }
  if (!existingUser) {
    return res.status(500).json({ message: "unable to find the Admin from this id" });
    }
    
  
  const isPasswordCorrect =bcrypt.compareSync(password,existingUser.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect email or password" });
    }
    // creating of token to provide secret key
    const token =jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{
      
    });   

    res.status(200).json({ message: "Authentication complete",token,id:existingUser._id });
 
}

// export const loginUser =async (req,res,next)=>{
//   // it checks the body data of login
//   const{email,password}=req.body;
//   if (
//     !email &&
//     email.trim() === "" &&
//     !password &&
//     password.trim() === ""
//   ) {
//     return res.status(422).json({ message: "invalid inputs" });
//   }
//   let user;
//   try {
//     user=await User.findOne({email})
//   } catch (error) {
//     return console.log(error)
//   }
//   if (!user) {
//     return res.status(500).json({ message: "unable to find the user from this id" });
//     }
    
  
//   const isPasswordCorrect =bcrypt.compareSync(password,user.password)
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "incorrect email or password" });
//     }
//     res.status(200).json({ id:user._id ,message:"login succesfully"});
    

// }

export const getBoookingsOfUser= async (req, res, next) => {
const id =req.params.id
  let bookings;
  try {
    bookings = await Bookings.find({user:id});
   
  } catch (error) {
    return console.log(error);
  }
  if (!bookings) {
    return res.status(500).json({ message: "unable to show bookings" });
  }
  return res.status(200).json({ bookings });
};







// update user
export const editUpdateUsers = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

const hashedPassword = bcrypt.hashSync(password);

let user;
try {
  user = await User.findByIdAndUpdate(id, {
    name,
    email,
    password: hashedPassword,
  });
} catch (err) {
 return console.log(err)
}
if (!user) {
return res.status(500).json({ message: "something went wrong" });
}
res.status(200).json({ message: "updated succesfully" });
};

// delete user
export const deleteUsers = async (req, res, next) => {
  const id = req.params.id;

let user;
try {
  user = await User.findByIdAndDelete(id, {
   
  });
} catch (err) {
 return console.log(err)
}
if (!user) {
return res.status(500).json({ message: "something went wrong" });
}
res.status(200).json({ message: "deleted succesfully" });
};




