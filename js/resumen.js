
/*metodoPago : {nombre: "1234567", numeroTarjeta: "1234567", fechaExpedicion: "1234567", cvv: "123456"}
pasajeros: [{nombre: "María Soledad", apellidos: "de la Verde Pérez", dni: "qwertyu"},…]
vuelo: {id: 41, origen: "Madrid", destino: "Edimburgo", fecha: "2022-10-26", hora: "9:00",…}*/

(function escribeResumen() {
    var reserva = JSON.parse(localStorage.getItem('reservaActual'));
    resumenNumReserva();
    resumenPasajeros(reserva.pasajeros);
    resumenVuelo(reserva.vuelo);
    precioTotal(reserva.pasajeros.length, reserva.vuelo.precio);
})();

function resumenNumReserva(){
    var compra = JSON.parse(localStorage.getItem("compraActual"));
    var text = document.createTextNode(`Código de reserva: ${compra.numReserva}`);
    var p = document.createElement("p");
    p.setAttribute("id","numReservaParrafo");
    p.appendChild(text);
    document.getElementById("num-reserva").appendChild(p);
}

function resumenPasajeros(pasajeros) {
    var div = document.getElementsByClassName('resumenpasajeros')[0];
    for(let i = 0; i < pasajeros.length; i++) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(`PASAJERO ${i+1}`));
        p.setAttribute("class","pasajero-title");
        var p2 = document.createElement('p');
        p2.appendChild(document.createTextNode(`Nombre: ${pasajeros[i].nombre} ${pasajeros[i].apellidos} - DNI: ${pasajeros[i].dni}`));
        div.appendChild(p);
        div.appendChild(p2);
    }
}

function resumenVuelo(vuelo) {
    var divSalida = document.createElement("div");
    var divLlegada = document.createElement("div");
    divSalida.setAttribute("id","div-salida");
    divLlegada.setAttribute("id","div-salida");
    var divResumenVuelo = document.getElementsByClassName("resumenvuelo")[0];
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")
    var p3 = document.createElement("p")
    var p4 = document.createElement("p")
    p1.appendChild(document.createTextNode((` ${vuelo.origen}`)));
    p1.setAttribute("class","destino-origen");
    p2.appendChild(document.createTextNode((`${vuelo.destino}`)));
    p2.setAttribute("class","destino-origen");
    p3.appendChild(document.createTextNode((`${vuelo.fecha} - ${vuelo.hora}h`)));
    p4.appendChild(document.createTextNode((`${vuelo.fecha} - ${vuelo.horallegada}h`)));
    
    divSalida.innerHTML="<p class='titulo-div'>Salida</p>";
    divSalida.appendChild(p1);
    divSalida.appendChild(p3);

    divLlegada.innerHTML="<p class='titulo-div'>Llegada</p>";
    divLlegada.appendChild(p2);
    divLlegada.appendChild(p4);

    divResumenVuelo.appendChild(divSalida)
    divResumenVuelo.appendChild(divLlegada)
}

function precioTotal(numPasajeros, precioBillete) {
    var precioTotal = numPasajeros * precioBillete;
    var div = document.getElementsByClassName('resumenprecio')[0];
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(precioTotal + '€'));
    div.appendChild(p);
}