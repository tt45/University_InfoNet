var express = require('express'),
    router = express.Router(),
    Comment = require('../models/commentSchema'),
    User = require('../models/userSchema'),
    Post = require('../models/postSchema'),
    mongoose = require('mongoose');

router.use(express.json());


router.get('/', function(req, res) {

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
        res.status(404).send({
            message: `No comments`,
            data: []
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
router.get('/user/:user_id', function(req, res) {

    Comment.find({commentedBy: req.params.user_id}).then((comments) => {
        res.status(200).send({
            message: `Comments commented by ${req.params.user_id} user_id.`,
            data: comments
        });
    }).catch(err => {
        res.status(404).send({
            message: "Object Not FOUND!",
            data: []
        });
    })
});


module.exports = router;