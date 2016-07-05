var LayoutCtrl = function($scope) {
    $scope.tabs = [
          // PISTA: Poner en cada tab un atributo state con su correspondiente estado
          { title: 'Piet Mondrian' },
          { title: 'Ciclistas' },
          { title: 'About' }
        ];

    // Aquí tenéis que asignar la variable $scope.selectedIndex
    // en función del estado en que estemos. Podéis usar $state.includes(<nombre_estado>)
    // para discriminar en que estado estáis, y asignar el valor del $scope.selectedIndex
    // al índice del tab que corresponde al estado
};


angular.module('RandomApp').controller('LayoutCtrl', ['$scope', LayoutCtrl]);