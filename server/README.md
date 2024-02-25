# Server Documentation

## Technologies:
* [Express.js](http://expressjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Multer](https://github.com/expressjs/multer)
    * Used for handling file uploads (images)
* [Passport.js](https://www.passportjs.org/)
    * Used creating JWT token for authentication
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
    * Used for hashing and checking passwords 
* [Mongoose](https://mongoosejs.com/)
    * Used to interact with a mongoDB database

## Routes
This is a brief overview of the different routers used in the project. More in-depth explanations for each endpoint can be found commented above the corresponding endpoint. Routes are stored in the `/routes` -directory.

### Index
The index-router (path `/`) is used for registering new accounts via (`/register`) and logging in the user (`/login`). This is the only route you can access without sending a valid Json Web Token in the header.

### User
The route is prefixed with `/user`. It handles most of the user related stuff. Such as getting a random user to "swipe" via `/user/random`.

### Image
This router handles all image related stuff, such as uploading new images and getting them. The router is prefixed with `/image`.

### Chat
This router handles all chat and message related operations. Prefixed with `/chat`.


