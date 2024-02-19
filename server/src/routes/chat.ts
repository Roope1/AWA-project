import express, { Request, Response } from "express";
import { User } from "../models/User";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
const router = express.Router();

/* Get authenticated users chat with another person via id*/
router.get('/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.sendStatus(404);
    }

    // get authenticated user
    User.findOne({ username: req.user })
        .then((user: User | null) => {
            if (user) {
                // get the other user
                User.findOne({ _id: req.params.id })
                    .then((otherUser: User | null) => {
                        if (otherUser) {
                            Chat.findOne({
                                people: {
                                    $all: [user.id, otherUser.id]
                                }
                            })
                                .then((chat: Chat | null) => {
                                    if (chat) {
                                        return res.status(200).json(chat);
                                    } else {
                                        // create new chat
                                        let newChat = new Chat({
                                            people: [user.id, otherUser.id],
                                            messages: []
                                        });
                                        newChat.save();
                                        return res.status(200).json(newChat);
                                    }
                                });
                        }
                    });
            }
        });
});

router.post('/message', (req: Request, res: Response) => {
    // get authenticated user
    User.findOne({ username: req.user })
        .then((user: User | null) => {
            if (user) {
                // create new message
                let newMessage = new Message({
                    author: user.username,
                    content: req.body.content,
                })
                let promise: Promise<Message> = newMessage.save();
                
                // save the message to chat
                promise.then((newMessage: Message) => {
                    Chat.findOne({ _id: req.body.chatId })
                        .then((chat: Chat | null) => {
                            if (chat) {
                                chat.messages.push(newMessage.id);
                                chat.save();
                                return res.status(200).json(chat);
                            }
                        })
                })
            }
        });
});

/**
 * Get messages from chat via chat id
 */
router.get('/messages/:id', (req: Request, res: Response) => {
    if (req.params.id === "undefined") {
        return res.sendStatus(404);
    }
    Chat.findOne({ _id: req.params.id })
        .then((chat: Chat | null) => {
            if (chat) {
                Message.find({ _id: { $in: chat.messages } })
                .then((messages: Message[]) => {
                    return res.status(200).json(messages);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(404);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(404);
        });
});

module.exports = router;
