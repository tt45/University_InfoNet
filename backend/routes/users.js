var express = require('express'),
	router = express.Router(),
	User = require('../models/userSchema');
	mongoose = require('mongoose');
	Post = require('../models/postSchema'),
	auth = require('./auth'),
	passport = require('passport');


router.use(express.json());

// Get all lists of users (So far in our fakeDB first)  ? Add in where={university:value} to get users based on University
router.get('/', function(req, res) {
	const query = req.query;

	const whereParam = query.where ? eval(appendStringParen(query.where)) : {};
	const selectParam = query.select ? eval(appendStringParen(query.select)) : {};
	const sortParam = query.sort ? eval(appendStringParen(query.sort)) : {};
	const skipParam = query.skip ? eval(appendStringParen(query.skip)) : 0;
	const limitParam = query.limit ? eval(appendStringParen(query.limit)) : 0;
	const countTrue = query.count ? eval(query.count) : false;

	User.find(whereParam).select(selectParam).sort(sortParam).skip(skipParam).limit(limitParam)
	.exec()
	.then((users_list) => {
		res.status(200).send({
			message: countTrue ? "OK. Returned total count of retrieved data." : "OK. List of Users.",
			data: countTrue ? users_list.length : users_list
		});
	}).catch((err) => {
		res.status(500).send({
			message: "Unable to retrieve user list",
			data: []
		});
	});
});



//POST new user route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
	console.log(req.body);
	if (!req.body.email) {
		return res.status(422).json({
			message: "Email is required!"
		});
	}

	if (!req.body.username) {
		return res.status(422).json({
			message: "Username is required!"
		});
	}

	if (!req.body.password) {
		return res.status(422).json({
			message: "Password is required!"
		});
	}

	if (!req.body.university) {
		return res.status(422).json({
			message: "University is required!"
		});
	}

	User
	.findOne({email: req.body.email})
	.exec()
	.then(user => {
		if (user) {
			return res.status(409).json({
				message: "Email exists!"
			});
		}
		const finalUser = new User({
			_id: new mongoose.Types.ObjectId(),
			email: req.body.email,
			username: req.body.username,
			university: req.body.university,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			major: req.body.major,
			year: req.body.year,
			expectedGraduation: req.body.expectedGraduation,
		});

		finalUser.setPassword(req.body.password);

		return finalUser.save()
		  .then(() => res.json({ user: finalUser.toAuthJSON() }));

	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});
  });

  //POST login route (optional, everyone has access)
  router.post('/login', auth.optional, (req, res, next) => {

	if(!req.body.email) {
	  return res.status(422).json({
		message: "email is required"
	  });
	}

	if(!req.body.password) {
	  return res.status(422).json({
		message: "password is required"
	  });
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
	  if(err) {
		return next(err);
	  }
	  if(passportUser) {
		const user = passportUser;
		user.token = passportUser.generateJWT();
		return res.json({
				userToken: user.toAuthJSON(),
				user: user
			});
	  }

	  return res.json({
		  error: "Email or password does not match"
	  });
	})(req, res, next)
  });


function appendStringParen(queryParam) {
	return '(' + queryParam + ')';
}



// Get certain user based on user ID
router.get('/:id', auth.optional, function(req, res) {
	// console.log(req.payload);
	// console.log(req.headers);
	User.findOne({_id: req.params.id}).exec()
	.then((user) => {
		if (user) {
			res.status(200).send({
				message: `OK. User ID: ${req.params.id} found.`,
				data: user
			});
		} else {
			res.status(404).send({
				message: `Cannot Find User of ID: ${req.params.id}`,
				data:[]
			});
		}
	}).catch((error) => {
		res.status(500).send({
			message: `Server Error: ${error}`,
			data:[]
		})
	});
});

// Get the list of posts users liked/ Current logged in UserLikes array is passed in from the frontend req.body
router.get('/liked/posts', auth.optional, (req, res, next) => {
	console.log(req.body.userLikes);
	Post.find({_id: {$in: req.body.userLikes}}).exec()
		.then((liked_posts) => {
			res.status(200).send({
				message: "OK!",
				data: liked_posts
			});
		})
		.catch(err => {
			res.status(500).send({
				message: "Server ERROR" + err
			})
		})
})

module.exports = router;
