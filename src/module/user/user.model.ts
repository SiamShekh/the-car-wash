import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { NextFunction } from "express";

const UserSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    const user = this;
    const isUserExits = await UserModel.findOne({ $or: [{ email: user?.email }, { phone: user?.phone }] });
    if (isUserExits) {
        throw new Error("the user is already exits in the server")
    }
    next();
});

export const UserModel = model("User", UserSchema);
