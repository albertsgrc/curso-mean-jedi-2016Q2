var CiclistasCtrl = function($scope) {
    $scope.ciclistas = [
        {
            nombre: "Fabian Cancellara",
            tipo: "Contrarelojista/Clasicómano",
            foto: "img/ciclistas/fabian.jpg"
        },
        {
            nombre: "Lance Armstrong",
            tipo: "Escalador",
            foto: "img/ciclistas/lance.jpg"
        },
        {
            nombre: "Chris Froome",
            tipo: "Escalador",
            foto: "img/ciclistas/froome.jpg"
        },
        {
            nombre: "Alberto Contador",
            tipo: "Escalador",
            foto: "img/ciclistas/contador.jpg"
        }
    ]
};


angular.module('RandomApp').controller('CiclistasCtrl', ['$scope', CiclistasCtrl]);