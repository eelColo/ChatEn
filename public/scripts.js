
document.addEventListener('DOMContentLoaded', () =>{
    const socket = io(); //websocket
    const form = document.getElementById('entrada');
    const list = document.querySelector(".messages");
    const online = document.getElementById("onlinewachos")
    const displayuser = document.getElementById("userd")
    //Obtener usuario
    let username = prompt("Dame tu user")
    displayuser.textContent = username + " > ";
    console.log(username)

    //Recepcion de datos
    //Al recibir mensaje del servidor desestructura los datos en usuario y mensaje
    socket.on("message", ({user,message}) => {
        // Crea un List Item
        const li = document.createElement('li');
        li.className = "d-flex gap-1"
        const par0 = document.createElement('p')
        const par1 = document.createElement('p')


        // Inserta dentro del Li dos Parrafos que contienen el usuario y el mensaje con estilos especificos
        
        par0.textContent= user;
        par0.innerText += " > "
        par0.className = "user-title"

        par1.textContent = message;

        li.appendChild(par0);
        li.appendChild(par1);

        list.appendChild(li);
        li.scrollIntoView({behavior:"smooth",block:"end"})
        
    })
    socket.on("loadmessages", (mensjs) =>{
        
    })

    socket.on("newUserCount", (numeroDeUsuarios) => {
        
        online.innerHTML = numeroDeUsuarios
        
    })
    


    //Manejo de envio
    form.addEventListener("submit", (e) => {
        //Evito que el formulario me recargue la pagina
        e.preventDefault();
        
        const data = {
            user: username,
            message: e.target.message.value
        }
        // Envio de datos al servidor
        socket.send(data);
        // Se resetea el mensaje y se hace focus para que siga escribiendo
        form.message.value = "";
        
        // form.user.value = e.target.user.value;
        li.scrollIntoView({behavior:"smooth",block:"end"})
    })

    




})