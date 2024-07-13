import { UserCollection } from "../db/models/user.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res, next) => {
    try {
     const user = await UserCollection.findOne({ email: req.body.email });
    if (user) {
        throw createHttpError(409, "Email in use"); 
        }  

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        // const createUser = UserCollection.create(req.body);
        const createdUser = await UserCollection.create({ ...req.body, password: encryptedPassword });

        res.status(201).json({
            status: 201,
            message: 'User created!',
            data: {
                _id: createdUser._id,
                email: createdUser.email,
                role: createdUser.role,
            }
        });
        
    } catch (error) {
        next(error)
    };
    
    

}