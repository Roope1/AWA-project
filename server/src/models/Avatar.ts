import { model, Schema, InferSchemaType, HydratedDocument} from 'mongoose';

const mongoose = require("mongoose");


let avatarSchema = new Schema({
    name: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
});


export type Avatar = HydratedDocument<InferSchemaType<typeof avatarSchema>>;
export const Avatar = model<Avatar>('Avatar', avatarSchema)
