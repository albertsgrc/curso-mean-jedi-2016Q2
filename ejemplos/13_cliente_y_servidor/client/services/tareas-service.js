// Este servicio depende de los servicios $http, $q y nuestro servicio LoginService

// Como podéis ver, los servicios que nos da angular o otros módulos
// normalmente empiezan por $, en cambio los nuestros los definimos sin $
// Esta convención es útil para identificar rápidamente si el módulo es nuestro
// o externo.

// $http lo utilizamos para hacer las peticiones al servidor

// $q lo utilizamos para las promises, es decir, para poder generar
// funciones asíncronas

// LoginService lo utilizamos para obtener las tareas del usuario logueado
TareasService = function($http, $q, LoginService) {
    // Variable privada
    var SERVER_URL_TAREAS = "http://localhost:8080/usuarios/tareas/"

    // El objeto this no es el mismo dentro de las funciones
    // Por eso creamos una copia, para poder referenciarlo
    // desde dentro de las funciones y que siempre nos estemos refiriendo
    // al del servicio
    var self = this;

    // Estado que guarda el servicio. Array de tareas.
    var tareas = null;

    this.reset = function() {
        tareas = null;
    };

    // Función pública, obtener todas las tareas
    this.getTareas = function() {
        var q = $q.defer();

        // Si no está logueado damos error (no debería pasar ya que si
        // llegamos aquí es porque estamos logueados)
        if (!LoginService.isLoggedIn()) q.reject();
        else LoginService.getUser().then(
            // getUser de LoginService devuelve una promise, por lo que hay que usar then
            function(user) {
                tareas = user.tareas;
                q.resolve(tareas);
            }, function(error) {
                q.reject(error);
            }
        );

        // Como la función es asíncrona, devolvemos una promise

        return q.promise;
    };

    this.actualizarTarea = function(id, completada) {
        var q = $q.defer();

        // Petición patch al servidor, con la url como primer parámetro
        // y el body que pasamos como segundo
        // Notad que el token ya lo pondrá el servicio authInterceptor
        $http.patch(SERVER_URL_TAREAS + id, { completada: completada })
            .then(
                function() {
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

    this.anadirTarea = function(task) {
        var q = $q.defer();

        // Post con primer parámetro la url, segundo el body, que será la tarea
        $http.post(SERVER_URL_TAREAS, task)
            .then(
                function(response) {
                    // La añadimos también en nuestro array
                    // Como tareas compartirá referencia con $scope.tareas
                    // en el controlador TareasCtrl, también se actualizará
                    // en la vista el cambio, sin necesidad de hacer nada
                    tareas.push(response.data.tareas[response.data.tareas.length-1]);
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }
}

angular.module('TareasApp').service('TareasService', ['$http', '$q', 'LoginService', TareasService]);
