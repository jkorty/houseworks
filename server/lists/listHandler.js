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

		List.remove({'_id': listid}m function(err, result){
			if(err){
				console.log("mongo deleteOne list err: ", err);
				helper.sendError(err, req, res);
			} else {
				res.json(result);
			}
		});
	},
	
	// getOneList method
	
	// getListts method

	// getAllLists method

	// getJobs method

	// updateJobStatus method

	// updateStatus method


}