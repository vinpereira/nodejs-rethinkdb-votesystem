## README
This is a simple code for a voting app made with RethinkDB, Node.js, Express, EJS, Socket.IO, and jQuery.

There are a lot of improvements to be made, but the core idea here is to learn how to use RethinkDB's API and how to create a real-time application.

## Programming Language and libraries used

  - Node.js v8.1.2

Main libraries:
  - body-parser ^1.17.2,
  - ejs ^2.5.6
  - express ^4.15.3,
  - path ^0.12.7,
  - rethinkdb ^2.3.3,
  - socket.io ^2.0.3
  
### RethinkDB with Docker
- Start RethinkDB container
```sh
$ docker run --name rethinkdb -v "$PWD:/data" -p 28015:28015 -d rethinkdb
```

### This code without Docker
- Download this repository and execute `npm install` to download the dependencies

- Execute `npm start` -- both database ('voting') and table ('movies') will be created

- Access `localhost:3000` to use the app

### This code with Docker
- Download this repository and execute `npm install` to download the dependencies

- Execute `docker build -t <your image name> .` -- this command will create a Docker image

- Execute `docker run -p 3000:3000 --link rethinkdb:rethinkdb -d --name <your container name> <your image name> ` -- this command will start the container

- Access `localhost:3000` to use the app

#### To access RethinkDB Web UI
- Get Docker container IP to access RethinkDB Web UI
```sh
$ docker inspect --format '{{ .NetworkSettings.IPAddress }}' rethinkdb
```
- Access RethinkDB Web UI - ```rethinkdb_ip:8080```