class Reserva {
    constructor(vuelo) {
        this.vuelo = vuelo; //objeto de tipo Vuelo
        this.pasajeros; //Array de JSONs con los datos de los pasajeros
        this.metodoPago; //JSON con los datos de pago
    }

    setPasajeros(pasajeros) {
        this.pasajeros = pasajeros;
    }

    setMetodoPago(metodoPago) {
        this.metodoPago = metodoPago;
    }
}

function realizaReserva(vuelo) {
    var reserva = new Reserva(vuelo);
    localStorage.setItem('reservaActual', JSON.stringify(reserva));
}
function autocompletar(usuario){
    console.log(document.querySelector("div#pasajero0 input.nombre-reserva"));
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
}

function autoCompletarSiSesion(){
    var sesion = sesionFromLocalStorage();
    console.log(sesion);
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
        autocompletar(usuario);
    }
}

autoCompletarSiSesion()

