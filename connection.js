//Database connection
const mongoose = require('mongoose');

const connectToMongoDB = async function(url){
    return mongoose.connect(url)
    .then(()=> console.log("MongoDB Connection Successful!"))
    .catch((err)=>console.log(err));
}

module.exports = { connectToMongoDB };