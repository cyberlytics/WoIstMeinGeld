import { Router } from "express";
import { TransactionController } from "../controllers";

export const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get("/findAllTransactions", transactionController.findAll);

export default transactionRouter;
