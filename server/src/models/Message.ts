import { ObjectId } from "mongodb";
import { model, Schema, InferSchemaType, HydratedDocument } from "mongoose";

const mongoose = require('mongoose');

const messageSchema = new Schema({
    authorId: { type: ObjectId, required: true, ref: 'User' },
    author: { type: String, required: true},
    content: { type: String, required: true },
}, { timestamps: true })

export type Message = HydratedDocument<InferSchemaType<typeof messageSchema>>;

export const Message = model<Message>('Message', messageSchema);