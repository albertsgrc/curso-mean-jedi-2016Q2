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
        templateUrl: 'views/partials/auth_protected/tareas.html',
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

// Un .run se ejecuta cuando la aplicación de angular se ha configurado y ya está corriendo
angular.module('TareasApp').run(['$rootScope', 'LoginService', '$state', function($rootScope, LoginService, $state) {
    // Aquí le decimos que cuando se empiece a cambiar de estdo de ui-router
    // Nos compruebe que el usuario está logueado, y si no lo está y el estado requiere
    // autenticación (es diferente de login) entonces redireccionamos al estado login
    // Esto hace que si el usuario no está logueado se le redireccione al login
    // cuando por ejemplo acceda a /tareas
    $rootScope.$on("$stateChangeStart", function(event, next) {
        if (!LoginService.isLoggedIn() && next.name !== "login") {
            event.preventDefault();
            $state.go("login");
        }
    });
}]);
