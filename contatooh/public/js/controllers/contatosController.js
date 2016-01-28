angular.module('contatooh').controller('contatosController', function ($scope, contatoService) {

	$scope.incrementaTotal = function (value) {
		$scope.total += value;
	};

	$scope.contatos = [];


	var _getContatos = function () {
		contatoService.getContatos().success(function (contatos) {
			$scope.contatos = contatos;
		}).error(function() {
			$scope.error = 'Ops, um erro ocorreu!';
		});
	};


	$scope.removerContato = function (contato) {
		contatoService.deleteContato(contato._id).success(function () {
			_getContatos();
		}).error(function () {
			$scope.error = 'Ops, um erro ocorreu! (delete)';
		});
	};

	_getContatos();

});