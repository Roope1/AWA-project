
import { ObjectId } from "mongodb";
import { model, Schema, InferSchemaType } from "mongoose";

const mongoose = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    profilePic: { type: String, required: false },
    password: { type: String, required: true },
    likes: [ObjectId], 
    dismiss: [ObjectId], // seen but not liked
}, { timestamps: true })

export type User = InferSchemaType<typeof userSchema>;

export const User = model<User>('User', userSchema);