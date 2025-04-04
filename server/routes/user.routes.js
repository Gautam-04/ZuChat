import { Router } from "express";
import { loginUser, logout, registerUser, searchUser, updateAccountDetails, updateAvatar } from "../controller/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { Authentication } from "../middleware/auth.middleware.js";

const routes = Router();

routes.route('/register').post(registerUser)

routes.route('/login').post(loginUser)

//protectedRoutes
routes.route('/updatedetails').post(Authentication,updateAccountDetails);
routes.route('/updateavatar').post(upload.fields([{name:"avatar",maxCount:1}]),Authentication,updateAvatar);
routes.route('/search').post(Authentication,searchUser)
routes.route('/logout').post(Authentication,logout)

export default routes;