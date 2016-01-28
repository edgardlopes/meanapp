angular.module('contatooh', ['ngRoute']);

//rotas
angular.module('contatooh').config(function ($routeProvider, $httpProvider) {

	$httpProvider.interceptors.push('interceptor');

	$routeProvider.when('/contatos', {
		templateUrl: 'views/contatos.html',
		controller: 'contatosController'
	});

	$routeProvider.when('/contato/:id', {
		templateUrl: 'views/contato.html',
		controller:  'contatoController'
	});

	$routeProvider.when('/contatos/novo', {
		templateUrl: 'views/contato.html',
		controller: 'contatoController'
	});

	$routeProvider.when('/auth', {
		templateUrl: 'views/auth.html'
	});

	$routeProvider.otherwise({redirectTo: '/contatos'});
});
