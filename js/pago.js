//Genera el número de Reserva de forma aleatorio
function generarNumReserva(){
    var num = parseInt(Math.random()*100000000000)
    return "DVN"+ num.toString();

};

//A partir de los datos de la reserva y el usuario crea una compra y la devuelve
function getCompra(reserva,usuario){
    var totalPagado = reserva.vuelo.precio * reserva.pasajeros.length;
    var numReserva = generarNumReserva();
    var fechaReserva = new Date().toISOString().split("T")[0];
    reserva.vuelo.asientosLibres -= reserva.pasajeros.length;
    var compra = new Compra(numReserva, fechaReserva,usuario.email, reserva.pasajeros, reserva.vuelo, totalPagado);
    return compra;
}

//Añade la compra al arrays de compras y lo vuelve a guardar en el localStorage
function aniadirCompra(compra){
    var compras = JSON.parse(localStorage.getItem("compras"));
    compras.push(compra)
    localStorage.setItem("compras", JSON.stringify(compras));
}

//Añade la compra al usuario, asi como suma los puntos de la misma
function aniadirCompraAUsuario(reserva){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var compra = getCompra(reserva,usuario);
    aniadirCompra(compra);
    usuario.historialCompra.push(compra.numReserva);
    usuario.points += 100;
    usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario))
    usuarios.modificarHistorialCompra(usuario, usuarios.buscarUsuario(usuario));
    usuarios.guardarUsuarios();
    sesion.usuario = usuario;
    sesion.guardarSesion();
}

//Resta el número de pasajeros de la compra a los asientos libres del avión
function restarAsientosVuelos(reserva){
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    vuelos[reserva.vuelo.id-1].asientosLibres -= reserva.pasajeros.length;
    localStorage.setItem("vuelos",JSON.stringify(vuelos));
}

//Realiza el pago (es decir, añade la compra al usuario y resta los asientos al vuelo) si cumple las validaciones
function confirmarPago() {
    var nombre = document.getElementById('cardholder').value;
    var numTarjeta = document.getElementById('cardnumber').value;
    var fechaEx = document.getElementById('date').value;
    var cvv = document.getElementById('cvv').value;

    if (nombre && numTarjeta  && fechaEx  && cvv) {
        var reserva = new Reserva();
        var reservaJson = JSON.parse(localStorage.getItem('reservaActual'));
        reserva = Object.assign(reserva, reservaJson);
        reserva.setMetodoPago({
            'nombre': nombre,
            'numeroTarjeta': numTarjeta,
            'fechaExpedicion': fechaEx,
            'cvv': cvv
        });
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        aniadirCompraAUsuario(reserva);
        restarAsientosVuelos(reserva);
        window.location = 'resumen.html';
    } else {
        alert('Todos los campos son obligatorios');
    }
}

//Pinta el precio total del pago
(function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
})();
