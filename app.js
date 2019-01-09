var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require('./models/user'),
    seedDB          = require("./seeds");
    
// Requiring Routes
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes          = require('./routes/index');

// need to run in command line: DATABASEURL=mongodb://localhost:27017/yelp_camp_v12
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
// mongoose.connect("mongodb://Chris:Schlims8246@ds253094.mlab.com:53094/yelpcamp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

// seedDB();  // Seed the database

// Passport configuration
app.use(require('express-session')({
    secret: "Greatest campsites of all time!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// allow currentUser to be loaded on all routes
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash('error');
    res.locals.success      = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Is Running!");
})