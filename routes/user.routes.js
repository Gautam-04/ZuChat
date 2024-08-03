import { Router } from "express";
import { registerUser } from "../controller/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const routes = Router();

routes.route('/register').post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),registerUser)


export default routes;