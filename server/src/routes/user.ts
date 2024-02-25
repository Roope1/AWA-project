import express, { NextFunction, Request, Response } from "express";
var router = express.Router();
import multer from 'multer';
import { User } from "../models/User"
import { Avatar } from "../models/Avatar";
import { ObjectId, Types } from "mongoose";

const upload = multer();


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
                { _id: {$nin: user.like}},
                { username: {$ne: req.user }}
            ]
        })
        .then((users: User[] | null) => {
            if (users == undefined || users?.length < 1){
                console.log("no more users")
                res.json({msg: "No more users"})
            } else {
                // typed to partial to be able to "break out" of the User type mold (to not send the password anywhere)
                let randomUser: Partial<User> = users[Math.floor((Math.random() * users.length))] as Partial<User>
                // set the password to undefined as that wont be sent in the response (using this as delete keyword didn't work)
                randomUser.password = undefined;
                res.send(randomUser);
            }
        })
    })
});

/** Swiped left */
router.post('/reject', async (req: Request, res: Response, next: NextFunction) => {
    let authUser: User | null = await User.findOne({ username: req.user })
    console.log(req.body)
    if (!authUser) throw new Error;
    authUser.dismiss.push(req.body._id);

    await authUser.save();
    res.sendStatus(200);
})

/** Swiped right */
router.post('/like', async (req: Request, res: Response, next: NextFunction) => {
    let authUser: User | null = await User.findOne({ username: req.user })
    console.log(req.body)
    if (!authUser) throw new Error;
    authUser.like.push(req.body._id);

    // check for instant match
    // get the liked user
    let likedUser: User | null = await User.findById(req.body._id);
    if (!likedUser) throw new Error;

  
    if (likedUser.like.includes(authUser.id))  {
        // instant match
        // save the match to both participants
        authUser.match.push(likedUser.id);
        likedUser.match.push(authUser.id);

        likedUser.save()
        authUser.save()
        console.log(authUser.username, likedUser.username, "matched");
        return res.status(200).json({msg: "match"})
    }

    await authUser.save()
    res.json({msg: "ok"});
})

/** Bio edit */
router.post('/bio', (req: Request, res: Response, next: NextFunction) => {
    User.findOne({username: req.user})
    .then((user: User | null) => {
        if (user){
            user.bio = req.body.bio;
            user.save();
        }
    })
    res.sendStatus(200)
});

/** Get all users matches */
router.get('/matches', (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ username: req.user})
    .then((currentUser: User | null) => {
        if (currentUser) {
            console.log(currentUser.match)
            // get all users from match list 
            User.find({_id: {$in: currentUser.match}})
            .then((users: Partial<User>[] | null) => { // partial array to be able to remove passwords
                if (users) {
                    // remove the password from the users
                    users?.forEach(user => user.password = undefined)
                    // send the users to frontend as json
                    res.json(users)
                }
            })
        }
    })
});

// get username by id
router.get('/username/:id', (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
    .then((user: User | null) => {
        if (user) {
            res.json({username: user.username})
        } else {
            res.sendStatus(404);
        }
    })
})

module.exports = router;