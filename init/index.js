const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const Mongoose_URL = "mongodb://localhost:27017/Airbnb";

main()
.then(() =>{
    console.log("Connected to DBs");
})
.catch((err) =>{
    console.log(err);
})

async function main() {
    await mongoose.connect(Mongoose_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data was Initialize ");
}

initDB();