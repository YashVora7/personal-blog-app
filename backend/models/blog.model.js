const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: { type:String, required:true},
    description: {type: String, required:true},
    author: {type:String, required:true},
    date: { type: Date, default: Date.now }
})

const blogModel = mongoose.model("blogs collection",blogSchema)

module.exports = blogModel