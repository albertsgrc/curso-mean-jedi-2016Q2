# Instalación del entorno

Este ejemplo consiste únicamente de este readme, con instrucciones para instalar el programario necesario para el curso.

## Instalación MongoDB

**Preferible instalar v3.2.1**

### Mac OS X

La mejor opción para instalar MongoDB en Mac es usar Homebrew (http://brew.sh/), lo podéis descargar con éste comando.

```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```

Vamos a instalar MongoDB:

1. Actualizar Homebrew

        brew update

2. Instalar MongoDB

        brew install mongodb

3. Cuando haya finalizado la instalación, debemos crear un directorio `/data/db` para almacenar las bases de datos. Este es el directorio que usa mongodb por defecto, aunque es configurable.

        sudo mkdir /data/db

4. Luego hay que asignarle los permisos para que mongodb pueda abrir y modificar la carpeta

        sudo chown $USER /data/db

5. Una vez finalizado esto, podrás iniciar el servidor mongodb con el comando

        mongod

   Y aparecerá un mensaje del tipo *waiting for connections on port 27017* si todo ha ido bien.

### Windows

1. Ir a https://www.mongodb.org/downloads y bajar el paquete adecuado

   Una vez finalizada la instalación, tendrás una carpeta `C:\mongodb` con los ejecutables de mongodb.

2. Crear la carpeta `C:\data\db`

3. Ir a `C:\mongodb\bin` y ejecutar mongod. Si todo ha ido bien aparecerá un mensaje del tipo *waiting for connections on port 27017*.

### Linux Ubuntu

Abrir un Terminal y ejecutar los siguientes comandos:

1. Importar la clave pública para el gestor de paquetes del sistema:

        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

2. Crear un fichero de lista para MongoDB:

        echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

3. Actualizar la base de datos de paquetes local:

        sudo apt-get update

4. Instalar los paquetes de MongoDB:

        sudo apt-get install -y mongodb-org

5. Ahora, para iniciar el servidor de mongodb solo tendrás que escribir:

        sudo service mongod start

   Y si todo ha ido bien, aparecerá un mensaje del tipo:

        mongod start/running, process XXXX

### Otras distribuciones Linux

Sigue uno de estos tutoriales, en función de tu distribución:

- [Install on Red Hat](https://docs.mongodb.org/v2.6/tutorial/install-mongodb-on-red-hat/)
- [Install on Debian](https://docs.mongodb.org/v2.6/tutorial/install-mongodb-on-debian/)
- [Install on Other Linux Systems](https://docs.mongodb.org/v2.6/tutorial/install-mongodb-on-linux/)

## Instalación Node.js

### Mac OS X

Del mismo modo que con MongoDB, se puede usar Homebrew para instalar Node:

    brew install node

Y esto es todo.

### Windows

Ir a http://nodejs.org/#download y bajar el instalador de Windows.

Instalarlo y hecho.

### Linux Ubuntu

1. Abrir un terminal y escribir:

        curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
        sudo apt-get install -y nodejs

2. Para poder iniciar node indiferentemente con los comandos `node` y `nodejs`, lo cual es necesario para algunos paquetes de node, escribe:

        sudo apt-get install nodejs-legacy

### Otras distribuciones Linux

Seguir uno de los tutoriales en este [link](https://nodejs.org/en/download/package-manager/), en función de tu distribución.

## Jetbrains WebStorm IDE (Opcional)

Se recomienda usar el IDE WebStorm (basado en IntellijIDEA) para desarrollar proyectos web.

Lo puedes bajar desde https://www.jetbrains.com/webstorm/

Si te registras con tu cuenta de la UPC, o una cuenta .edu, tendrás acceso gratuito para finalidades educativas.
Sino, puedes usar el período de prueba de 30 días.
