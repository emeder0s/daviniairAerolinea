//Guarda la reserva actual en el localStorage
function realizaReserva(vuelo) {  
    var reserva = new Reserva(vuelo);
    localStorage.setItem('reservaActual', JSON.stringify(reserva));
}

//Autocompleta los datos del usuario que está ya logueado
function autocompletar(usuario){
    document.querySelector("div#pasajero0 input.nombre-reserva").value = usuario.nom;
    document.querySelector("div#pasajero0 input.apellidos-reserva").value = usuario.ape;
    document.querySelector("div#pasajero0 input.email-reserva").value = usuario.email;
    document.querySelector("div#pasajero0 input.dni-reserva").value = usuario.dni;
}

//Inicia sesion y autocompleta los datos del usuario logueado
function iniciarSesionYAutoCommpleta(){
    iniciarSesion("reserva");
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    autocompletar(usuario);
    actualizarNav();
}

//Comprueba si existe sesión y si existe autocompleta los datos
function autoCompletarSiSesion(){
    var sesion = sesionFromLocalStorage();
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
            autocompletar(usuario); 
            document.getElementById("resgistro-reserva").style.display="none"; 
    }
}

autoCompletarSiSesion();

