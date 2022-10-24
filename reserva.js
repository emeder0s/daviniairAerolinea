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

