import { Request, Response, Router } from "express";
import { validationResult } from "express-validator/check";
import { PersonService } from "../authentication/person.service";
import { checkLogin, checkRegister } from "../authentication/loginRegisterRules";

export const personRouter = Router();

personRouter.post("/signUp", checkRegister, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json(errors.array());

    const payload = req.body;
    await PersonService.register(payload);
    loginAndCreateCookie(payload, res, req);
});

personRouter.post("/signIn", checkLogin, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json(errors.array());

    const payload = req.body;
    loginAndCreateCookie(payload, res, req);
});

const loginAndCreateCookie = async (payload, response: Response, request: Request) => {
    const tokenPromise = PersonService.login(payload);
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
