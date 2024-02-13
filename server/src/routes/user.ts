import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

import { User } from "../models/User"

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log("req.user", req.user)
    User.findOne({ username: req.user })
    .then((user: User | null) => {
        if (!user) {
            res.sendStatus(401);
        } else {
            res.send(user);
        }
    })
})

router.get('/random', (req: Request, res: Response, next: NextFunction) => {
    // get the authenticated users matches
    User.findOne({ username: req.user })
    .then((user: User | null) => {
        if (!user) throw new Error;
        // find all users that the user has not matched with
        User.find({ _id: {$nin: user.matches}})
        .then((users: User[] | null) => {
            if (!users){
                // handle this
            } else {
                // TODO: parse this info before sending (dont send password or other stuff like that)
                res.send(users[Math.floor((Math.random() * users.length))])
            }
        })
    })
});

module.exports = router;