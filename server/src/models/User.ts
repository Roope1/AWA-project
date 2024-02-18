
import { ObjectId } from "mongodb";
import { model, Schema, InferSchemaType, HydratedDocument } from "mongoose";

const mongoose = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    bio: {type : String, required: false},
    profilePic: { type: ObjectId, required: false },
    password: { type: String, required: true },
    like: [ObjectId], 
    dismiss: [ObjectId], // seen but not liked
    match: [ObjectId], // mutual likes
}, { timestamps: true })

export type User = HydratedDocument<InferSchemaType<typeof userSchema>>;

export const User = model<User>('User', userSchema);