# express.Router

`express.Router` es una clase que nos ofrece express y que se utiliza para modularizar la enrutación.

Imaginad una app compleja, donde tenemos muchisimos caminos de url (/usuarios, /productos, /categorias, etc...) 
posibles a tratar.

Tiene sentido poder separar el enrutamiento en diferentes ficheros dependiendo
de la función que desempeñen, añadiendo una estructura más clara a nuestra API.

De esta forma, es más fácil organizar los diferentes caminos de nuestra API.

Notad como tasks.js define todas las rutas relacionadas con tareas, mediante la clase
`express.Router()` que nos ofrece express. El router es luego exportado para ser usado en
el fichero principal server.js

Para más info: http://expressjs.com/guide/routing.html

