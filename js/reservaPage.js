(function divsPasajeros() {
    var numPasajeros = JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    for (let i = 0; i < numPasajeros; i++) {
        creaDiv(i);
    }
    pintaPrecioTotal();
})();

function creaDiv(i) {
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    document.getElementsByClassName('pasajeros')[0].appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.style.display = 'grid';
    div1.style.gridTemplateColumns = '180px 400px';
    div1.style.gridTemplateRows = '230px';
    div2.style.backgroundColor = 'white';
    div3.style.backgroundColor = 'white';
    div3.style.boxShadow = '1px 1px 6px';
    div2.style.boxShadow = '1px 1px 6px';
    div2.style.padding = '15%';
    div3.style.padding = '6%';
    div1.style.margin = '0.6%';

    var pas = document.createElement('p');
    pas.appendChild(document.createTextNode(`PASAJERO ${i + 1}:`));
    pas.style.fontFamily = 'system-ui';
    pas.style.fontWeight = '500';
    pas.style.color = '#2e2e5c';
    div2.appendChild(pas);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Los datos de los pasajeros deben coincidir con la documentación que presenten en el momento del vuelo.'));
    p.style.color = 'grey'
    div2.appendChild(p);

    div3.style.display = 'flex';
    div3.style.flexDirection = 'column';
    div3.style.justifyContent = 'space-evenly';
    div3.style.alignItems = 'stretch';
    div3.setAttribute('id', `pasajero${i}`);

    var nombre = document.createElement('input');
    nombre.setAttribute('placeholder', 'Nombre');
    nombre.setAttribute('required', 'required');
    div3.appendChild(nombre);

    var apellidos = document.createElement('input');
    apellidos.setAttribute('required', 'required');
    apellidos.setAttribute('placeholder', 'Apellidos');
    div3.appendChild(apellidos);

    var dni = document.createElement('input');
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
    div3.setAttribute('class', 'pasajero');
}


function pintaPrecioTotal() {
    var vuelo = JSON.parse(localStorage.getItem('vueloSeleccionado'));
    var precioTotal = vuelo.precio * JSON.parse(localStorage.getItem('numPasajerosReservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
}

function continuarApago() {
    let datosPasajeros = document.getElementsByClassName('pasajero');
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
        alert('todos los campos son obligatorios');
    }
}

function atras() {
    window.location = 'home.html';
}
