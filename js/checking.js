function getAsientos(asientos,vuelo){
   var asientoArray = ["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B","6A","6B","7A","7B","8A","8B","9A","9B","10A","10B","11A","11B","12A","12B","13A","13B","14A","14B","15A","15B"];
   vuelo.avion.forEach( (asientoLibre,index) => {
    if (asientoLibre == "true"){
        var option = document.createElement("option");
        option.innerHTML=asientoArray[index];
        asientos.appendChild(option);
    }
   })
   return asientos;
}

function pintarPasajeros(pasajeros, vuelo){
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
        var option = document.createElement("option");
        option.disabled = true;
        option.selected = true;
        option.innerHTML="Selecciona un asiento"
        asientos.appendChild(option)
        asientos = getAsientos(asientos,vuelo);

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
    return diff <= 48 && flightDate > currentDate;
}

function getEmailSiSesion(){
    var sesion = sesionFromLocalStorage();
    var email = " ";
    if (sesion){
        var usuario = usuarioFromSesion(sesion);
        email = usuario.email;
    }

    return email;
}

function rellenarDatos(compra){
    if (comprobarCheckin(compra.vuelo)){
        var divContainer = document.createElement("div");
        divContainer.setAttribute("class","checkin-datos");
        title = document.createElement("h3");
        title.setAttribute("class","checkin-title");
        title.innerHTML = "Check in";

        var subtitle = document.createElement("p");
        subtitle.innerHTML = "Revisa los datos de los pasajeros y selecciona asiento";
        var vuelo = document.createElement("h5");
        vuelo.innerHTML = `${compra.vuelo.origen} - ${compra.vuelo.destino}, ${compra.vuelo.fecha} ${compra.vuelo.hora}h`;

        var subtitle2 = document.createElement("h5");
        subtitle2.innerHTML = "Datos de Contacto";
        var parrafo = document.createElement("p");
        parrafo.innerHTML = "Email al que se enviaran las tajerta de embarque";

        var inputEmail = document.createElement("input");
        inputEmail.setAttribute("class","form-control form-control-sm");
        inputEmail.setAttribute('id', 'inputEmail');
        inputEmail.value= getEmailSiSesion();
        var mensajeEmail = document.createElement("small");
        mensajeEmail.setAttribute("class","form-text text-muted");
        mensajeEmail.setAttribute("id","emailHelp");
        mensajeEmail.setAttribute("style","display:none");
        mensajeEmail.innerHTML="El email no puede estar vacio"

        var alert1 = document.createElement("div");
        alert1.setAttribute("class","alert alert-warning");
        alert1.setAttribute("id","alert-asientos-no-seleccionados");
        alert1.setAttribute("role","alert");
        alert1.setAttribute("style","display:none");
        alert1.innerHTML = "Todos los pasajeros tienen que seleccionar asiento";

        var alert2 = document.createElement("div");
        alert2.setAttribute("class","alert alert-warning");
        alert2.setAttribute("id","alert-asientos-repetidos");
        alert2.setAttribute("role","alert");
        alert2.setAttribute("style","display:none");
        alert2.innerHTML = "Dos pasajeros no pueden ocupar el mismo asiento";

        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-primary");
        button.innerHTML="Tarjetas de Embarque";
        button.setAttribute("onclick","imprimirTarjetaEmbarque()");

        divContainer.appendChild(title);
        divContainer.appendChild(vuelo);
        divContainer.appendChild(subtitle);

        var divPasajeros = document.createElement("div");
        divPasajeros.setAttribute("id","pasajeros-container");
        var pasajeros = pintarPasajeros(compra.pasajeros,compra.vuelo);
        pasajeros.forEach(pasajero=> divPasajeros.appendChild(pasajero));  
        divContainer.appendChild(divPasajeros); 
        divContainer.appendChild(subtitle2); 
        divContainer.appendChild(parrafo); 
        divContainer.appendChild(inputEmail);
        divContainer.appendChild(mensajeEmail);
        divContainer.appendChild(alert1);
        divContainer.appendChild(alert2);
        divContainer.appendChild(button);
        document.getElementsByClassName("contenedor")[0].appendChild(divContainer);
    }
    else{
        var alert = document.createElement("div");
        alert.setAttribute("class","alert alert-warning");
        alert.setAttribute("role","alert");
        alert.setAttribute("style","margin-top:4%")
        alert.innerHTML = `${compra.vuelo.origen} -> ${compra.vuelo.destino}, ${compra.vuelo.fecha} ${compra.vuelo.hora}h - Check in NO está disponible`
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
    var localizador = document.getElementById("localizador").value;
    var email = document.getElementById("email-localizador").value;
    var compras = JSON.parse(localStorage.getItem("compras"));
    var compra = compras.filter(compra => compra.numReserva== localizador && compra.usuario == email);
    document.getElementById("acceso-checkin").style.display="none";
    localStorage.setItem("vueloChecking",JSON.stringify(compra[0]));
    rellenarDatos(compra[0]);
}

function asientosSeleccionados(){
    var asientosSelec = document.querySelectorAll("select.form-control");
    var validation = true;
    asientosSelec.forEach(asiento => {
        if(asiento.value=="Selecciona un asiento"){
            validation = false;
        }
    });

    return validation;
}

function asientosRepetidos(){
    var asientosSelec = document.querySelectorAll("select.form-control");
    var validation = false;
    var options = [];
    asientosSelec.forEach(asiento => {
        if(options.includes(asiento.value)){
            validation = true;
        }else{
            options.push(asiento.value)
        }
    });

    return validation;
}

function  exiteEmail(){
    return document.getElementById("inputEmail").value;
}

function modificarVuelos(vuelo){
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    vuelos[parseInt(vuelo.id)-1].avion = vuelo.avion;
    localStorage.setItem("vuelos",JSON.stringify(vuelos));
}

function modificarCompras(compra){
    console.log(compra)

}

//Pone a false los asientos que haya seleccionado el usuario al hacer el checkin
function ocuparAsientos(asientos){
    var asientoArray = ["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B","6A","6B","7A","7B","8A","8B","9A","9B","10A","10B","11A","11B","12A","12B","13A","13B","14A","14B","15A","15B"];
    var compra = JSON.parse(localStorage.getItem("vueloChecking"));
    var avion = compra.vuelo.avion
    asientos.forEach(asiento =>{
        var posicion = asientoArray.findIndex(element=> element == asiento.value);
        avion[posicion] = false;
    });
    compra.vuelo.avion = avion;
    localStorage.setItem("vueloChecking",JSON.stringify(compra));
    modificarVuelos(compra.vuelo);
    modificarCompras(compra);
}

function imprimirTarjetaEmbarque(){
    document.getElementById("alert-asientos-repetidos").style.display="none";
    document.getElementById("alert-asientos-no-seleccionados").style.display="none";
    
    if (asientosSeleccionados()){
        if(!asientosRepetidos()){
            if(exiteEmail()){
                localStorage.setItem("emailCheckin",exiteEmail())
                var asientos = document.querySelectorAll("select.form-control");
                ocuparAsientos(asientos);
                //window.location ="tarjetas.html"
            }else{
                document.getElementById("emailHelp").style.display="";
            }
            
        }else{
            document.getElementById("alert-asientos-repetidos").style.display="";
        }
        
    }else{
        document.getElementById("alert-asientos-no-seleccionados").style.display="";
    }
}