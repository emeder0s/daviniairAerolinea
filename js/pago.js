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
    localStorage.setItem("compraActual",JSON.stringify(compra))
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
    if (validacionNombreoApellidos(nombre,"nombre") && validacionTarjeta(numTarjeta)  && validacionFechaExp(fechaEx)  && validacionCVV(cvv)) {
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
        document.getElementById("wrong-data").style.display="";
    }
}

//Pinta el precio total del pago
(function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
})();

function buscarMetodos(metodos,usuario){
    return metodos.filter(metodo =>  metodo.usuario == usuario.email);
}

function sacarTarjeta(num){
    return "Tarjeta ************" + num.substring(11,15);
 }

function pintarMetodoPago(metodos){
    var div = document.getElementById("metodos");
    var text = document.createTextNode("Selecciona una tarjeta:");
    var p = document.createElement("p");
    p.appendChild(text);
    if (metodos.length!=0){
        div.appendChild(p);
        metodos.forEach((metodo,index) => {
            var tarjeta = document.createTextNode(sacarTarjeta(metodo.numTarjeta));
            var container = document.createElement("div");
            container.setAttribute("class","alert alert-primary metodo-pago");
            container.setAttribute("role","alert");
            container.setAttribute("onclick",`rellenarMetodo(${index})`);
            container.appendChild(tarjeta);
            div.appendChild(container);
        });
    }
    
}

//Pinta el precio total del pago
function metodos(){
    var sesion = sesionFromLocalStorage();
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
        var metodos = JSON.parse(localStorage.getItem("metodosPago"));
        metodos = buscarMetodos(metodos,usuario);
        pintarMetodoPago(metodos);
    }
};

function rellenarMetodo(index){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var metodos = JSON.parse(localStorage.getItem("metodosPago"));
    metodos = buscarMetodos(metodos,usuario);

    document.getElementById("cardholder").value = metodos[index].nombre
    document.getElementById("cardnumber").value = metodos[index].numTarjeta
    document.getElementById("date").value = metodos[index].fechaExp
    document.getElementById("cvv").value = metodos[index].cvv
}

metodos();