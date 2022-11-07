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
            for (let i = 0; i < numPasajeros; i++) {
                creaDiv(i);
            }
            pintaPrecioTotal();
    }
})();

//Comprueba si el usuario no ha comprado 10 billetes de ese vuelo
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

//Genera los divs para rellenar los datos de los pasajeros
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
    nombre.setAttribute('class', 'nombre-reserva form-control form-control-sm');
    nombre.setAttribute('placeholder', 'Nombre');
    nombre.setAttribute('required', 'required');
    div3.appendChild(nombre);

    var apellidos = document.createElement('input');
    apellidos.setAttribute('class', 'apellidos-reserva form-control form-control-sm');
    apellidos.setAttribute('required', 'required');
    apellidos.setAttribute('placeholder', 'Apellidos');
    div3.appendChild(apellidos);

    var email = document.createElement('input');
    email.setAttribute('class', 'email-reserva form-control form-control-sm');
    email.setAttribute('required', 'required');
    email.setAttribute('placeholder', 'Email');
    div3.appendChild(email);

    var dni = document.createElement('input');
    dni.setAttribute('class', 'dni-reserva form-control form-control-sm');
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

//Muestra el precio total 
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

//Si las validaciones son correctas nos redirige al pago
function continuarApago() {
    let datosPasajeros = document.getElementsByClassName('datos-pasajero');
    document.getElementById("mensaje-continuar").style.display="none";
    console.log(datosPasajeros)
    let pasajeros = [];
    i = 0;
    var todoOK = true;
    do {
        nombre = datosPasajeros[i].getElementsByTagName('input')[0].value;
        apellidos = datosPasajeros[i].getElementsByTagName('input')[1].value;
        email = datosPasajeros[i].getElementsByTagName('input')[2].value;
        dni = datosPasajeros[i].getElementsByTagName('input')[3].value;
        pasajeros.push({
            nombre: nombre,
            apellidos: apellidos,
            dni: dni
        });
        i++;
        todoOK = validacionNombreoApellidos(nombre,"nombre") && validacionNombreoApellidos(apellidos,"apellidos") && validacionEmail(email) && validacionDni(dni);
    }while( todoOK && i < datosPasajeros.length)
    if (todoOK) {
        let reserva = new Reserva();
        reserva = Object.assign(reserva, JSON.parse(localStorage.getItem('reservaActual')));
        reserva.setPasajeros(pasajeros);
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        window.location = 'pago.html';
    } else {
        document.getElementById("mensaje-continuar").style.display="";
    }
}

