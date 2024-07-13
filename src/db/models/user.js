import { model, Schema } from "mongoose";

const userSchema = new Schema({
    role: {
        type: String,
        enum: ["admin", "moderator", "visitor"],
        default: "visitor"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

export const UserCollection = model('user', userSchema);