const { timeStamp } = require("console");
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID : {
        type : String,
        require : true,
        unique : true 
    },
    redirectURL : {
        type : String,
        require : true
    },
   visitHistory : [{timestamp : {type : Number}}],
},
{timestamps: true},

);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;