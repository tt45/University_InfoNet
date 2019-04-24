var express = require('express'),
    router = express.Router(),
    Comment = require('../models/commentSchema'),
    User = require('../models/userSchema'),
    Post = require('../models/postSchema'),
    mongoose = require('mongoose');

router.use(express.json());

router.get('/', function(req, res) {

    Comment.find({}).then((comments) => {
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


router.get('/:id', function(req, res) {

    Comment.find({_id: req.params.id}).then((comments) => {
        res.status(200).send({
            message: `Comment with ID: ${req.params.id} Found!`,
            data: comments
        });
    }).catch(err => {
        res.status(404).send({
            message: `No comment of ID : ${req.params.id}`,
            data: []
        });
    })
});

router.get('/user/:user_id', function(req, res) {

    Comment.find({commentedBy: req.params.user_id}).then((comments) => {
        res.status(200).send({
            message: `Comments commented by ${req.params.user_id} user_id.`,
            data: comments
        });
    }).catch(err => {
        res.status(404).send({
            message: `No comments made by this user_id : ${req.params.user_id}`,
            data: []
        });
    })
});


router.get('/post/:post_id', function(req, res) {

    Post.find({_id: req.params.post_id}).then((post) => {
        console.log(post);
        let list_of_comments_id = post[0].comments;
        console.log(list_of_comments_id);
        Comment.find({_id: {$in : list_of_comments_id}}).then((comments) => {
            res.status(200).send({
                message: `Comments commented to PostID ${req.params.post_id}.` ,
                data: comments
            });
        })
    }).catch(err => {
        res.status(404).send({
            message: `No comments made to this post_id : ${req.params.post_id}`,
            data: []
        });
    })
});

module.exports = router;