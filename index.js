//Server
const express = require ('express');
const app = express();
const PORT = 8002;

//Database connection
const { connectToMongoDB } = require('./connection')
connectToMongoDB('mongodb://127.0.0.1:27017/short-url');

//Set views engine EJS
const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//to parse json
app.use(express.json());    //else it wont be parsing req.body as json and
//will give errror
//to parse form data
app.use(express.urlencoded({ extended: false }));
//to use cookies
const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

//Handling Routes
const  urlroutes = require('./routes/urlroutes');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/userRouter');

//restrict /url/etc to loggedIn users only 
const { checkAuthentication, restrictTo } = require("./middlewares/auth");
app.use(checkAuthentication);
//json responses : use from postman, mobile apps, CSR
app.use('/url',restrictTo(["NORMAL", "ADMIN"]), urlroutes);

//SSR server side rendering using EJS 
app.use('/', staticRouter); 

//user authentication
app.use('/user', userRouter);

app.listen(PORT, ()=> console.log(`Server started on the PORT ${PORT}`));
