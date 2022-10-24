function encogerBusqueda() {
    var destino = document.getElementsByTagName('select')[0].value;
    var numPasajeros = document.getElementsByTagName('input')[1].value;
    var fecha = document.getElementsByTagName('input')[2].value;
    var divs = document.getElementsByClassName('busqueda');
    divs[0].style.display = 'none';
    if (divs.length == 1) {
        var div = document.createElement('div');
        div.setAttribute('class', 'busqueda busqueda2');
        var p = document.createElement('p');

        p.appendChild(document.createTextNode(`MAD → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`));
        div.appendChild(p);
        document.getElementsByClassName('contenedor')[0].appendChild(div);
        div.style.width = '90%';
        p.style.fontSize = 'xx-large';
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '500';
        p.style.color = '#2e2e5c';
        div.style.marginTop = '1%';
        div.style.height = '48px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-around';

        var editarBusqueda = document.createElement('button');
        editarBusqueda.appendChild(document.createTextNode('EDITAR BÚSQUEDA'));

        div.appendChild(editarBusqueda);
        editarBusqueda.style.fontFamily = 'system-ui';
        editarBusqueda.style.fontSize = 'large'
        editarBusqueda.style.color = 'white';
        editarBusqueda.style.fontWeight = '500';
        editarBusqueda.style.backgroundColor = '#2e2e5c';
        editarBusqueda.style.border = '0.5px solid white';
        editarBusqueda.style.padding = '10px';
        div.setAttribute('onclick', 'editarBusqueda()');
    } else {
        divs[1].style.display = 'flex';
        divs[1].getElementsByTagName('p')[0].innerHTML = `MAD → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`;
    }

}

function editarBusqueda() {
    document.getElementsByClassName('busqueda')[0].style.display = 'flex';
    document.getElementsByClassName('busqueda')[1].style.display = 'none';
    var vuelos = document.getElementById('vuelos');
    vuelos.parentNode.removeChild(vuelos);
}
