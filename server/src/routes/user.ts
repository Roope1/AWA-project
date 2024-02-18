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


router.post('/reject', async (req: Request, res: Response, next: NextFunction) => {
    let authUser: User | null = await User.findOne({ username: req.user })
    console.log(req.body)
    if (!authUser) throw new Error;
    authUser.dismiss.push(req.body._id);

    await authUser.save();
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

/* Posting new image */
router.post('/image', upload.single('avatar'), (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return res.sendStatus(403); 
    
    let newAvatar = new Avatar({
        name: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        buffer: req.file.buffer,
    })
    let promise: Promise<Avatar> = newAvatar.save()

    promise.then((newAvatar: Avatar) => {
        User.findOne({ username: req.user })
        .then((user: User | null) => {
            if (user){
                // TODO: delete previous picture if any
                user.profilePic = newAvatar.id as any // idk why this doesn't work if its not as any, but it works! actual type is ObjectId
                user.save()
                res.sendStatus(200);
            }
        })
    })
});

/* Get image */
router.get('/image/:id', (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id === "undefined") {
        return res.sendStatus(404);
    }
    res.set({
        'Content-Disposition': "inline",
        "Content-type": "application/json"
    })
    Avatar.findOne({_id: req.params.id})
    .then((avatar: Avatar | null) => {
        if (avatar) {
            const b64 = Buffer.from((avatar.buffer as Buffer)).toString('base64')
            return res.status(200).send({ image :`data:${avatar.mimetype};base64,${b64}`})
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404);
    })
});

module.exports = router;