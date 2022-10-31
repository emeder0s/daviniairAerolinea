function generarNumReserva(){
    var num = parseInt(Math.random()*100000000000)
    return "DVN"+ num.toString();

};

function getCompra(reserva,usuario){
    var totalPagado = reserva.vuelo.precio * reserva.pasajeros.length;
    var numReserva = generarNumReserva();
    var fechaReserva = new Date().toISOString().split("T")[0];
    var compra = new Compra(numReserva, fechaReserva,usuario.email, reserva.pasajeros, reserva.vuelo, totalPagado);
    return compra;
}

function añadirCompra(compra){
    var compras = JSON.parse(localStorage.getItem("compras"));
    compras.push(compra)
    localStorage.setItem("compras", JSON.stringify(compras));
}

function añadirCompraAUsuario(reserva){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var compra = getCompra(reserva,usuario);
    añadirCompra(compra);
    usuario.historialCompra.push(compra.numReserva);
    usuario.points += 100;
    usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario))
    usuarios.modificarHistorialCompra(usuario, usuarios.buscarUsuario(usuario));
    usuarios.guardarUsuarios();
    sesion.usuario = usuario;
    sesion.guardarSesion();
}

function restarAsientosVuelos(pasajeros){

}

function confirmarPago() {
    var nombre = document.getElementById('cardholder').value;
    var numTarjeta = document.getElementById('cardnumber').value;
    var fechaEx = document.getElementById('date').value;
    var cvv = document.getElementById('cvv').value;
    //Y que lleve a una pagina donde se muestran los datos de la compra
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
        añadirCompraAUsuario(reserva);
        //restarAsientosVuelos(reserva.pasajeros);
        window.location = 'resumen.html';
    } else {
        alert('Todos los campos son obligatorios');
    }
}

(function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
})();
