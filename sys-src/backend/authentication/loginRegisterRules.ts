import * as bcrypt from "bcrypt";
import { check } from "express-validator/check";
import db from "../models";

const Person = db.persons;

export const checkRegister = [
    check("name").custom((name) =>
        Person.findOne({ where: { name } }).then((u) => {
            if (u) {
                throw new Error("409 name already exists"); 
            }
        })
    ),
];

export const checkLogin = [
    check("name").custom((name) =>
        Person.findOne({ where: { name } }).then((u) => {
            if (!u) {
                throw new Error("404 name doesn't exist"); 
            }
        })
    ),
    check("password").custom(async (password, { req }) => {
        const isPasswordCorrect = await Person.findOne({ where: { name: req.body.name } }).then((u) =>
            bcrypt.compare(password, u.password)
        );
        if (!isPasswordCorrect) {
            throw new Error("401 invalid password"); 
        }
    }),
];
