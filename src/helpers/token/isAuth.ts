import { JwtPayload } from "jsonwebtoken";

export const isAuth = (...args: Array<string | JwtPayload>) =>  {
    return args.every((el) => !!el);
}
