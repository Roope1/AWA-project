import express, { NextFunction, Request, Response } from "express";
var router = express.Router();

import { User } from "../models/User"
import bcrypt from 'bcrypt';
import jwt, { Jwt } from 'jsonwebtoken';


router.get('/', function (req: Request, res: Response) {
    res.status(200).send("ok");
})


// register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    if (req.body.password != req.body.retypepassword) {
        return res.status(403).json({ msg: "Passwords do not match" })
    }

    let user: User | null = await User.findOne({ username: req.body.username })
    // check that the username is available
    if (user) {
        //  username already in use
        return res.status(403).json({ msg: "Username already in use" })
    } else {
        let newUser = { ...req.body }

        // get rid of both passwords as we don't want those in plaintext in the db
        delete newUser.retypepassword;
        delete newUser.password;

        // create a hash of the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err // TODO: handle this in some way
                newUser.password = hash;
                new User(newUser)
                    .save()
                    .then(() => {
                        return res.status(200).json({ msg: "New user created" })
                    })
            })
        })
    }
});

//login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {

    // check if an user with given username exists
    let user: User | null = await User.findOne({ username: req.body.username })

    // if user doesn't exist
    if (!user) {
        return res.status(403).json({ success: false});
    }

    let isMatch: boolean = await bcrypt.compare(req.body.password, user.password)
    if (isMatch) {
        const jwtPayload = {
            username: user.username
        }
        jwt.sign(
            jwtPayload,
            process.env.SECRET as jwt.Secret,
            {
                expiresIn: 3600
            },
            (err, token) => {
                res.json({success: true, token: token})
            }
        )
    }

})


module.exports = router;