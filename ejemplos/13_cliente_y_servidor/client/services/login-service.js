// Este servicio lo vamos a utilizar para registrar nuevos usuarios,
// loguear (autenticar) usuarios, y para obtener la información
// del usuario que haya autenticado.

// $http y $q están explicados en tareas-service.js
// $window es un servicio que nos da angular y que utilizaremos
// para guardar el token cuando autentiquemos un usuario
LoginService = function($http, $q, $window, TareasService) {
    var SERVER_URL_AUTH = "http://localhost:8080/authenticate";
    var SERVER_URL_USERS = "http://localhost:8080/usuarios";

    var user = null;

    this.login = function(userData) {
        var q = $q.defer();

        // Petición POST a la url de autenticación,
        // con body = user (que será un objeto con username y password)
        $http.post(SERVER_URL_AUTH, userData)
            .then(
                function(response) {
                    // Guardamos el token en el $window.sessionStorage
                    // El token no se va a perder hasta que el usuario
                    // cierre el navegador (aunque cierre la pestaña se mantiene la info)

                    $window.sessionStorage.token = response.data.token;
                    user = null;
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    };

    this.isLoggedIn = function() {
        // Un usuario está logueado si el token está en sessionStorage
        return typeof $window.sessionStorage.token !== "undefined";
    }

    this.logout = function() {
        // Eliminamos el token y el usuario
        user = null;
        delete $window.sessionStorage.token;
    }

    this.getUser = function() {
        // Si ya lo tenemos lo devolvemos, sino dejamos el trabajo a reloadUser,
        // que lo va a obtener del servidor
        var q = $q.defer();
        if (user) {
            q.resolve(user);
            return q.promise;
        }
        else return this.reloadUser();
    }

    this.getUserSync = function() {
        return user;
    }

    this.reloadUser = function() {
        var q = $q.defer();

        // Obtiene el usuario del servidor
        $http.get(SERVER_URL_USERS)
            .then(
                function(response) {
                    // Y asignamos la variable local user a los datos obtenidos
                    user = response.data;
                    q.resolve(user);
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

    this.register = function(user) {
        var q = $q.defer();

        // Post a /usuarios con body = objeto del usuario
        $http.post(SERVER_URL_USERS, user)
            .then(
                function() {
                    q.resolve();
                },
                function(err) {
                    q.reject(err.data);
                }
        );

        return q.promise;
    };
}

angular.module('TareasApp').service('LoginService', ['$http', '$q', '$window', LoginService]);
