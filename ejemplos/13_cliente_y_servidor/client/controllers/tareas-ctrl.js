// Este controlador es para el dialog de añadir una tarea
angular.module('TareasApp').controller('createTareaDialogController',
    ['$scope', '$mdDialog', 'TareasService', 'ToastService',
        function ($scope, $mdDialog, TareasService, ToastService) {
    $scope.titulo = '';

    $scope.cancel = function() {
        // Cierra el dialog
        $mdDialog.cancel();
    }

    $scope.answer = function() {
        // Usamos tareasService para añadir la tarea (asíncrono)
        TareasService.anadirTarea({ titulo: $scope.titulo }).then(
            function() {
                ToastService.showToast("Tarea añadida correctamente");
                $mdDialog.hide();
            },
            function(err) {
                ToastService.showToast("Ha ocurrido un error al añadir la tarea. Vuelvelo a intentar");
                $mdDialog.hide();
            }
        );
    }
}]);

// Este es el del estado de tareas
var TareasCtrl = function($scope, TareasService, ToastService, $mdDialog) {
    $scope.tareas = [];

    // Usamos TareasService (definido por nosotros) para obtener las tareas
    // Notad que es asíncrono, por eso usamos la promise
    TareasService.getTareas().then(function(tareas) {
        $scope.tareas = tareas;
    }, function(err) {
        ToastService.showToast("Se ha producido un error al cargar las tareas");
    });

    // Si no hay tareas mostramos un mensaje
    $scope.mostrarMensajeNoTareas = function() {
        return $scope.tareas == null || $scope.tareas.length === 0;
    }

    // Para cuando se pulsa en el checkbox
    $scope.actualizarTarea = function(id, completada) {
        TareasService.actualizarTarea(id, completada).then(
            function() {},
            function(err) {
                ToastService.showToast("Se ha producido un error, intentalo más tarde");
            });
    };

    // Cuando se pulsa el boton de añadir tarea abrimos un dialog
    // con el servicio $mdDialog que nos da angular-material
    $scope.mostrarDialogTarea = function(event) {
        $mdDialog.show({
            controller: 'createTareaDialogController',
            templateUrl: 'views/partials/auth_protected/add-task.html',
            parent: angular.element(document.body),
            targetEvent: event
        });
    };
};

angular.module('TareasApp').controller('TareasCtrl', ['$scope', 'TareasService', 'ToastService', '$mdDialog', TareasCtrl]);
