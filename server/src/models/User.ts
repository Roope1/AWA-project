
import { ObjectId } from "mongodb";
import { model, Schema, InferSchemaType } from "mongoose";

const mongoose = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    bio: {type : String, required: false},
    profilePic: { type: String, required: false },
    password: { type: String, required: true },
    like: [ObjectId], 
    dismiss: [ObjectId], // seen but not liked
}, { timestamps: true })

export type User = InferSchemaType<typeof userSchema>;

export const User = model<User>('User', userSchema);