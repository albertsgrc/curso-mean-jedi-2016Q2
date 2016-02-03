# Agenda de contactos - Proyecto Final 

## Introducción
<img src="https://libreclipart.files.wordpress.com/2012/01/agenda.png" height="250" align="right">

En este proyecto, vamos a utilizar todas las herramientas que hemos visto en el curso. La idea del proyecto es muy simple, vamos a realizar una página web con cliente y servidor para organizar en diferentes agendas todos nuestros contactos. La aplicación debe permitir **registrarte con usuario y password**, hacer **login** y **aplicar las operaciones CRUD** (Create, Read, Update y Delete) tanto en las agendas como en los contactos. Notad que las agendas y contactos estarán asociados a un usuario, de modo que sólo ese usuario debe poder ver sus agendas y contactos.

Además, para los que queráis subir nota, hemos incluido unas tareas extras que son totalmente opcionales.

## Proyecto

#### Registro

La aplicación debe permitir registrar usuarios y guardar su información en la base de datos. Cuando el usuario introduce sus datos, la aplicación debe controlar que el usuario esté introduciendo bien toda la información y avisarle en caso de que algún campo sea incorrecto. En este registro, se debe introducir un mail y una contraseña válida. A parte, debe haber otro campo pidiendo al usuario que repita la contraseña y si estas no coiniciden, notificar al usuario. El usuario no puede enviar el formulario de registro hasta que todos los campos sean correctos.

####Login

Igual que en el registro, el usuario debe introducir los campos de mail y contraseña correctamente y la aplicación debe controlar y mostrar cualquier tipo de error. El usuario no podrá enviar el formulario hasta que todos los campos sean correctos y se le deberá avisar de cualquier error.

#### Agendas

Cuando el usuario hace login, se deben mostrar todas las agendas de ese ususario. Cada agenda debe tener un nombre y contener un conjunto de contactos. Se debe poder visualizar todas la agendas, crear nuevas, cambiar su nombre y borrarlas.

#### Contactos

Los contactos deben tener información como: nombre, apellidos, compañia, teléfono móvil... (Poned más si queréis, es opcional).

Cuando se seleccione una agenda, se deben visualizar todos los contactos de esa agenda. Se debe ofrecer la opción de crear nuevos contactos en esa agenda, de modificar su información o de borrarlos.

######Estos son los 4 casos de uso básicos que debe tener la aplicación. La manera en como organices la API REST y el Fron-end la decides tú.

## Evaluación

Vamos a tener en cuenta los siguientes aspectos:

* **Seguridad** del servidor, es decir, que se hagan las comprobaciones que tocan, p.ej que un usuario no pueda acceder a las agendas y contactos de otros usuarios, que se encripten las contraseñas...etc.
* **Limpieza, simplicidad, mantenibilidad y legibilidad** del código.
* **Uso de herramientas** que se hayan explicado en clase, como async o coffeescript. (Opcional, puede subir nota, no bajará nota si no las usáis).
* **Funcionalidades extra** implementadas.
* **Correctitud**, es decir, que vuestra aplicación haga lo que se pide en el enunciado y no dé errores inesperados.
* **Originalidad del código**: Que no copiéis de los ejemplos y programéis a vuestra manera.

NO se va a tener en cuenta:

* **Estilo de la página**, i.e que tenga un diseño bonito. Pedimos un mínimo de calidad, pero no vamos a subir nota
  si la página es más bonita estéticamente, porque muchos no sabéis ni css ni html, por lo que os supondría una dificultad extra.

## Extras

> “Si puedes imaginarlo puedes lograrlo, 
> si puedes soñarlo, puedes hacerlo realidad” 
>                       -William Arthur Ward

####Conectar contactos

Modifica tu aplicación para que los contactos de tus agendas, sean usuarios de la propia aplicación. Los cuales puedas buscar y agregar a una o varias agendas. 

Cuando un usuario agregue a otro usuario, notificar al segundo usuario de que lo han añadido a una agenda.

####Drag/Drop

Implementa un drag and drop para mover contactos entre agendas.

Más información [angular-drag-drop](http://codef0rmer.github.io/angular-dragdrop/#/)

####Chat en tiempo real (Difícil)

Usa [socket.io](http://socket.io/) para crear un chat con el que hablar con los otros usuarios que estan usando la aplicación y que tienes en alguna agenda.
