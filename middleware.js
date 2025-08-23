module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please Logged In To Create Listing");
        return res.redirect("/login");
    }
    next();
}