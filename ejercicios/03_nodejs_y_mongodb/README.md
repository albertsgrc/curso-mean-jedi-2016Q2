# Exercise 02 - MongoDB, Node.JS
<img src="http://1.bp.blogspot.com/-piBAUOhu13w/Um1f7-Q72-I/AAAAAAAAHk0/TPyPz2wNmDM/s1600/lightsabers_big1%5B1%5D.jpg" align="right" height="250px">
Este ejercicio hace referencia a los siguientes ejemplos:

[02_node_modulos](https://github.com/albertsgrc/curso-mean-jedi/tree/master/ejemplos/02_node_modulos)<br>
[02_node_y_mongodb](https://github.com/albertsgrc/curso-mean-jedi/tree/master/ejemplos/02_node_y_mongodb)

### Introducción:

El templo Jedi quiere registrar todas las espadas laser que hay en uso, con el fin de tener el control de todas las espadas laser del universo. 

### Ejercicio

Para tal propósito, necesitamos un programa que reciba una peticion con los siguientes parámetros: Color, Propietario e ID, y los guarde en nuestra base de datos de MongoDB. Si ha sido agregado correctamente debe devolver ```true```
```.

Ejemplo de petición: añadir espada laser

    method 'POST':
    /lightsaber?color=blue&owner=obiwan&id=12345
````

Tambien necesitamos poder hacer consultas sobre las espadas laser en función de su color y recibir su información en formato JSON.

```
Ejemplo de petición: Consultar espadas laser en función de su color

    method 'GET':
    /lightsaber?color=blue
    
```
