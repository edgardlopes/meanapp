var mongoose = require('mongoose');

module.exports = function (uri) {
	var configPool = {server: {poolSize: 15}};

	mongoose.connect(uri, configPool);

	mongoose.connection.on('connected', function () {
		console.log('MONGOOSE!! Conectado em ' + uri);
	});

	mongoose.connection.on('disconnected', function () {
		console.log('MONGOOSE!! Desconectado de ' + uri);
	});

	mongoose.connection.on('error', function (error) {
		console.log('MONGOOSE!! Erro na conexão: ' + error);
	});

	process.on('SIGINT', function () {
		mongoose.connection.close(function () {
			console.log('MONGOOSE!!! Desconectado pelo termino da aplicacao');
			process.exit(0); 
		});
	});
};