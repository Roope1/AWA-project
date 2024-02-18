import express, { NextFunction, Request, Response } from "express";
var router = express.Router();
import multer from 'multer';
import { User } from "../models/User"
import { Avatar } from "../models/Avatar";

const upload = multer();

/* Posting new image */
router.post('/', upload.single('avatar'), (req: Request, res: Response, next: NextFunction) => {
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
                // delete previous picture if exists
                console.log("finding and deleting ", user.profilePic as string)
                Avatar.deleteOne({_id: user.profilePic})
                .then(() => {
                    user.profilePic = newAvatar.id as any // idk why this doesn't work if its not as any, but it works! actual type is ObjectId
                    user.save()
                    res.sendStatus(200);
                })
            }
        })
    })
});

/* Get image */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
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