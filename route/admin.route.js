import express from 'express'
const router = express.Router();
import { adminController } from "../controller/admin.controller.js";
router.get("/",adminController);
export default router;