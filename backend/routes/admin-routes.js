import express from "express";
import { addAdmin, getAllAdmin, loginAdmin } from "../controllers/admin_controllers.js";




const adminRouter=express.Router()
adminRouter.post("/signup",addAdmin)
adminRouter.post("/login",loginAdmin)
adminRouter.get("/getadmin",getAllAdmin)



export default adminRouter;