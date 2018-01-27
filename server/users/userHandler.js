// require jwt, helper, User, List
var jwt = require('jwt-simple');
var helper = require('../config/helpers.js');
var User = require('./userModel.js');

// export function
module.exports = {

	// TODO: coordinate with front end on what data should be sent and recieved

	// signin method
	signin: function(req,res){
		var email = req.body.email;
		var password = req.body.password;

		// This uses a comparePasswords method of the user model
		User.findOne({'email': email}, function(err, user){
			if(err){
				console.log("mongo findOne signin error: ", err);
				helper.sendError(err, req, res);
			} else {
				if(!user){
					helper.sendError("No user found", req, res);
				} else {
					user.comparePasswords(password, function(err, match){
						if(!match) {
							helper.sendError("Password invalid", req, res);
						} else {
							var token = jwt.encode(user, 'secret');
							res.json({
								token: token, // session token will be set on client side
								// user is alsoe returned, should be set to cookie so available for future server requests and db queries
								userid: user['_id'],
								address: user['address']
								// anything else to send back on success
							})
						}
					})
				}
			}
		})
	},

	// signup method
	signup: function(req,res){
		var email = req.body.email;
		var newUserObj = req.body;

		User.findOne({'email':email}, function(err, user){
			if(err){
				console.log("mongo findOne signup error: ", err);
				helpers.sendError(err, req, res);
			} else {
				if(user){
					helper.sendError("Email already registered",req,res);
				} else {
					User.create(newUserObj, function(err, user){
						if(err){
							console.log("mongo create user err: ", err);
							helper.sendError(err, req, res);
						} else {
							var token = jwt.encode(user, 'secret');
							res.json({
								token: token,
								userid: user['_id']
							});
						}
					});
				}
			}
		});
	}
}