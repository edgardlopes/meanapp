var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
	var schema = mongoose.Schema({
		login: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		nome: {
			type: String,
			required: true
		},
		inclusao: {
			type: Date,
			default: Date.now
		},
		redeOrigem:{
			type: String,
			required: true
		}
	});

	schema.plugin(findOrCreate);
	return mongoose.model('Usuario', schema);
};