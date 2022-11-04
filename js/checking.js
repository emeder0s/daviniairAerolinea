function pintarPasajeros(pasajeros){
    var arrayP = [];
    pasajeros.forEach((pasajero,index) => {
        var contenedorPasajeros = document.createElement("div");
    
        var title = document.createElement("h6");
        title.innerHTML= `Pasajero ${index+1}`;

        var labelNombre = document.createElement("label");
        labelNombre.innerHTML="Nombre";
        var nombre = document.createElement("input");
        nombre.setAttribute("class","form-control form-control-sm");
        nombre.value= `${pasajero.nombre}`;

        var labelApellidos= document.createElement("label");
        labelApellidos.innerHTML="Apellidos";
        var apellidos =  document.createElement("input");
        apellidos.setAttribute("class","form-control form-control-sm");
        apellidos.value= ` ${pasajero.apellidos}`;

        var labelDNI = document.createElement("label");
        labelDNI.innerHTML="DNI";
        var dni =  document.createElement("input");
        dni.setAttribute("class","form-control form-control-sm");
        dni.value= `${pasajero.dni}`;

        var labelAsientos = document.createElement("label");
        labelAsientos.innerHTML="Selecciona asiento";
        var asientos =  document.createElement("select");
        asientos.setAttribute("class","form-control form-control-sm");
        // getAsientos()

        contenedorPasajeros.appendChild(title);
        contenedorPasajeros.appendChild(labelNombre);
        contenedorPasajeros.appendChild(nombre);
        contenedorPasajeros.appendChild(labelApellidos);
        contenedorPasajeros.appendChild(apellidos);
        contenedorPasajeros.appendChild(labelDNI);
        contenedorPasajeros.appendChild(dni);
        contenedorPasajeros.appendChild(labelAsientos);
        contenedorPasajeros.appendChild(asientos);
        arrayP.push(contenedorPasajeros);
    });
    return arrayP;
}

function comprobarCheckin(vuelo){
    var fechaString = `${vuelo.fecha}T${vuelo.hora}:00`;
    var flightDate = new Date(fechaString).getTime();
    var currentDate = new Date().getTime();
    var diff = Math.abs(flightDate-currentDate) / 1000 / 60 / 60;
    // return diff <= 48 && flightDate < currentDate;
    return true;
}

function rellenarDatos(compra){
    if (comprobarCheckin(compra.vuelo)){
        var divContainer = document.createElement("div");
        divContainer.setAttribute("class","checkin-datos");
        title = document.createElement("h3");
        title.setAttribute("class","checkin-title");
        title.innerHTML = "Check in";
        subtitle = document.createElement("p");
        subtitle.innerHTML = "Revisa los datos de los pasajeros y selecciona asiento"

        divContainer.appendChild(title);
        divContainer.appendChild(subtitle);

        pasajeros = pintarPasajeros(compra.pasajeros);
        pasajeros.forEach(pasajero=> divContainer.appendChild(pasajero))

        document.getElementsByClassName("contenedor")[0].appendChild(divContainer);
    }
    else{
        var alert = document.createElement("div");
        alert.setAttribute("class","alert alert-warning");
        alert.setAttribute("role","alert");
        alert.setAttribute("style","margin-top:4%")
        alert.innerHTML = `${compra.vuelo.origen} -> ${compra.vuelo.destino}, ${compra.vuelo.fecha} ${compra.vuelo.hora}h - Check in todavia NO está disponible`
        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-primary" );
        button.setAttribute("onclick","window.location='checking.html'" );
        button.innerHTML="Volver";
        document.getElementsByClassName("contenedor")[0].appendChild(alert);
        document.getElementsByClassName("contenedor")[0].appendChild(button);
    }
}

function checkin(){
    // var localizador = document.getElementById("localizador").value;
    var localizador ="DVN92285246612";
    // var email = document.getElementById("email").value;
    var email = "elena@gmail.com"
    var compras = JSON.parse(localStorage.getItem("compras"));
    var compra = compras.filter(compra => compra.numReserva== localizador && compra.usuario == email);
    document.getElementById("acceso-checkin").style.display="none";
    rellenarDatos(compra[0]);

}