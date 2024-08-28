import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";


const app = express();
const server = createServer(app);
const ws = new Server(server);
const PORT = process.env.PORT ?? 4500
let usuariosOnline = 0;


app.use(express.static("public"));

//Cuando hay una conexion
ws.on("connection", (data) => {
    console.log("Nueva conexion establecida: ")
    usuariosOnline += 1
    console.log("Usuarios online: " + usuariosOnline)

    //Al haber una conexion emitimos un updateUserCount y enviamos la cantidad de usuarios
    ws.emit("updateUserCount", usuariosOnline);

    //Eventos
    // Cuando el server recibe un mensaje
    data.on("message", (data) =>{
        console.log("Mensaje recibido: ");
        console.log(data);
        // Envia un mensaje a los demas conectados 
        ws.emit("message", data)
    })
    data.on("disconnect", (data) => {

        ws.emit("updateUserCount", usuariosOnline)
        console.log("Cliente desconectado")
        usuariosOnline -= 1;
        console.log("Usuarios totales: " + usuariosOnline)
        console.log(data)
    })
})

//Desconexion



//Levantando servidor
server.listen(PORT, console.log("---Servidor corriendo--- en: " + PORT))

