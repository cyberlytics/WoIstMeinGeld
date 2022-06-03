import { Router } from "express";
import UserGroupController from "../controllers/group.controller";

export const UserGroupRouter = Router();
const usergroupController = new UserGroupController();
UserGroupRouter.get("/getGroups", usergroupController.getGroups);

export default UserGroupRouter;
