# AWA-project
CT30A3204 Advanced Web Applications - Course Project

Name: Roope Turkki

## How to operate
Clone the repository and navigate to the project directory in a shell of your choice.

Create a `.env` file to the `./server` directory and add entry `SECRET` in there in the format `SECRET=<my secret key>` The key can be anything you want. I suggest that the key is a randomly generated string of characters and numbers at least 12 characters long.

Then install the required dependencies by running `npm install` this will take a while so be patient.


### To run the program in development mode:

Run commands: 
```shell
npm run dev:client && npm run dev:server
```
The application will run on port 3000

### To build and run in production mode
Add `NODE_ENV=production` to `.env` 


Run commands:
```shell
npm run build
npm start
```
The application will run on port 5000

# Documentation
Client and server spesific documentation can be found in their own respective README files
* [Client](./client/README.md)
* [Server](./server/README.md)

# Other notes
* The repository is located at https://github.com/Roope1/AWA-project
* Points proposal is in the [PointsProposal.pdf](./PointsProposal.pdf) file