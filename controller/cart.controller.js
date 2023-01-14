import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { Category } from "../model/category.model.js";

export const deleteProduct= async(req,res,next)=>{
    const productIndex = req.params.index;
    const user_Id = req.session.userId;
    let cartItems = await Cart.findOne({ userId: user_Id });
    cartItems.productList.splice(productIndex*1,1);
    await Cart.create(cartItems);
    res.redirect("/cart/");
}
export const addToCart = async (req, res, next) => {
    const id = req.params.id;
    // console.log(id);
    let product = await Product.findById(id);

    let user_Id = req.session.userId;
    let user = await Cart.findOne({ userId: user_Id });
    if (user) {
        // console.log(user);
        let i = 0;
        for (i=0 ;i<user.productList.length; i++) {
            if (user.productList[i].productId == id) {
                return res.status(200).json({ message: 'Already added' });
            }
        }
        if (i == user.productList.length) {
            // console.log("hiii-----------------------");
            user.productList.push({
                productId: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productImage: product.productImage,
                productDescription: product.productDescription
            });
            await Cart.create(user);
            return res.status(200).json({ message: 'Successfully added product in cart' });
        }
    }
    else {
        // console.log("In else------------------------")
        await Cart.create({
            userId: user_Id,
            productList: [
                {
                    productId: product._id,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    productImage: product.productImage,
                    productDescription: product.productDescription
                }
            ]
        })
        return res.status(200).json({ message: 'Successfully added product in cart' });
    }
}

//--------Showing data in Cart-----------//
export const cart = async (req, res, next) => {
    // console.log("route work");
    let user_Id = req.session.userId;
    // console.log(user_Id)
    let items = await Cart.findOne({ userId: user_Id })

    // console.log(items)
    let categories = await Category.find();
    return res.render("user/cart.ejs", {
        cartList: items.productList,
        currentUser: req.session,
        categoryList: categories
    });
}

export const cartData = async (req, res, next) => {

    let user_Id = req.session.userId;
    // console.log("70");
    let cartItems = await Cart.findOne({ userId: user_Id })
    let items = [];
    // console.log("-------------------------------");
    for (let i = 0; i < cartItems.productList.length; i++) {
        let item = cartItems.productList[i].toJSON();
        item.quantity = 1;
        items.push(item);
    }
    return res.status(200).json({ items: items });
}