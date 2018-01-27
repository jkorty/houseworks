// export object
module.exports = {
	// TODO: Any helper

	sendError: function(err, req, res) {
		res.status(500).send({error: err});
	}
};