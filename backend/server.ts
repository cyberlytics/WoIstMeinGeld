require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import db from "./models";
import * as routes from "./routes";

const app = express();

var corsOption: CorsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();

// defining routes
// check https://gorrion.io/blog/node-express-js-typescript-sequelize/ for jwt guard
app.use("/", routes.personRouter);
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
