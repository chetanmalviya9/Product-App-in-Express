import { Product } from "../model/product.model.js";
import { Category } from "../model/category.model.js";
import { validationResult } from "express-validator";
export const addProduct = (req, res, next) => {
    Category.find().then(result => {
        console.log(result)
        return res.render('admin/addProduct.ejs', { categoryList: result, errors: [] });
    }).catch();
}
export const addProductPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        Category.find().then(result => {
            console.log(result)
            return res.render("admin/addProduct", { categoryList: result, errors: errors.array()});
        }).catch(err => {
            console.log(err);
        });
    }
    else {
        req.body.productImage = req.file.filename;
        console.log(req.body)
        Product.create(req.body)
            .then(result => {
                return res.redirect("/product/add");
            })
            .catch(err => {
                console.log(err);
            });
    }
}
export const productList=(req,res,next)=>{
    Product.find().populate({path:'categoryId'}).then((result)=>{
        // console.log(result);
        return res.render("admin/productList.ejs",{result});
    }).catch((err)=>{
        console.log(err);
    })
}
export const editProduct=(req,res,next)=>{
    Product.findById({_id:req.params.id}).then((result)=>{
        return res.render("admin/productUpdate", { product: result});
    }).catch((err)=>{
        console.log(err);
    })
}
export const updateProduct=(req,res,next)=>{
    console.log(req.body)
    const id=req.body._id;
    delete req.body._id;
    Product.updateOne({_id: id},{
        $set:req.body
    }).then((msg)=>{
        
        return res.redirect("/product/list");
    }).catch((err)=>{
        console.log(err);
    })
}
export const getProductById= async(req,res,next)=>{
       let cid = req.params.categoryId;
    let products = await Product.find({categoryId: cid});    
    let categories = await Category.find();
    return res.render("user/product.ejs",
     {   
         currentUser: req.session,
         categoryList: categories, 
         productList: products
     }
     );  
}