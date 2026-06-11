const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },

    deployedUrl:{
        type:String,
        required:true
    },

    folderPath:{
        type:String,
        required:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},{timestamps:true});

module.exports= mongoose.model("Site",siteSchema);