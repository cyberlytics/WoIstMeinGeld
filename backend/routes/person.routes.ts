import { Router } from "express";
import { PersonsController } from "../controllers";

export const personRouter = Router();
const personController = new PersonsController();

personRouter.post("/addPerson", personController.create);

export default personRouter;
