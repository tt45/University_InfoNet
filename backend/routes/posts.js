var express = require('express'),
	router = express.Router(),
	Post = require('../models/postSchema'),
	mongoose = require('mongoose'),
	User = require('../models/userSchema');

var fakeDB = require('../models/fakeDB'); // Used for self testing on task apis first
router.use(express.json())


function appendStringParen(queryParam) {
	return '(' + queryParam + ')';
}

// Get all lists of posts
router.get('/', function(req, res) {
	const query = req.query;
	const whereParam = query.where ? eval(appendStringParen(query.where)) : {};
	const selectParam = query.select ? eval(appendStringParen(query.select)) : {};
	const sortParam = query.sort ? eval(appendStringParen(query.sort)) : {};
	const skipParam = query.skip ? eval(appendStringParen(query.skip)) : 0;
	const limitParam = query.limit ? eval(appendStringParen(query.limit)) : 0;
	const countTrue = query.count ? eval(query.count) : false;

	Post.find(whereParam).select(selectParam).sort(sortParam).skip(skipParam).limit(limitParam)
		.exec()
		.then((tasks_list) => {
			res.status(200).send({
				message: countTrue? "OK. Returned total count of retrieved data." : "OK. List of Posts.",
				data: countTrue ? tasks_list.length : tasks_list
			});
		}).catch((err) => {
			res.status(500).send({
				message: "Unable to retrieve post list",
				data: []
			});
		});
});

// Used to get posts based on the clicked category. MUST HAVE  ?where={"category":[categoryTypeString]}  QUERY!
// Or else just pass back ALL posts
router.get('/category', function(req, res) {

	const query = req.query;
	// If not specified, then its just throwing out all posts
	const whereParam = query.where ? eval(appendStringParen(query.where)) : {};
	
	Post.find(whereParam).exec()
	.then((task) => {
		if (task) {
			res.status(200).send({
				message: `OK. Post Category found.`,
				data:task
			});
		} else {
			res.status(404).send({
				message: `Cannot Find Post of Post Category`,
				data:[]
			});
		}
	}).catch((error) => {
		res.status(500).send({
			message: `Server Error: ${error.name}: Cast to number failed for value '${error.value}' at path '${error.path}' for model 'Post' `,
			data:[]
		})
	});
})


// Get certain post based on UserID   Can put queries at the end 
router.get('/:id', function(req, res) {

	const query = req.query;
	// If not specified, then its just throwing out all posts created by that user...
	const whereParam = query.where ? eval(appendStringParen(query.where)) : {};
	whereParam.postedBy = req.params.id;
	
	Post.findOne(whereParam).exec()
	.then((task) => {
		if (task) {
			res.status(200).send({
				message: `OK. Post ID: ${req.params.id} found.`,
				data:task
			});
		} else {
			res.status(404).send({
				message: `Cannot Find Post of ID: ${req.params.id}`,
				data:[]
			});
		}
	}).catch((error) => {
		res.status(500).send({
			message: `Server Error: ${error.name}: Cast to number failed for value '${error.value}' at path '${error.path}' for model 'Post' `,
			data:[]
		})
	});
})


// // Delete for task/:id
// router.delete('/:id', function(req, res) {
// 	tasks.findById({_id: req.params.id}).exec(
// 		).then((result) => {
// 			if (result) {
// 				User.update({_id: String(result.assignedUser)}, { $pull: { pendingTasks: String(result._id) }}).exec()
// 				.then((result) => {
// 					tasks.deleteOne({_id: String(req.params.id)}).exec()
// 					.then((result => {
// 						res.status(200).send({
// 							message: "OK. Operation Successful.",
// 							data: []
// 						});
// 					}))
// 				})
// 				.catch(err => {
// 					return err;
// 				})
// 			} else {
// 				res.status(404).send({
// 					message: "Cannot Find Object for deletion.",
// 					data: []
// 				});
// 			}
// 		}).catch((error) => {
// 			res.status(400).send({
// 				message: `Bad Request. Error : ${error}`
// 			});	
// 		});
// });



module.exports = router;