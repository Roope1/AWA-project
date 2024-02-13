import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

import { User } from "../models/User"
import passport from "passport";

require('../validateToken')

router.get('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: NextFunction) => {
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

module.exports = router;