
/*metodoPago : {nombre: "1234567", numeroTarjeta: "1234567", fechaExpedicion: "1234567", cvv: "123456"}
pasajeros: [{nombre: "María Soledad", apellidos: "de la Verde Pérez", dni: "qwertyu"},…]
vuelo: {id: 41, origen: "Madrid", destino: "Edimburgo", fecha: "2022-10-26", hora: "9:00",…}*/

(function escribeResumen() {
    var reserva = JSON.parse(localStorage.getItem('reservaActual'));
    resumenPasajeros(reserva.pasajeros);
    resumenVuelo(reserva.vuelo);
    precioTotal(reserva.pasajeros.length, reserva.vuelo.precio);
})();

function resumenPasajeros(pasajeros) {
    var div = document.getElementsByClassName('resumenpasajeros')[0];
    for(let i = 0; i < pasajeros.length; i++) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(`PASAJERO: ${i+1}`));
        var p2 = document.createElement('p');
        p2.appendChild(document.createTextNode(`Nombre: ${pasajeros[i].nombre} ${pasajeros[i].apellidos} DNI: ${pasajeros[i].dni}`));
        div.appendChild(p);
        div.appendChild(p2);
    }
}

function resumenVuelo(vuelo) {
    var divResumenVuelo = document.getElementsByClassName("resumenvuelo")[0];
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")
    var p3 = document.createElement("p")
    var p4 = document.createElement("p")
    p1.appendChild(document.createTextNode((`Origen: ${vuelo.origen}`)));
    p2.appendChild(document.createTextNode((`Destino: ${vuelo.destino}`)));
    p3.appendChild(document.createTextNode((`Fecha: ${vuelo.fecha}`)));
    p4.appendChild(document.createTextNode((`Hora: ${vuelo.hora}`)));
    divResumenVuelo.appendChild(p1)
    divResumenVuelo.appendChild(p2)
    divResumenVuelo.appendChild(p3)
    divResumenVuelo.appendChild(p4)
}

function precioTotal(numPasajeros, precioBillete) {
    var precioTotal = numPasajeros * precioBillete;
    var div = document.getElementsByClassName('resumenprecio')[0];
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(precioTotal + '€'));
    div.appendChild(p);
}