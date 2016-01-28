var passport = require('passport');
module.exports = function (app) {
	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/'}));

	//login facebook
	//rota 1: chama pagina para login
	//rota 2: em caso de sucesso redireciona para a pagina principal da app
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/'}));

	
	app.get('/logout', function (req, res) {
		req.logOut();
		res.redirect('/');
	});

};