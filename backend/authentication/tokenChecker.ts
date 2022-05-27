import { PersonService } from "./person.service";

export const tokenGuard = () => (req, res, next) => {
    const token = req.cookies.token || "";
    const hasAccess = PersonService.verifyToken(token);

    hasAccess.then((a) => {
        if (!a) {
            return res.status(403).send({ message: "No access" });
        } else {
            next();
        }
    });
};
