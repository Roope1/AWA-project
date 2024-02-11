import { Connection, Mongoose } from "mongoose";

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

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

const app = express()

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter);


module.exports = app;