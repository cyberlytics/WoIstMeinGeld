import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PersonAddModel } from "../models/person.model";
import db from "../models";

const Person = db.persons;

export class PersonService {
    private readonly _saltRounds = 12;
    private readonly _jwtSecret = "fnewfuiewngewuifgneguien21757z95z19489123";

    static get userAttributes() {
        return ["id", "name", "password"];
    }
    private static _user;
    static get user() {
        return PersonService._user;
    }

    register({ name, password }: PersonAddModel) {
        return bcrypt.hash(password, this._saltRounds).then((hash) => {
            return Person.create({ name: name, password: hash }).then((u) =>
                Person.findOne({
                    where: {
                        id: u.id,
                    },
                })
            );
        });
    }

    login({ name }: PersonAddModel) {
        return Person.findOne({ where: { name } }).then((u) => {
            const { id, name } = u;
            return { token: jwt.sign({ id, name }, this._jwtSecret) };
        });
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
                return;
            });
        }) as Promise<boolean>;
    }
}
