import { Router } from "express";
import { TransactionController } from "../controllers";

export const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get("/findAllTransactions", transactionController.findAllTransactions);
transactionRouter.get("/getTransaction", transactionController.getTransaction);
transactionRouter.post("/createTransaction", transactionController.createTransaction);
transactionRouter.delete("/deleteTransaction", transactionController.deleteTransaction);

export default transactionRouter;
