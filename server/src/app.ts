import { Request, Response } from "express";
import { Connection, Mongoose } from "mongoose";
import passport from "passport";

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path')
const bodyparser = require('body-parser')

require('./validateToken')

import mongoose from 'mongoose';
const mongodb: string = "mongodb://127.0.0.1:27017/project-db";
mongoose.connect(mongodb);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;

db.on('error', () => {
    console.error("MongoDB error");
})

// Routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const imageRouter = require('./routes/image')
const chatRouter = require('./routes/chat')

const app = express()

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/image', passport.authenticate('jwt', { session: false }), imageRouter);
app.use('/chat', passport.authenticate('jwt', { session: false }), chatRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req: Request, res: Response) => res.sendFile(path.resolve("..", "client", "build", "index.html")));
} else if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions))
}

module.exports = app;