const express = require("express");
const router = express.Router();

router.get("/signup", (req,res) =>{
    res.render("users/signup.js")
});

module.exports = router;