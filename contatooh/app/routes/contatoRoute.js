
var verificaAutenticacao = function (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status(401).json('Não autorizado');
	}
};

module.exports = function (app) {
	var controller = app.controllers.contatoController;

	app.route('/contatos')
		.get(verificaAutenticacao, controller.list)
		.post(verificaAutenticacao, controller.saveContato);

	app.route('/contatos/:id')
		.get(verificaAutenticacao, controller.contato)
		.delete(verificaAutenticacao, controller.deleteContato);
};