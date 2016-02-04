var LayoutCtrl = function($scope, $state, LoginService) {
    $scope.pageName = function() {
        if ($state.includes('login')) return "Login";
        else return "Listado de Tareas";
    };
};


angular.module('TareasApp').controller('LayoutCtrl', ['$scope', '$state', 'LoginService', LayoutCtrl]);