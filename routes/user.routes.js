import { Router } from "express";
import { loginUser, logout, registerUser, updateAccountDetails, updateAvatar } from "../controller/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { Auththentication } from "../middleware/auth.middleware.js";

const routes = Router();

routes.route('/register').post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),registerUser)

routes.route('/login').post(loginUser)

//protectedRoutes
routes.route('/updatedetails').post(Auththentication,updateAccountDetails);
routes.route('/updateavatar').post(upload.fields([{name:"avatar",maxCount:1}]),Auththentication,updateAvatar);
routes.route('/logout').post(Auththentication,logout)

export default routes;