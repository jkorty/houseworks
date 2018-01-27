// require helper, User, List
var helper = require('../config/helpers.js');
var User = require('../users/userModel.js');
var List = require('./listModel.js');

// export function
module.exports = {

	// TODO:
	// Coordinate with frontend on what data should be sent and recieved

	// addList method
	addList: function(req,res){
		var newListObj = req.body;

		List.create(newListObj, function(err, list){
			if(err) { // notifies if error is thrown
				console.log("mongo create list err: ", err);
				helper.sendError(err,req,res);
			} else { // list created, sends 201 status
				//res.status(201);
				res.json(list);
			}
		});
	},

	// updateList method
	updateList: function(req, res){
		var id = req.body.creator_id;
		var due_at = req.body.due_at;
		var name = req.body.name;

		List.findOne({'creator_id': id, 'due_at': due_at, 'name': name}, function(err, list){
			if(err){
				console.log('List Findone ERROR ****** ');
				console.log(err);
			}
			list.deliverer_id = req.body.deliverer_id;
			list.save();
			res.json(list);
		});
	},

	// deleteList method
	deleteList: function(req,res){
		var listid = req.params.id;

		List.remove({'_id': listid}, function(err, result){
			if(err){
				console.log("mongo deleteOne list err: ", err);
				helper.sendError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},

	// getOneList method
	getOneList: function(req,res){
		var listid = req.params.id;

		List.findOne({'_id':listid}, function(err, list) {
			if(err) {
				console.log("mongo getOneList err: ", err);
				helper.sendError(err, req, res);
			} else {
				if(!list){
					helper.sendError("List not found", req, res);
				} else {
					res.json(list);
				}
			}
		});
	},

	// getListts method
	getLists: function(req, res) {
		// var userid = req.body.userid;

		// temporarily passing through url
		var userid = req.params.id;

		List.find({'creator_id':userid})
			.then(function(lists){
				res.json(lists);
			});
	},

	// getAllLists method
	getAllLists: function(req, res) {
		List.find({})
			.then(function(lists){
				res.json(lists);
			})
	},

	// getJobs method
	getJobs: function(req,res){
		var userid: '786'+ req.params.id;
		console.log('$$$$$$$$$$');
		List.find({'deliverer_id':userid})
			.then(function(lists){
				res.json(lists);
			});
	},

	// updateJobStatus method
	updateJobStatus: function(req,res) {
		// TODO: Fill out
	},

	// updateStatus method
	updateStatus: function(req, res){
		var listid = req.body.listid;
		var userid = req.body.userid;

		List.findOne({'_id':listid}, function(err, list){
			if(err){
				console.log("mondo findOne list err: ", err);
			} else {
				if(!list){
					helper.sendError("List not found", req, res);
				} else {
					List.update({'_id':listid}, {'deliverer_id':userid}, function(err, result){
						if(err){
							console.log("mongo update err: ", err);
						} else {
							res.json(result);
						}
					});
				}
			}
		});
	}
};