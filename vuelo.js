//creamos con el constructor una nueva clase vuelo con los siguientes datos:
class Vuelo {
    constructor(id, origen, destino, fecha, hora, horallegada, asientosLibres, precio) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.hora = hora;
        this.horallegada = horallegada;
        this.asientosLibres = asientosLibres;
        this.precio = precio;
    }
}

//hacemos un array con 180 vuelos en total (6 vuelos diarios por 30 días)
var arrayVuelo = [];
var idActual = 0;

function inicia() {
    const vuelosEnMemoria = localStorage.getItem("vuelos");
    if (vuelosEnMemoria) {
        arrayVuelo = JSON.parse(vuelosEnMemoria);
    } else {
        generaVuelos30dias();
        localStorage.setItem("vuelos", JSON.stringify(arrayVuelo));
    }
}

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

function buscarVuelos() {
    var fechaBusqueda = document.getElementById("fecha").value //Ya tenemos recogida la fecha.
    var destinoBusqueda = document.getElementsByTagName('select')[0].value//el destino que marca el usuario.
    var pasajerosBusqueda = parseInt(document.getElementById("pasajeros").value)//numero de asisentos elegidos por el usuario.
    var datosVuelos = JSON.parse(localStorage.getItem("vuelos"))// creamos en una nueva variable los datos en un array que tenenmos metidos en localstorage.
    var vuelosEncontrados = datosVuelos.filter(vuelo => vuelo.destino == destinoBusqueda && vuelo.fecha == fechaBusqueda && pasajerosBusqueda <= vuelo.asientosLibres) //Hasta aquí tenemos la coincidencia de la búsqueda con la base de datos.

    if (vuelosEncontrados.length == 0) {
        alert("No hay billetes")
    } else {
        pintarVuelos(vuelosEncontrados);
    }
}

function pintarVuelos(vuelosEncontrados) {
    var fechaBusqueda = document.getElementById("fecha").value
    var destinoBusqueda = document.getElementsByTagName('select')[0].value
    var divVuelos = document.createElement("div");
    divVuelos.setAttribute('id', 'vuelos');
    document.getElementsByClassName('contenedor')[0].appendChild(divVuelos);

    vuelosEncontrados.forEach(vuelo => {
        //pinta los vuelos en un div concreto

        var div1 = document.createElement("div");
        var p = document.createElement("p")

        p.appendChild(document.createTextNode(`Mad → ${destinoBusqueda} | ${vuelo.hora} -  ${vuelo.horallegada} | ${vuelo.precio}€`))
        divVuelos.appendChild(div1)
        div1.appendChild(p)
        div1.setAttribute("id", "cajaVuelo")
        div1.setAttribute("class", "cajareserva")
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '500';
        p.style.color = '#2E2E5C';


        var botonCompraVuelo = document.createElement("button");
        div1.appendChild(botonCompraVuelo)
        botonCompraVuelo.innerHTML = "Comprar"

        botonCompraVuelo.onclick = function () {
            var asientosQueQuiereElUsuario = parseInt(document.getElementById("pasajeros").value);
            var idVuelo = vuelo.id;
            //recoger el objeto del localstorage
            var localStorageVuelos = JSON.parse(localStorage.getItem("vuelos"));
            //recorrer el localStorage
            localStorage.setItem('vueloSeleccionado', JSON.stringify(vuelo));
            localStorage.setItem('numPasajerosReservaActual', asientosQueQuiereElUsuario);
            realizaReserva(vuelo);
            var sesion = JSON.parse(localStorage.getItem("sesion"));
            if (sesion) {
                localStorageVuelos.forEach(localVuelo => {
                    if (idVuelo == localVuelo.id) {
                        //restar asientos
                        localVuelo.asientosLibres -= asientosQueQuiereElUsuario;
                        //Volvemos a actualizar base de datos con los plazas restantes
                        localStorage.setItem("vuelos", JSON.stringify(localStorageVuelos))
                        console.log(localVuelo)
                    }
                });
                window.location = 'reserva.html';
            } else {
                alert('Tienes que iniciar sesion');
            }
        }
    })
}

function generaId() {
    idActual += 1;
    return idActual;
}

inicia();