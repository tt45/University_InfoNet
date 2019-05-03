var express = require('express'),
    router = express.Router(),
    Comment = require('../models/commentSchema'),
    User = require('../models/userSchema'),
    Post = require('../models/postSchema'),
    mongoose = require('mongoose'),
    auth = require('./auth');

router.use(express.json());


router.get('/', function(req, res) {
    console.log(req.body);
    Comment.find({}).then((comments) => {
        if (comments.length === 0) {
            return res.status(404).json({
                message: "Comment not exist!"
            }); 
        }
        res.status(200).send({
            message: `All the comments hahaha`,
            data: comments
        });
    }).catch(err => {
        res.status(500).send({
            message: `Something went wrong` + err,
        });
    })
});

// Find the comment with commentID
router.get('/:id', function(req, res) {

    Comment.findOne({_id: req.params.id}).then((comments) => {
        if (!comments) {
            return res.status(404).json({
                message: "Comment does not exist!"
            });
        }
        res.status(200).send({
            message: `Comment with ID: ${req.params.id} Found!`,
            data: comments
        });
    }).catch(err => {
        res.status(500).send({
            error: err
        });
    })
});

// Get all comments commented by user based on user_id
router.get('/user/:user_id', auth.optional, function(req, res) {

    Comment.findOne({commentedBy: req.params.user_id}).then((comments) => {
        if (!comments) {
            return res.status(404).json({
                message: "Comment does not exist!"
            });
        }
        res.status(200).send({
            message: `Comments commented by ${req.params.user_id} user_id.`,
            data: comments
        });
    }).catch(err => {
        res.status(500).send({
            error: err
        });
    })
});

// Find All comments for certain post based on post_id
router.get('/post/:post_id', function(req, res) {

    Post.findOne({_id: req.params.post_id}).then((post) => {
        if (!post) {
            return res.status(404).json({
                message: `No comments made to this post_id : ${req.params.post_id}`,
                data: []
            });
        }
        // console.log(post);
        let list_of_comments_id = post.comments;
        // console.log(list_of_comments_id); // 
        Comment.find({_id: {$in : list_of_comments_id}})
        .then((comments) => {
            if (comments.length == 0) {
                
                return res.status(200).json({
                    message: `No comments made to this post_id : ${req.params.post_id}`,
                    data: []
                });
                
            }

            res.status(200).send({
                message: `Comments commented to PostID ${req.params.post_id}.` ,
                data: comments
            });
        })
    }).catch(err => {
        res.status(500).send({
            message: `Error:` + err,
            data: []
        });
    })
});


// Update comment based on commentID
router.put('/:id', auth.optional, function(req, res) {
    // field in req.body: context
    Comment.findOne({_id: req.params.id}).exec().then(comment => {
        if (!comment) {
            return res.status(404).json({
                message: "Comment does NOT exist!",
                data: []
            });
        }
        Comment.update({_id: req.params.id}, req.body, {runValidators: true})
            .exec()
            .then((result) => {
                res.status(200).send({
                    message: `CommentID: ${req.params.id} - Updated Successfully!`
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error: " + err
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: "Error: " + err,
            data: []
        })
    })
});


// Create a comment under the a Post based on PostID
router.post('/post', auth.optional, function(req, res) {
    // Post body will contain the info of the comment (provides context of comment and user info who made the comment based on comment schema)
    // {postId : [postId], context: String, commentedBy: [userId]}

    User.findById(req.body.commentedBy).exec()
        .then(user => {
            comment_json = {
                context: req.body.context,
                commentedBy: req.body.commentedBy,
                commentPost: req.body.postId,
                commentedByUserName: user.username
            }
            let new_comment = new Comment(comment_json);
            console.log(new_comment);
            new_comment.save().then((created_comment) => {
                // Update the new comment ID into the Post referenced "comments" array
                Post.update({_id: req.body.postId}, {$push: {comments: created_comment._id} }).exec()
                    .then(updated_post => {
                        res.status(200).send({
                            message: `Created comment for postID: ${req.body.postId}`,
                            data: updated_post
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Oops! Something went wrong! Err: " + err,
                            data: []
                        });
                    })
            })
    }).catch(err => {
        res.status(500).send({
            message: "Oops! Something went wrong! Err: " + err,
            data: []
        });
    });

});


// Delete a comment given comment-id
router.delete('/:commentId', auth.optional, (req, res, next) => {
    Comment
    .findById(req.params.commentId)
    .exec()
    .then(comment => {
        if (!comment) {
            return res.status(404).json({
                message: "Comment does not exist!"
            });
        }
        Post
        .findById(comment.commentPost)
        .then(post => {
            post.comments = post.comments.filter(id => id.toString() !== req.params.commentId);
            post.save();
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
        return comment
		.remove()
		.then(() => {
			res.status(200).json({
				message: `Delete comment ${req.params.commentId} succesfully!`
			});
		});
    })
    .catch(err => {
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;