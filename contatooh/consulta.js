var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _id = new ObjectID('56a64222afb49d31e47acf72');

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh', function (erro, db) {
	if (erro) {
		throw err;
	};
	db.collection('contatos').findOne({_id: _id}, function (erro, contato) {
		if (erro){
			throw err;
		}
		console.log(contato);
	});
});