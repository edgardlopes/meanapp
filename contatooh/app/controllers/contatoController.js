var sanitize = require('mongo-sanitize');

module.exports = function (app) {
	var Contato = app.models.contato;

	var controller = {};

	controller.list = function (req, res) {
		Contato.find().populate('emergencia').exec()
			.then(
				function (contatos) {
					res.json(contatos);
				},
				function (erro) {
					console.error(erro);
					res.status(500).json(erro);
				} 
			);

	};

	controller.contato = function (req, res) {
		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(
				function (contato) {
					if(!contato) throw new Error('Contato não encontrado');
					res.json(contato);
				},
				function (erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);
	};

	controller.deleteContato = function (req, res) {
		var _id = sanitize(req.params.id);
		Contato.remove({"_id": _id}).exec()
			.then(
				function () {
					res.status(204).end();
				},
				function (erro) {
					return console.error(erro);
				}	
			);
	};

	controller.saveContato = function (req, res) {
		var _id = req.body._id;
		
		req.body.emergencia = req.body.emergencia || null;

		//selecionando apenas os campos que fazem sentido nesse contexto de create/update
		var dados = {
			"nome": req.body.nome,
			"email": req.body.email,
			"emergencia": req.body.emergencia
		};

		if(_id){
			Contato.findByIdAndUpdate(_id, dados).exec()
				.then(
					function (contato) {
						res.json(contato);
					},
					function (erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
		}else{
			Contato.create(dados)
				.then(
					function (contato) {
						res.status(201).json(contato);
					},
					function (erro) {
						console.log(erro);
						res.status(500).json(erro);
					}
				);
		}
	};


	return controller;
};