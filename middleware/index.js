var Campground = require('../models/campground');
var Comment = require('../models/comment');

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash('error', 'Campground not found.');
                res.redirect('back');
            } else {
                // does the user own the campground
                // have to use.equals instead of '===' because one is a string and the other is a mongoose object
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that.');
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash('error', 'Comment not found.');
                res.redirect('back');
            } else {
                // does the user own the comment?
                // have to use.equals instead of '===' because one is a string and the other is a mongoose object
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please log in to do that.');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // must be before redirect
    req.flash("error", "Please log in to do that.");
    res.redirect('/login');
};


module.exports = middlewareObj;