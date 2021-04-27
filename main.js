"use strict";

// const { db } = require("./models/user");

 //const { connect } = require("mongodb");

const express = require("express"), 
app = express(),
router = require("./routes/index"),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts"), 
mongoose = require("mongoose"),
methodOverride = require("method-override"),
subscribersController = require("./controllers/subscribersController"),
usersController = require("./controllers/usersController"),
coursesController = require("./controllers/coursesController"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
User = require("./models/user");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(expressValidator());
router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(methodOverride("_method", {methods: ['POST', 'GET']}));

router.use(express.json());

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.get("/", homeController.index);




router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})






app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});