function realizaReserva(vuelo) {
    
    var reserva = new Reserva(vuelo);
    localStorage.setItem('reservaActual', JSON.stringify(reserva));
}
function autocompletar(usuario){
    document.querySelector("div#pasajero0 input.nombre-reserva").value = usuario.nom;
    document.querySelector("div#pasajero0 input.apellidos-reserva").value = usuario.ape;
    document.querySelector("div#pasajero0 input.email-reserva").value = usuario.email;
    document.querySelector("div#pasajero0 input.dni-reserva").value = usuario.dni;
}

function iniciarSesionYAutoCommpleta(){
    iniciarSesion("reserva");
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    autocompletar(usuario);
    actualizarNav();
}

function autoCompletarSiSesion(){
    var sesion = sesionFromLocalStorage();
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
        autocompletar(usuario); 
        document.getElementById("resgistro-reserva").style.display="none";    
    }
}

autoCompletarSiSesion();

