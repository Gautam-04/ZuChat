import { Router } from "express";
import {Authentication} from "../middleware/auth.middleware.js"
import { allMessages, sendMessage } from "../controller/Message.controller.js";

const routes = Router();

routes.route('/:chatId').post(Authentication, allMessages)
routes.route("/").post(Authentication,sendMessage)

export default routes;