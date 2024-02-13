import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

import { User } from "../models/User"

/* Authenticate user */
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

/* Used to get the random users for "swiping" */
router.get('/random', (req: Request, res: Response, next: NextFunction) => {
    // get the authenticated users matches
    User.findOne({ username: req.user })
    .then((user: User | null) => {
        if (!user) throw new Error;
        // find all users that the user has not matched with and not the authorized user 
        User.find({
            $and: [
                { _id: {$nin: user.matches}},
                { username: {$ne: req.user }}
            ]
        })
        .then((users: User[] | null) => {
            if (!users){
                res.json({msg: "No more users"})
            } else {
                // typed to partial to be able to "break out" of the User type mold (to not send the password anywhere)
                let randomUser: any = users[Math.floor((Math.random() * users.length))] as any
                // set the password to undefined as that wont be sent in the response (using this as delete keyword didn't work)
                randomUser.password = undefined;
                res.send(randomUser);
            }
        })
    })
});

module.exports = router;