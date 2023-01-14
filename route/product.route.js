import express from "express";
import { addProduct, addProductPost, editProduct, productList, updateProduct, getProductById } from "../controller/product.controller.js";
import {body} from "express-validator";
import multer from "multer";
const router = express.Router();

const upload = multer({dest: 'public/images'});
router.route("/add")
.get(addProduct)
.post(upload.single("productImage"),
    body('productName','please enter product name').notEmpty(),
    body('productPrice','please enter product price').notEmpty(),
    body('productPrice','only digit is allowed').isNumeric(),
    body('productQuantity','only digit is allowed').isNumeric(),
    body('productQuantity','please enter product quantity').notEmpty()
   ,addProductPost);

router.get("/list",productList)
router.get("/edit/:id",editProduct)
router.post("/update",updateProduct)
router.get("/:categoryId",getProductById);

export default router;