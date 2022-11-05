(function divsPasajeros() {
    var sesion = sesionFromLocalStorage();
    var numPasajeros = JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
        if (comprobarSicompra(usuario)){
            for (let i = 0; i < numPasajeros; i++) {
                creaDiv(i);
            }
            pintaPrecioTotal();
        }else{
            document.getElementById("no-compra-alert").style.display="";
        }        
    } else{
            for (let i = 0; i <= numPasajeros; i++) {
                creaDiv(i);
            }
            pintaPrecioTotal();
    }
})();

function comprobarSicompra(usuario){
    var compras = JSON.parse(localStorage.getItem("compras"));
    var reservaActual = JSON.parse(localStorage.getItem("reservaActual"));
    var numVuelo = reservaActual.vuelo.numVuelo;
    var comprasUsuario = buscarCompras(compras,usuario.email); 
    var vuelos = comprasUsuario.filter(compra => compra.vuelo.numVuelo ==numVuelo);
    var totalPasajeros = parseInt(localStorage.getItem("numPasajerosReservaActual"));
    if (vuelos){
        vuelos.forEach(vuelo => {
            totalPasajeros += vuelo.pasajeros.length
        });
    } 
    return totalPasajeros <= 10;
}

function creaDiv(i) {
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    div1.setAttribute("class","pasajero");
    div2.setAttribute("class","titulo-pasajero");
    div3.setAttribute("class","datos-pasajero");
    document.getElementsByClassName('pasajeros')[0].appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);

    var pas = document.createElement('p');
    pas.appendChild(document.createTextNode(`PASAJERO ${i + 1}`));
    div2.appendChild(pas);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Los datos de los pasajeros deben coincidir con la documentación que presenten en el momento del vuelo.'));
    p.setAttribute("class", "mensaje");
    div2.appendChild(p);

    div3.setAttribute('id', `pasajero${i}`);

    var nombre = document.createElement('input');
    nombre.setAttribute('class', 'nombre-reserva');
    nombre.setAttribute('placeholder', 'Nombre');
    nombre.setAttribute('required', 'required');
    div3.appendChild(nombre);

    var apellidos = document.createElement('input');
    apellidos.setAttribute('class', 'apellidos-reserva');
    apellidos.setAttribute('required', 'required');
    apellidos.setAttribute('placeholder', 'Apellidos');
    div3.appendChild(apellidos);

    var email = document.createElement('input');
    email.setAttribute('class', 'email-reserva');
    email.setAttribute('required', 'required');
    email.setAttribute('placeholder', 'Email');
    div3.appendChild(email);

    var dni = document.createElement('input');
    dni.setAttribute('class', 'dni-reserva');
    dni.setAttribute('required', 'required');
    dni.setAttribute('placeholder', 'DNI');
    div3.appendChild(dni);

    var label = document.createElement('label');
    var necEspeciales = document.createElement('input');
    necEspeciales.setAttribute('required', 'required');
    necEspeciales.setAttribute('type', 'checkbox');
    label.appendChild(necEspeciales);
    label.appendChild(document.createTextNode('Pasajero con necesidades especiales'));
    div3.appendChild(label);
}


function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var pasajeros = `<div>${vuelo.origen}</div`;
    var resumenVuelo = document.createElement("p");
    var resumenFechaHora = document.createElement("p");
    var resumenPasajeros = document.createElement("p");
    var resumenPrecio = document.createElement("p");
    pasajeros.innerHTML=`${localStorage.getItem('numPasajerosReservaActual')} x Pasajero`;
    resumenVuelo.innerHTML = `<strong>${vuelo.origen}</strong> -> <strong>${vuelo.destino}</strong>`
    resumenFechaHora.innerHTML = `${vuelo.fecha} | ${vuelo.hora}h`
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(resumenVuelo);
    document.getElementById('precioTotal').appendChild(resumenFechaHora);
    document.getElementById('precioTotal').appendChild(resumenPasajeros);
    document.getElementById('precioTotal').appendChild(resumenPrecio);
    document.getElementById('precioTotal').appendChild(document.createTextNode('Precio total: ' + precioTotal + '€'));
}

function continuarApago() {
    let datosPasajeros = document.getElementsByClassName('datos-pasajero');
    let pasajeros = [];
    i = 0;
    var nombre = datosPasajeros[0].getElementsByTagName('input')[0].value;
    var apellidos = datosPasajeros[0].getElementsByTagName('input')[1].value;
    var dni = datosPasajeros[0].getElementsByTagName('input')[2].value;
    var nombre, apellidos, dni;
    do {
        nombre = datosPasajeros[i].getElementsByTagName('input')[0].value;
        apellidos = datosPasajeros[i].getElementsByTagName('input')[1].value;
        dni = datosPasajeros[i].getElementsByTagName('input')[2].value;
        pasajeros.push({
            nombre: nombre,
            apellidos: apellidos,
            dni: dni
        });
        i++;
    }while(nombre && apellidos && dni && i < datosPasajeros.length)

    if (nombre && apellidos && dni) {
        let reserva = new Reserva();
        reserva = Object.assign(reserva, JSON.parse(localStorage.getItem('reservaActual')));
        reserva.setPasajeros(pasajeros);
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        window.location = 'pago.html';
    } else {
        document.getElementById("mensaje-continuar").style.display="";
    }
}

