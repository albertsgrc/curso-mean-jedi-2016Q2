// Una factory es equivalente a un service.
// La sutil diferencia es que en un service lo público es el objeto this o lo que devolvemos,
// en una factory es sólo lo que devolvemos.

// En este caso, este servicio ofrece dos funciones, request y response
// Estas funciones se ejecutarán cuando hagamos CUALQUIER PETICIÓN con
// el servicio $http, justo antes de enviar la petición (request) o de
// recibir su resultado (response).

// Pero cuidado, esto será así no porque el servicio se llame
// authInterceptor ni nada por el estilo, sino porque debajo especificamos
// con un config que queremos añadir este interceptor al servicio
// $http, para que se ejecute con todas las peticiones.

// Porqué es útil? lo podemos utilizar en la request para poner el token
// en el header de la petición (si lo tenemos guardado en sessionStorage, que es donde
// lo guardamos cuando autenticamos, ver login-service.js), tal y como lo haríamos
// en el postman poniendo Authorization y Bearer <token>.

// También lo podemos usar en la response para detectar cuando un usuario pide
// algo para lo que se requiere autenticación y no está autenticado, provocando
// que el servidor responda con un error de autenticación. Si esto ocurre (status 401)
// redirigimos al usuario a la vista de login
angular.module('TareasApp').factory('authInterceptor', ['$q', '$window', '$injector', function ($q, $window, $injector) {
    return {
        request: function (config) {
            // Si config.headers no está definido porque ningún otro interceptor
            // ha asignado nada en el header, lo ponemos por defecto a un objeto vacío
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                // Y si el token existe, lo ponemos en el header
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            // Si el servidor responde con un estado 401 (hacía falta autenticación y no hay token)
            if (response.status === 401) {
                // Redirigimos al usuario al estado login
                $injector.get('$state').transitionTo('login');

                // Hay que usar $injector porque en un .config no podemos
                // poner segun que servicios como dependencias, porque
                // aun no se han instanciado. Por eso lo hacemos así.

                // transitionTo es equivalente a go
            }

            return response;
        }
    };
}]);

angular.module('TareasApp').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
