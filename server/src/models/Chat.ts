import { ObjectId } from "mongodb";
import { model, Schema, InferSchemaType, HydratedDocument } from "mongoose";

const mongoose = require('mongoose');

const chatSchema = new Schema({
    people: [{ type: ObjectId, ref: 'User' }],
    messages: [{ type: ObjectId, ref: 'Message' }],
}, { timestamps: true })

export type Chat = HydratedDocument<InferSchemaType<typeof chatSchema>>;

export const Chat = model<Chat>('Chat', chatSchema);