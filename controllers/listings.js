const Listing = require("../models/listing");

// Index Route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// New Route
module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new.ejs");
};

// Show Route
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "review",
        populate: { path: "author" },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing You Requested Is Not Exist !");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// Create Route
module.exports.createListing = async (req, res, next) => {
    let url= req.file.path;
    let filename= req.file.filename; 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created !!");
    res.redirect("/listings");
};

// Edit Route
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing You Requested Is Not Exist !");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

// Update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file !== "undefined"){
    let url= req.file.path;
    let filename= req.file.filename;
    listing.image = {url,filename};
    await listing.save(); 

    }
    req.flash("success", "Listing Updated !!");
    res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing Deleted !!");
    res.redirect("/listings");
};