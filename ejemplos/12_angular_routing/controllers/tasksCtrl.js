var TasksCtrl = function($scope, $rootScope, $state) {
    $scope.formData = {
      showDueDate: false
    };

    $scope.today = new Date();


    // $rootScope es el scope padre, y se puede acceder a él desde cualquier controlador
    // y vista de la aplicación
    $rootScope.taskslist = [];

    $scope.createTask = function() {
      var newTask = {
        title: $scope.formData.title,
        description: $scope.formData.description,
        dueDate: $scope.formData.dueDate
      };

      $rootScope.taskslist.push(newTask);
    };

    $scope.search = {};
};


App.controller('TasksCtrl', ['$scope', '$rootScope', '$state', TasksCtrl]);
