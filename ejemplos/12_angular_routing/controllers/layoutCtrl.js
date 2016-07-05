var LayoutCtrl = function($scope, $state) {
    $scope.tabs = [
          // PISTA: Poner en cada tab un atributo state con su correspondiente estado
          { title: 'Crear Tareas', state: 'create' },
          { title: 'Listado Tareas', state: 'show' }
        ];

    // Hay que comprobar cual es el estado actual y asignar
    // el índice del tab actual en función de esto
    if ($state.includes('create')) $scope.selectedIndex = 0;
    else if ($state.includes('show')) $scope.selectedIndex = 1;
};


App.controller('LayoutCtrl', ['$scope', '$state', LayoutCtrl]);
