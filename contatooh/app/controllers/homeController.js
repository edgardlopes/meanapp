module.exports = function () {
	var controller = {};
	controller.index = function (req, res) {
		var usuarioLogado = '';
		if(req.user){
			usuarioLogado = req.user.login;
		}
		
		res.render('index', {'usuarioLogado': usuarioLogado});
	};
	return controller;
};