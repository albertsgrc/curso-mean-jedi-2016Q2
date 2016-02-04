angular.module('TareasApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
    .state('layout', {
        abstract: true,
        templateUrl: '/views/partials/layout.html',
        controller: 'LayoutCtrl'
    })
    .state('login', {
        parent: 'layout',
        templateUrl: 'views/partials/login.html',
        url: '/login',
        controller: 'LoginCtrl'
    })
    .state('tareas', {
        parent: 'layout',
        templateUrl: 'views/partials/tareas.html',
        url: '/tareas',
        controller: 'TareasCtrl'
    });

    // Cuando la ruta a la que acceda el usuario no sea ninguna
    // de las definidas arriba, redirigimos al login
    $urlRouterProvider.otherwise('/login');

    // Con esto evitamos que salga el # siempre en la url
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);