var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var mongoose = require('mongoose');

module.exports = function () {
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID:'caf328343c79771cbebc',
		clientSecret: '8361c13790f122f3b89e40529e3bdf978c52c37a',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	function (accessToken, refreshToken, profile, done) {
		//findOrCreate:
		//param 1: criterio
		//param 2: atributos complementares, pode ser um objeto
		Usuario.findOrCreate(
			{'login': profile.username},
			{'nome': profile.username, 'redeOrigem': 'GitHub'},
			function (erro, usuario) {
				if (erro) {
					console.log(erro);
					return done(erro);
				};

				return done(null, usuario);
			}

		);
	}));

	passport.use(new FacebookStrategy({
	    	clientID: '965227033554119',
	    	clientSecret: 'f2a2c461b725f3520268b3b4756a1c86',
	    	callbackURL: 'http://localhost:3000/auth/facebook/callback'
  		},
  		function (accesToken, refreshToken, profile, done) {
  			 Usuario.findOrCreate(
  			 	{'login': profile.displayName},
  			 	{'nome': profile.displayName, 'redeOrigem': 'Facebook'},
  			 	function (erro, usuario) {
  			 		if(erro){
  			 			console.log(erro);
  			 			return done(erro);
  			 		}

  			 		return done(null, usuario);
  			 	}
  			 );
  		}));



	/*
		Chamado apenas UMA vez e recebe o usuario do banco, 
		disponibilizado pelo callback da estrategia de autenticacao (parametro profile)
		guarda apenas o ObjectId do usuario na sessao
	*/
	passport.serializeUser(function (usuario, done) {
		done(null, usuario._id);
	});

	//desserializando usuario da sessao, o proprio passport faz isso, e disponibiliza em cada request
	passport.deserializeUser(function (id, done) {
		Usuario.findById(id).exec()
			.then(function (usuario) {
				done(null, usuario);
			});
	});
};