import { Router } from "express";
import { validationResult } from "express-validator/check";
import { PersonService } from "../authentication/person.service";
import { personRules } from "../authentication/loginRegisterRules";

export const personRouter = Router();
const personService = new PersonService();

personRouter.post("/signUp", personRules["forRegister"], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body;
    const user = personService.register(payload);

    return user.then((u) => res.json(u));
});

personRouter.post("/signIn", personRules["forLogin"], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body;
    const tokenPromise = personService.login(payload);
    const token = await tokenPromise;

    // check if client sent cookie
    const cookie = req.cookies.token;
    if (cookie === undefined) {
        res.writeHead(200, {
            "Set-Cookie": "token=" + token.token + "; HttpOnly",
            "Access-Control-Allow-Credentials": "true",
        }).send();
    }
});
