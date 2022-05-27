require("dotenv").config();

import express from "express";
import cors, { CorsOptions } from "cors";
import db from "./models";
import * as routes from "./routes";
import { tokenGuard } from "./authentication/tokenChecker";
import cookieParser from "cookie-parser";

const app = express();

var corsOption: CorsOptions = {
    credentials: true,
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
db.sequelize.sync();

// defining routes
// check https://gorrion.io/blog/node-express-js-typescript-sequelize/ for jwt guard
app.use("/", routes.personRouter);
app.use("/", routes.transactionRouter);

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

// Everything before this middleware will not be checked with jwt-token
app.use(tokenGuard());
// After this everything is checked for jwt-token

// Protected Get
app.get("/some-protected-resource", (req, res, next) => {
    res.json("Protected Hello World");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
