import express from "express";
import mongoose from 'mongoose';
import path from 'path';
import session from "express-session";
import bodyParser from "body-parser";
import indexRouter from './route/index.route.js';
import adminRouter from './route/admin.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import userRouter from './route/user.route.js';
import cartRouter from './route/cart.route.js';
import orderRouter from './route/order.route.js';
const app = express();

app.set("view engine", "ejs");
mongoose.set('strictQuery', true);
// 'mongodb+srv://chetanmalviya9:Chetan%40123@cluster0.uwyx1lm.mongodb.net/productApp?retryWrites=true&w=majority'
mongoose.connect("mongodb+srv://chetanmalviya9:<PLEASE ENTER PASSWORD>@cluster0.uwyx1lm.mongodb.net/productApp?retryWrites=true&w=majority", err => {
    if (err)
        console.log(err);
    else {

        console.log("mongodb connected");
        app.use(session({ secret: 'ueuuweuwyweoop' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const staticPath = path.join(process.cwd(), "public");
        app.use(express.static(staticPath));
        
        app.use("/admin", adminRouter);
        app.use("/cart", cartRouter);
        app.use("/category", categoryRouter);
        app.use("/product", productRouter);
        app.use("/user", userRouter);
        app.use("/order",orderRouter);
        app.use("/",indexRouter);
        app.listen(3000, () => {
            console.log("server started at 3000 http://localhost:3000/user/");
        })
    }
});