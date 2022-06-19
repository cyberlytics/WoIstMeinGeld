import { Router } from "express";
import { PersonsController } from "../controllers";
import UserGroupController from "../controllers/userGroup.controller";

export const UserGroupRouter = Router();
const personController = new PersonsController();
const userGroupController = new UserGroupController();
UserGroupRouter.get("/getGroups", personController.getGroups);
UserGroupRouter.post("/createGroup", userGroupController.createGroup);
UserGroupRouter.post("/addToGroup", userGroupController.addToGroup);
UserGroupRouter.post("/removeFromGroup", userGroupController.removeFromGroup);
UserGroupRouter.delete("/deleteGroup", userGroupController.deleteGroup);
UserGroupRouter.get("/getGroupUsers/:groupId", userGroupController.getGroupUsers);

export default UserGroupRouter;
