import { model, Schema, InferSchemaType, HydratedDocument } from "mongoose";

const mongoose = require('mongoose');

const messageSchema = new Schema({
    author: { type: String, required: true},
    content: { type: String, required: true },
}, { timestamps: true })

export type Message = HydratedDocument<InferSchemaType<typeof messageSchema>>;

export const Message = model<Message>('Message', messageSchema);