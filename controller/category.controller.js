import { Category } from "../model/category.model.js";
export const addCategory=(req,res,next)=>{
    return res.render("admin/category",{message:""})
}
export const addCategoryPost=(req,res,next)=>{
    Category.create(req.body).then((msg)=>{
        console.log(msg);
    }).catch((err)=>{
        console.log(err);
    });
    return res.render("admin/category",{message:"Successfully add category"})
}

export const listCategory=(req,res,next)=>{
    Category.find().then((result)=>{
        // console.log(result)
        return res.render("admin/categoryList.ejs",{result});
    }).catch((err)=>{
        console.log(err);
    })
}
export const editCategory=(req,res,next)=>{
    
    Category.findById(req.params.id).then((category)=>{
        console.log(category);
        return res.render("admin/categoryUpdate.ejs",{category});
    }).catch((err)=>{
        console.log(err);
    })
}
export const updateCategory=(req,res,next)=>{
    console.log(req.body)
    const id=req.body._id;
    delete req.body._id;
    Category.updateOne({_id: id},{
        $set:req.body
    }).then((msg)=>{
        
        return res.redirect("/category/list");
    }).catch((err)=>{
        console.log(err);
    })
}
export const deleteCategory=(req,res,next)=>{
   Category.deleteOne({
    _id:req.params.id
    }).then((msg)=>{
        console.log(msg)
        return res.redirect("/category/list");
    }).catch((err)=>{
        console.log(err);
    })
}