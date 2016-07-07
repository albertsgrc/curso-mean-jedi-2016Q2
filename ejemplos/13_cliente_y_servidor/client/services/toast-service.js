// Este servicio ofrece una función que muestra un toast con un texto determinado
// Un toast es una alerta con un texto que en este caso sale en la esquina inferior
// izquierda, de color gris

// En este caso este servicio depende de otro servicio, $mdToast, que nos proporciona
// el módulo angular-material para mostrar fácilmente un toast
var ToastService = function($mdToast) {

    // Las funciones públicas se ponen como propiedades del objeto this
    // Todo lo demás es privado (en este caso no hay nada privado)
    // Público quiere decir visible cuando alguien utiliza el servicio
    // poniendolo como dependencia, como hacemos en este con $mdToast.
    // Cuando alguien dependa de ToastService usando toastService.showToast
    // podrá llamar esta función, ya que toastService referenciará al this que
    // vemos aquí
    var toast = $mdToast.simple();

    this.showToast = function(txt) {
        console.log("Toast: " + txt);
        $mdToast.show(
            toast.textContent(txt)
                .position({ left: true, bottom: true, top: false, right: false })
                .hideDelay(6000)
        );
    }

    // Recordad también que este código se ejecuta una sola vez, ya que
    // todos los servicios son singletons (se instancian una sola vez)

    // Los servicios son como clases de Java o C++, pueden guardar estado en su
    // interior, con variables privadas (var priv = ...) o públicas (this.publ = ...)
    // y como la clase es un singleton y no se elimina ni se vuelve a instanciar,
    // el estado guardado permanece mientras el usuario navega por nuestra página
    // y se pierde cuando este hace una recarga o la abre de nuevo.
}

// La declaración y la especificación de las dependencias funciona igual
// que con los controladores, pero aplicando la función service
angular.module('TareasApp').service('ToastService', ['$mdToast', ToastService]);
