angular.module('contatooh').controller('contatoController', function  ($scope, $routeParams, contatoService, $location) {
	var _contatoId = $routeParams.id;

	$scope.contato = {};

	$scope.contatos = [];

	contatoService.getContatos().success(function (data) {
		$scope.contatos = data;
	}).error(function (status) {
		$scope.error = 'Ops, um erro ocorreu ao buscar os contatos: ' + status;
	});

	if(_contatoId){
		contatoService.getContato(_contatoId).success(function (data) {
			$scope.contato = data;
		});
	}



	$scope.salvarContato = function (contato) {
		contatoService.salvarContato(contato).success(function (data) {
			$location.path('#/contatos');
		}).error(function(status) {
			console.log('Não deu certo!');
			$scope.error = 'Ops, um erro ocorreu :(. Status: ' + status;
		});
	};

});