var express = require('express'),
	router = express.Router(),
	User = require('../models/userSchema');
	mongoose = require('mongoose'),
	Post = require('../models/postSchema'),
	auth = require('./auth'),
	passport = require('passport');


router.use(express.json());

// Get all lists of users (So far in our fakeDB first)
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
			message: countTrue ? "OK. Returned total count of retrieved data." : "OK. List of Users. Wha?",
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
	const { body: { user } } = req;
  
	if(!user.email) {
	  return res.status(422).json({
		errors: {
		  email: 'is required',
		},
	  });
	}
  
	if(!user.password) {
	  return res.status(422).json({
		errors: {
		  password: 'is required',
		},
	  });
	}
  
	const finalUser = new User(user);
  
	finalUser.setPassword(user.password);
  
	return finalUser.save()
	  .then(() => res.json({ user: finalUser.toAuthJSON() }));
  });
  
  //POST login route (optional, everyone has access)
  router.post('/login', auth.optional, (req, res, next) => {
	const { body: { user } } = req;
  
	if(!user.email) {
	  return res.status(422).json({
		errors: {
		  email: 'is required',
		},
	  });
	}
  
	if(!user.password) {
	  return res.status(422).json({
		errors: {
		  password: 'is required',
		},
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
			user: user.toAuthJSON()
		});
	  }
  
	  return status(400).info;
	})(req, res, next);
  });

function appendStringParen(queryParam) {
	return '(' + queryParam + ')';
}



// Get certain user based on user ID
router.get('/:id', auth.required, function(req, res) {
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

module.exports = router;