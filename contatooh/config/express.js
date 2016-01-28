var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function () {
	var app = express();

	app.set('port', 3000);

	app.use(express.static('./public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extend: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	app.use(cookieParser());
	app.use(session({
		secret: 'homem avestruz',
		resave: true,
		saveUnitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());


	//setando informacao falsa sobre o servidor
	app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));
	//evitando que as paginas sejam referenciadas por iframe
	app.use(helmet.xframe());
	//protejento contra XSS
	app.use(helmet.xssFilter());
	//impedindo carregamento de arquivos que nao sejam MIME Type
	app.use(helmet.nosniff());




	//carrega models, controllers e routes,
	//deve ser obrigatoriamente nessa ordem
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);



	//tratando 404, caso nenhuma rota atenda, direciona para tratamento de 404
	app.get('*', function (req, res) {
		res.status(404).render('404');
	});


	return app;
};