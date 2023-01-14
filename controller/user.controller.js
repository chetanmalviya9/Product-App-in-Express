import { User } from "../model/user.model.js";
import { Category } from "../model/category.model.js";
import bcrypt from 'bcryptjs';

export const userIndex = (req, res, next) => {
    // console.log(" userIndex Route work----------------------")
    return res.render("user/index", { currentUser: '', categoryList: [] });
}
export const signup = (req, res, next) => {
    // console.log("signup Route work----------------------")
    return res.render("user/signup", { currentUser: '', categoryList: [] });
}
export const userSignUp = async (req, res, next) => {
    // console.log("req.body")
    let password = req.body.password;
    let saltKey = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, saltKey);
    User.create({
        email: req.body.email,
        password: encryptedPassword
    }).then(result => {
        console.log(result)
        return res.redirect("/user");
    }).catch(err => {
        return res.send("<h1>Error</h1>");
    })
}
export const signin = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            req.session.userId = user._id;
            req.session.userEmail = user.email;
            let categories = await Category.find();
            return res.render("user/user-home.ejs", { currentUser: req.session, categoryList: categories });
        }
        else
            return res.redirect("/user");
    }
    else
        return res.redirect("/user");
}
export const signout = (req, res, next) => {
    // console.log("hiii");
    req.session.userId = null;
    req.session.userEmail = null;
    req.session.destroy();
    return res.redirect("/user");
}