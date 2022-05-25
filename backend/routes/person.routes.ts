import { Request, Response, Router } from "express";
import { validationResult } from "express-validator/check";
import { PersonService } from "../authentication/person.service";
import { personRules } from "../authentication/loginRegisterRules";

export const personRouter = Router();
const personService = new PersonService();

personRouter.post("/signUp", personRules["forRegister"], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body;
    await personService.register(payload);
    loginAndCreateCookie(payload, res, req);
});

personRouter.post("/signIn", personRules["forLogin"], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = req.body;
    loginAndCreateCookie(payload, res, req);
});

const loginAndCreateCookie = async (payload, response: Response, request: Request) => {
    console.log(payload);
    const tokenPromise = personService.login(payload);
    const token = await tokenPromise;

    // check if client sent cookie
    const cookie = request.cookies.token;
    if (cookie === undefined) {
        response
            .cookie("token", token.token, {
                httpOnly: true,
            })
            .send(token);
    }
};
