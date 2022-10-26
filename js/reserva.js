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

function iniciarSesionYAutoCommpleta(){
    iniciarSesion("reserva");
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    document.querySelector("div#pasajero0 input.nombre").value = usuario.nom;
    document.querySelector("div#pasajero0 input.apellidos").value = usuario.ape;
    document.querySelector("div#pasajero0 input.email").value = usuario.email;
    document.querySelector("div#pasajero0 input.dni").value = usuario.dni;
}


