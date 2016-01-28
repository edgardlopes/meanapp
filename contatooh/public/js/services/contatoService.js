angular.module('contatooh').factory('contatoService', function($http){
	var _getContato = function (idContato) {
		return $http.get('/contatos/' + idContato);
	};

	var _salvarContato = function (contato) {
		return $http.post('/contatos', contato);
	};

	var _getContatos = function () {
		return $http.get('/contatos');
	};

	var _deleteContato = function (idContato) {
		return $http.delete('/contatos/' + idContato);
	};

	return {
		getContato: _getContato,
		salvarContato: _salvarContato,
		getContatos: _getContatos,
		deleteContato: _deleteContato

	};
});