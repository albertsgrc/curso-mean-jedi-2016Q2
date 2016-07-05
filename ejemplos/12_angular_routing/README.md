# Angular Routing

En este ejemplo tenéis un página web que permite crear tareas y listarlas. Consta por lo tanto
de dos páginas, una para crear tareas, y otra para listarlas.

La jerarquía de los estados de la página es la siguiente:

```
layout
|
|
----tasks
    |
    |
    ----create
    |
    |
    ----show
```

Tenemos un estado general, **layout**, que es el que contiene la barra de navegación con los botones
que nos envían a cada uno de los dos estados. Notad que este estado es abstracto, ya que no vamos
a acceder directamente a él sino que lo haremos mediante alguno de sus estados hijos.

Tenemos además un estado hijo de layout, **tasks**, que nos sirve para asociar un controlador `tasksCtrl` que será compartido por los dos estados hijos, **create** y **show**.

Estos dos estados hijos no tienen controlador (heredan el del padre, **tasksCtrl**), y son los que tienen asociadas las vistas correspondientes a la creación y al listado de tareas (`partials/createTask.html` y `partials/allTasks.html`.)
