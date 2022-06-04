import { Router } from "express";
import { PersonsController } from "../controllers";
import UserGroupController from "../controllers/userGroup.controller";

export const UserGroupRouter = Router();
const personController = new PersonsController();
UserGroupRouter.get("/getGroups", personController.getGroups);

export default UserGroupRouter;
