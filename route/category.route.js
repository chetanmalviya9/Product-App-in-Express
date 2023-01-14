import express from 'express';
import { addCategory, addCategoryPost, deleteCategory, editCategory, listCategory, updateCategory } from '../controller/category.controller.js';
const router = express.Router();
router.route("/add").get(addCategory).post(addCategoryPost);
router.get("/list",listCategory);
router.get("/delete/:id",deleteCategory);
router.get("/edit/:id",editCategory);
router.post("/update",updateCategory);
export default router;