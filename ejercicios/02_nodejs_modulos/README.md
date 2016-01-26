# Ejercicio 03 - Módulos en Node.js

<p align="center"><img src="http://fotos.subefotos.com/f93159a70d819823ec03791b4bb8d2aco.jpg" height="200px"></p>

### Ejercicio:

En este ejercicio crearemos un programa para utilizar varios módulos. Para eso usaremos esta estructura:

````
  var index = 0;
  var intervalId = setInterval(function(){
        if (index == 0){
          //utiliza un modulo
        }
        if(index == 1) {
          //utiliza otro modulo
        }
        if ....
     index++;
  },3000);
`````

Esta estructura incrementa cada 3 segundos el index y utiliza un nuevo módulo al entrar en cada ```if ```. A continuación un listado de los módulos que debéis utilizar:

- Index 0 (Instalar un nuevo módulo exterior): Usad el módulo [Colors](https://www.npmjs.com/package/colors) para que os aparezca un mensaje 'Bienvenido a la comunidad Jedi' de color azul y un mensaje 'Bienvenido al lado oscuro' de color rojo.

- Index 1 (Exportar e importar un nuevo módulo):
Cread un nuevo módulo aparte e importadlo en nuestro programa. Éste modulo debe contener el mismo módulo [Colors](https://www.npmjs.com/package/colors) que hemos visto cuando ````index == 0````. Pero esta vez debe imprimir los mensajes 'Bienvenido a la comunidad Jedi desde otro módulo' y 'Bienvenido al lado oscuro desde otro módulo' tambien en azul y rojo respectivamente.

- Index 2 (Usar un módulo que node ya incorpora): 
Cread un nuevo módulo aparte que imprima por consola los archivos de la carpeta que lo contiene. (Puedes hacerlo con un ```console.log()```). Al final tambien debe imprimir por consola el numero de ficheros que ha leído.

- Index 3 (Buscar un módulo en Internet y usarlo): 
Buscad un módulo por Internet (por ejemplo en [npmjs.com](https://www.npmjs.com/) ), importadlo y haced una demo que muestre su utilidad.

    

