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