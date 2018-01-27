var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
	name: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	delivered_at: Date,
	due_at: Date,
	expired_at: Date,
	creator_id: String,
	deliverer_id: String,
	items: [],
	total_price: Number,
	offer_price: Number,
	status: String,

	// If delivery address is different from list creator's address
	delivery_address: {
		street: String,
		city: String,
		state: String,
		zip_code: Number
	}
});

module.exports = mongoose.model('List', ListSchema);