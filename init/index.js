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
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "68a941d93888c41b933e3cea"}));
    await Listing.insertMany(initdata.data);
    console.log("Data was Initialize ");
}

initDB();