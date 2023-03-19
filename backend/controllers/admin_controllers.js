import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
    const {  email, password } = req.body;

    let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email})
    }catch(error){
return console.log(error)
    }
    if (existingAdmin) {
        return res.status(400).json({ message: "admin already exists" });
        }
       
        let admin;
        const hashedPassword = bcrypt.hashSync(password);
try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
} catch (error) {
   return console.log(error)
}
    if (!admin) {
        return res.status(500).json({ message: "Unable to store admin" });
      }
      return res.status(201).json({ admin });
}


// login admin


export const loginAdmin=async (req,res,next)=>{
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
    let existingAdmin;
    try {
      existingAdmin=await Admin.findOne({email})
    } catch (error) {
      return console.log(error)
    }
    if (!existingAdmin) {
      return res.status(500).json({ message: "unable to find the Admin from this id" });
      }
      
    
    const isPasswordCorrect =bcrypt.compareSync(password,existingAdmin.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "incorrect email or password" });
      }
      // creating of token to provide secret key
      const token =jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"7d",
      });   

      res.status(200).json({ message: "Authentication complete",token,id:existingAdmin._id });
   
  }

  export const getAllAdmin = async (req, res, next) => {
    let admins;
    try {
      admins = await Admin.find();
      if (!admins) {
        return res.status(500).json({ message: "unexpected Error Occured" });
      }
      return res.status(200).json({ admins });
    } catch (err) {
      return console.log(err);
    }
  };