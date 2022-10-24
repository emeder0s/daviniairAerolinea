function confirmarPago() {
    var nombre = document.getElementById('cardholder').value;
    var numTarjeta = document.getElementById('cardnumber').value;
    var fechaEx = document.getElementById('date').value;
    var cvv = document.getElementById('cvv').value;
    //Y que lleve a una pagina donde se muestran los datos de la compra
    if (nombre != '' && numTarjeta != '' && fechaEx != '' && cvv != '') {
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
