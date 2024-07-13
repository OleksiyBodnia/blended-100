import createHttpError from "http-errors";
import { SessionCollection } from "../db/models/session.js";
import { UserCollection } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    try {
        const {authorization = ""} = req.headers;

        const [bearer, token] = authorization.split(" ");

        if(bearer !== "Bearer" || !token){
            throw createHttpError(401, "Should include bearer or token");
        }

        const session = await SessionCollection.findOne({accessToken: token});

        if(!session){
           throw createHttpError(401, "Session not found");
        }

        if(new Date() > new Date(session.accessTokenValidUntil)){
            throw createHttpError(401, "Access token was expired");
        }


        const user = await UserCollection.findById(session.userId);

        if(!user){
            throw createHttpError(401, "User not found")
        }

        req.user = user;

        next()
    } catch (error) {
        next(error)
    }
}