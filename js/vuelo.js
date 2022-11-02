function buscarVuelos() {
    var fechaBusqueda = document.getElementById("fecha").value //Ya tenemos recogida la fecha.
    var destinoBusqueda = document.getElementsByTagName('select')[0].value//el destino que marca el usuario.
    var pasajerosBusqueda = parseInt(document.getElementById("pasajeros").value)//numero de asisentos elegidos por el usuario.
    var datosVuelos = JSON.parse(localStorage.getItem("vuelos"))// creamos en una nueva variable los datos en un array que tenenmos metidos en localstorage.
    var vuelosEncontrados = datosVuelos.filter(vuelo => vuelo.destino == destinoBusqueda && vuelo.fecha == fechaBusqueda && pasajerosBusqueda <= vuelo.asientosLibres) //Hasta aquí tenemos la coincidencia de la búsqueda con la base de datos.

    if (vuelosEncontrados.length == 0) {
        //alert("No hay billetes")
    } else {
        pintarVuelos(vuelosEncontrados);
    }
}

function pintarVuelos(vuelosEncontrados) {
    var fechaBusqueda = document.getElementById("fecha").value;
    var destinoBusqueda = document.getElementsByTagName('select')[0].value;
    var cabecera = document.createElement("h3")
    var cabeceraText=document.createTextNode("Selecciona tu vuelo");
    cabecera.appendChild(cabeceraText);
    var divVuelos = document.createElement("div");
    divVuelos.setAttribute('id', 'vuelos');
    divVuelos.appendChild(cabecera);
    document.getElementsByClassName('contenedor')[0].appendChild(divVuelos);

    vuelosEncontrados.forEach(vuelo => {
        //pinta los vuelos en un div concreto
        var div1 = document.createElement("div");
        var p = document.createElement("p")

        var divOrigen = document.createElement("div");
        var ciudadOrigen = document.createElement("p")
        ciudadOrigen.setAttribute("class","origen-destino-large");
        ciudadOrigen.innerHTML = "Madrid"
        var horaSalida =document.createElement("p")
        horaSalida.setAttribute("class","horas-vuelos");
        horaSalida.innerHTML = `Salida: ${vuelo.hora}h`;
        divOrigen.appendChild(ciudadOrigen);
        divOrigen.appendChild(horaSalida);

        var divDestino = document.createElement("div");
        var ciudadDestino = document.createElement("p")
        ciudadDestino.setAttribute("class","origen-destino-large");
        ciudadDestino.innerHTML = destinoBusqueda;
        var horaLlegada =document.createElement("p")
        horaLlegada.setAttribute("class","horas-vuelos");
        horaLlegada.innerHTML = `Llegada: ${vuelo.horallegada}h`;
        divDestino.appendChild(ciudadDestino);
        divDestino.appendChild(horaLlegada);

        var divPrecio = document.createElement("div");
        divPrecio.setAttribute("class","precio-compra");
        var parrafoPrecio = document.createElement("p");
        parrafoPrecio.innerHTML = vuelo.precio+"€";
        divPrecio.appendChild(parrafoPrecio);

        var divFlecha = document.createElement('div');
        divFlecha.setAttribute("class","flecha");
        var parrafoFechaFlecha = document.createElement('p');
        var flecha = document.createTextNode("--------------------------");
        parrafoFechaFlecha.appendChild(flecha);
        divFlecha.appendChild(parrafoFechaFlecha);

        div1.appendChild(divOrigen);
        div1.appendChild(divFlecha);
        div1.appendChild(divDestino);
        div1.appendChild(divPrecio);

        div1.appendChild(p);
        div1.setAttribute("id", "cajaVuelo");
        div1.setAttribute("class", "cajareserva");
  
        divVuelos.appendChild(div1);

        divPrecio.onclick = function () {
            var asientosQueQuiereElUsuario = parseInt(document.getElementById("pasajeros").value);
            var idVuelo = vuelo.id;
            //recoger el objeto del localstorage
            var localStorageVuelos = JSON.parse(localStorage.getItem("vuelos"));
            //recorrer el localStorage
            localStorage.setItem('vueloSeleccionado', JSON.stringify(vuelo));
            localStorage.setItem('numPasajerosReservaActual', asientosQueQuiereElUsuario);
            realizaReserva(vuelo);
            window.location = 'reserva.html';
            //ESTO DESDE MI PUNTO DE VISTA SE TENDRÍA QUE HACER UNA VEZ SE HAYA COMPRADO EL BILLETE
            // var sesion = JSON.parse(localStorage.getItem("sesion"));
            // if (sesion) {
            //     localStorageVuelos.forEach(localVuelo => {
            //         if (idVuelo == localVuelo.id) {
            //             //restar asientos
            //             localVuelo.asientosLibres -= asientosQueQuiereElUsuario;
            //             //Volvemos a actualizar base de datos con los plazas restantes
            //             localStorage.setItem("vuelos", JSON.stringify(localStorageVuelos))
            //         }
            //     });
               
            // } else {
            //     alert('Tienes que iniciar sesion');
            // }
        }
    })
}

//Hace las validaciones del 
function validaPasajeros(numPasajeros){
    return numPasajeros < 10
}

//Devuelve true si todas la validaciones de los input del formulario de búsqueda de vuelos son correctas
function validacionesOK(){
    var destino = document.getElementById("destino").value;
    var validacionDestino = destino == "Edimburgo" || destino == "París" || destino == "Ciudad de Mexico";
    var validacionOrigen = document.getElementById("origen").value == "Madrid";
    var validacionPasajeros = validaPasajeros(parseInt(document.getElementById("pasajeros").value));

    return validacionDestino && validacionOrigen && validacionPasajeros
}

//Como la fecha es el único campo que está vacio al cargar la página, comprueba que le fecha no esté vacía para seguir con el resto de comprobaciones
function checkFormVuelos(){
    if (document.getElementById("fecha").value){
        if(validacionesOK()){
            encogerBusqueda(); 
            buscarVuelos();
        }else{
            var mensaje = "No vayas de hacker"
            console.log(mensaje);
        }

    }else{
        document.getElementById("fechaHelp").style.display="";
    }
    
}