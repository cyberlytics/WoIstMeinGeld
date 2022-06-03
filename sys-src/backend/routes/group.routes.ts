import { Router } from "express";
import GroupController from "../controllers/group.controller";

export const groupRouter = Router();
const groupController = new GroupController();
groupRouter.get("getGroups", groupController.getGroups);

export default groupRouter;
