// ---------------INICIALIZACION DE LOS VUELOS---------------------------
//Generamos 30 fechas disponibles.
function genera30fechas() {
    var hoy = new Date(Date.now());
    var fin = hoy * 1 + 30 * 24 * 3600 * 1000;
    var unDia = 24 * 3600 * 1000;
    var fecha;
    var fechas = [];
    for (let ms = hoy * 1; ms < fin * 1; ms += unDia) {
        fecha = new Date(ms)
        fechas.push(`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`);
    }
    return fechas;

}

/*3 vuelos diarios a paris*/
function generaVuelosParis(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '8:00', '10:00', 30, 70));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '13:00', '15:10', 30, 95));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '19:00', '21:05', 30, 120));
}

/*2 vuelos diarios a Edimburgo*/
function generaVuelosEdimburgo(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '9:00', '14:30', 30, 90));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '14:00', '19:15', 30, 120));
}

/*1 vuelo diarios a Ciudad de Mexico*/
function generaVuelosMexico(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Ciudad de Mexico', fecha, '13:00', '6:20', 30, 350));
}

function generaVuelos30dias() {
    var fechas = genera30fechas();
    for (let i = 0; i < fechas.length; i++) {
        generaVuelosParis(fechas[i]);
        generaVuelosMexico(fechas[i]);
        generaVuelosEdimburgo(fechas[i]);

    }
}

//hacemos un array con 180 vuelos en total (6 vuelos diarios por 30 días)
var arrayVuelo = [];
var idActual = 0;

function iniciaVuelos() {
    const vuelosEnMemoria = localStorage.getItem("vuelos");
    if (vuelosEnMemoria) {
        arrayVuelo = JSON.parse(vuelosEnMemoria);
    } else {
        generaVuelos30dias();
        localStorage.setItem("vuelos", JSON.stringify(arrayVuelo));
    }
}

// ---------------INICIALIZACION DE LOS USUARIOS Y SESION---------------------------


function inicializar(){
    iniciaVuelos();

}

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
