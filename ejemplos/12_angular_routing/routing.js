var router = function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('layout', {
            abstract: true,
            templateUrl: 'partials/layout.html',
            controller: 'LayoutCtrl'
        })
        .state('tasks', {
            url: '/tasks',
            abstract: true,
            parent: 'layout',
            templateUrl: 'partials/tasks.html',
            controller: 'TasksCtrl'
        })
        .state('create', {
            parent: 'tasks',
            url: '/create',
            templateUrl: 'partials/createTask.html'
        })
        .state('show', {
            parent: 'tasks',
            url: '/show',
            templateUrl: 'partials/allTasks.html'
        });

    $urlRouterProvider.otherwise('/tasks/create');
};

App.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router]);
