import express from 'express';
import { order } from '../controller/order.controller.js';
const router = express.Router();

router.post("/addOrder",order);
export default router;