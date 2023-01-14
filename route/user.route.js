import express from "express";
import { userIndex,signup,userSignUp,signin,signout } from "../controller/user.controller.js";

const router = express.Router();
router.get("/",userIndex);
router.get("/signup",signup);
router.post("/signup",userSignUp);
router.post("/signin",signin);
router.get("/signout",signout);
export default router; 