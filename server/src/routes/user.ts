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
                { _id: {$nin: user.like}},
                { username: {$ne: req.user }}
            ]
        })
        .then((users: User[] | null) => {
            console.log(users)
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


router.post('/reject', async (req: Request, res: Response, next: NextFunction) => {
    let authUser: User | null = await User.findOne({ username: req.user })
    console.log(req.body)
    if (!authUser) throw new Error;
    authUser.dismiss.push(req.body._id);

    // saved as "any"-type because the User interface doesn't recognize the save methdod
    await (authUser as any).save()
    res.sendStatus(200);
})

router.post('/like', async (req: Request, res: Response, next: NextFunction) => {
    let authUser: User | null = await User.findOne({ username: req.user })
    console.log(req.body)
    if (!authUser) throw new Error;
    authUser.like.push(req.body._id);

    // check for instant match
    // get the liked user
    let likedUser: User | null = await User.findById(req.body._id);
    if (!likedUser) throw new Error;

  
    if (likedUser.like.includes((authUser as any)._id))  {
        // instant match
        res.status(200).json({msg: "match"})
    }

    
    // saved as "any"-type because the User interface doesn't recognize the save methdod
    await (authUser as any).save()
    res.json({msg: "ok"});
})

module.exports = router;