#Angular Routing

###URL Routing
La manera más facil de conseguir un enrutamiento es redirigir una url hacia una template de nuestra aplicación. De esta manera, podemos tener una aplicación de una sola página actuando como una web normal que cambia su contenido.

###Estados del enrutamiento 
Los estados del routing son similares a la funcionalidad de un link (el cual nos redirije a otro sitio), pero nos permite cambiar de estado en nuestra propia apicación si tener que cambiar nuestra url.

##Usando ui.router para el enrutamiento
Usaremos un modulo llamado UI Router para hacer el routing. Para importarlo puedes usar su cdn.

    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js"></script>

###uiView
Usaremos la directiva uiView donde queramos cargar nuestro contenido. En esa uiView, el ui.router cargará los datos de la template seleccionada.

    <div ui-view></div>

###uiSref
La directiva uiSref es la alternativa al clásico `href`, con la diferencia que nos redirigirá a un estado nuestro.

    <a ui-sref="home"></a>

###Configurando los estados
Para configurar los estados, usaremos config() dentro de nuestro modulo. Fijaron que dependiendo de la ruta, podemos indicar el template y el controller que queremos usar.

    routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
            controller: 'homeController'
        })

        .state('/other', {
            //We can concatenate creation of states.
        });
    });


