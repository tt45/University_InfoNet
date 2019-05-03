var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
	context: {type:String},
	commentedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdTime: {type:Date, default: Date.now},
	replyTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	commentPost: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	commentedByUserName: String // New added
});

module.exports = mongoose.model("Comment", commentSchema);