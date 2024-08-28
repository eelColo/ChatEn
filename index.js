import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";


const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT ?? 4500



app.use(express.static("public"));

//Conexion
io.on("connection", (data) => {
    console.log("Nueva conexion establecida", data)

    //Eventos
    // Cuando el server recibe un mensaje
    data.on("message", (data) =>{
        console.log(data);
        // Envia un mensaje a los demas conectados 
        io.emit("message", data)
    })
    
})

//Desconexion
io.on("disconnect", (data) => {
    console.log("Cliente desconectado")
    console.log(data)
})


//Levantando servidor
server.listen(PORT, console.log("---Servidor corriendo--- en: " + PORT))

