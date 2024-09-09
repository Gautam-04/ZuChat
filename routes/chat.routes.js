import { Router } from "express";
import { Authentication } from "../middleware/auth.middleware.js";
import { accessChat, addMembers, createGroupChats, fetchChats, removeMember, renameGroupChats } from "../controller/Chat.controller.js";

const routes = Router();

routes.route('/accesschat').post(Authentication,accessChat);
routes.route('/fetchchat').get(Authentication,fetchChats);
routes.route("/creategroup").post(Authentication, createGroupChats);
routes.route("/renamegroup").put(Authentication, renameGroupChats);
routes.route("/removemember").put(Authentication, removeMember);
routes.route("/addmember").put(Authentication, addMembers);

export default routes;