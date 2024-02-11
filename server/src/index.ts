require('dotenv').config();
import { Application } from "express";
import http from 'http';

const app: Application = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})
