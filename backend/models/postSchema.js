var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    context: String,
    category: String,
    likeCount: {type: Number, default: 0},
    createdTime: {type: Date, default: Date.now},
    university: String,
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comments: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }],
    postedByUserName: String
});

module.exports = mongoose.model("Post", postSchema);