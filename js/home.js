function encogerBusqueda() {
    var destino = document.getElementsByTagName('select')[0].value;
    var numPasajeros = document.getElementsByTagName('input')[1].value;
    var fecha = document.getElementsByTagName('input')[2].value;
    var divs = document.getElementsByClassName('busqueda');
    divs[0].style.display = 'none';
    if (divs.length == 1) {
        var div = document.createElement('div');
        div.setAttribute('class', 'busqueda2');

        var divOrigenDestino = document.createElement('div');
        var parrafoOrigenDestino = document.createElement('p');
        parrafoOrigenDestino.setAttribute("class","origen-destino");
        parrafoOrigenDestino.innerHTML = `Madrid → ${destino}`;
        divOrigenDestino.append(parrafoOrigenDestino);
        
        var divFecha = document.createElement('div');
        var parrafoFecha = document.createElement('p');
        parrafoFecha.innerHTML = `Fecha : ${fecha}`;
        divFecha.appendChild(parrafoFecha);
        
        var divPasajeros = document.createElement('div');
        var parrafoPasajeros = document.createElement('p');
        parrafoPasajeros.innerHTML = `Número de pasajeros : ${numPasajeros}`;
        divPasajeros.appendChild(parrafoPasajeros);

        var editarBusqueda = document.createElement('button');
        editarBusqueda.setAttribute("class","btn btn-primary btn-sm button-nueva-busqueda");
        editarBusqueda.appendChild(document.createTextNode('EDITAR BÚSQUEDA'));
        editarBusqueda.setAttribute('onclick', 'editarBusqueda()');
        var divEditarBusqueda = document.createElement('div');
        divEditarBusqueda.appendChild(editarBusqueda);

        document.getElementsByClassName('contenedor')[0].appendChild(div);

        div.appendChild(divOrigenDestino);
        div.appendChild(divFecha);
        div.appendChild(divPasajeros);
        div.appendChild(editarBusqueda);
    } else {
        divs[1].style.display = 'flex';
        divs[1].getElementsByTagName('p')[0].innerHTML = `Madrid → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`;
    }

}


function editarBusqueda() {
    document.getElementsByClassName('busqueda')[0].style.display = 'flex';
    document.getElementsByClassName('busqueda2')[0].remove();
    var vuelos = document.getElementById('vuelos');
    vuelos.parentNode.removeChild(vuelos);
}

function buscarCompras(compras,usuario){
    return compras.filter(compra => { return compra.usuario == usuario });
 }

//No permitimos que se puedan seleccionar vuelos pasados a la fecha actual
if(document.getElementById("fecha")){
    document.getElementById("fecha").min = new Date().toISOString().split("T")[0];
}

generarNumVuelo()
