document.addEventListener('DOMContentLoaded', () =>{
    const socket = io(); //websocket
    const form = document.getElementById('entrada');
    const list = document.querySelector(".messages");

    //Recepcion de datos
    //Al recibir mensaje del servidor desestructura los datos en usuario y mensaje
    socket.on("message", ({user,message}) => {
        // Crea un List Item
        const li = document.createElement('li');
        // Inserta dentro del Li el usuario y el mensaje recibido
        li.innerHTML = `<p><Strong>${user}> </Strong>${message}</p>`
        list.appendChild(li);
    })


    //Manejo de envio
    form.addEventListener("submit", (e) => {
        //Evito que el formulario me recargue la pagina
        e.preventDefault();

        const data = {
            user: e.target.user.value,
            message: e.target.message.value
        }
        // Envio de datos al servidor
        socket.send(data);
        // Se resetea el mensaje y se hace focus para que siga escribiendo
        form.message.value = "";
        form.message.focus()
        form.user.value(e.target.user.value);
    })






})