import express from 'express';
import { addToCart,cart,cartData,deleteProduct } from '../controller/cart.controller.js';
const router = express.Router();
router.get("/",cart);
router.get("/deleteProduct/:index",deleteProduct);
router.get("/addToCart/:id",addToCart);
router.get("/cartData",cartData);
export default router;