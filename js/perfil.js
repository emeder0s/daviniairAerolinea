var sesion = sesionFromLocalStorage();
var usuario = usuarioFromSesion(sesion);

//Cierra la sesion, es decir estado= close y el usuario = null. Luego la guarda en el localStorage.
function cerrarSesion(){
    var sesion = sesionFromLocalStorage();
    sesion.cerrarSesion();
    sesion.guardarSesion();
}

function mostrarDatos(){
    // var sesion = sesionFromLocalStorage();
    // var usuario = usuarioFromSesion(sesion);
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        if (input.id == "fechaNac"){
            var date = usuario.devolverAtributo(input.id);
            document.querySelector(`#${input.id}`).value = date;
        }else{
            document.querySelector(`#${input.id}`).value = usuario.devolverAtributo(input.id);
        }
    })
}

function guardarDatosEnLocalStorage(usuarios,usuario,sesion,tipoDato){
        //actualiza el usuario de la sesion
        sesion.usuario = usuario;
        sesion.guardarSesion();
        //actualizar el array de usuarios --> puedo buscar el usuario y luego modificarlo con las funciones que ya tengo pensadas arriba
        tipoDato == "personales" ? usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario)) : usuarios.modificarPassword(usuario, usuarios.buscarUsuario(usuario));
        
        usuarios.guardarUsuarios();
}

function guardarDatos(){
    var sesion = sesionFromLocalStorage();
    var datos = document.querySelectorAll(".info-personal-input");
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    if (validacionesDatosPersonales()){
        datos.forEach( input => {
            if (input.value != "" && input.value !=usuario.devolverAtributo(input.id)){
                //guardar los cambios del usuarios atributo por atributo
                usuario.guardarAtributo(input.id, input.value);
            }
        });
        document.location.reload(true);
    }

    guardarDatosEnLocalStorage(usuarios,usuario,sesion,"personales");
}

function guardarContraseña(){
    document.querySelectorAll(".alert-warning").forEach(elem=>elem.style.display="none");
    document.getElementById("nuevaPasswordHelp").style.display="none";
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var contraseñaNueva = document.querySelector("#nuevaPassword.pass-input").value;
    var contraseñaActual = document.querySelector("#password.pass-input").value;
    if (usuario.comprobarPassword(contraseñaActual)){
        if (usuario.comprobarPassword(contraseñaNueva)){
            document.getElementById("same-password-alert").style.display="";
        }else{
            if(validacionPassword(contraseñaNueva)){
                usuario.pass = contraseñaNueva;
                guardarDatosEnLocalStorage(usuarios,usuario,sesion,"password");
                document.getElementById("modificada-password").style.display="";
            }else{
                document.getElementById("nuevaPasswordHelp").style.display="";
            }    
        }
    }else{
        document.getElementById("wrong-password-alert").style.display="";
    }
}

//habilita la escritura en los inputs
function habilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = false;
    });   
}

//deshabilita la escritura en los inputs
function deshabilitarEdicion(){
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = true;
    });   
}

//pinta la gráfica de los davinity points
function pintarGrafica () {
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var points = usuario.points;
    var noPoints = 10000 - usuario.points;
    
    const labels = [
        'Davinity points por conseguir','Davinity points'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          backgroundColor: ["#94a4ae",'#00629c',],
          data: [noPoints, points,],
        }]
      };
    
      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };

      var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    document.getElementById("mostrarPoints").innerHTML = `<p>Tienes ${points} Davinity points</p>`
}

document.getElementById("defaultOpen").click();
//Cambia el contenido que se muestra
function openContent(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
  }

function comprobarCheckin(vuelo){
    var fechaString = `${vuelo.fecha}T${vuelo.hora}:00`;
    var flightDate = new Date(fechaString).getTime();
    var currentDate = new Date().getTime();
    var diff = Math.abs(flightDate-currentDate) / 1000 / 60 / 60;
    return diff <= 48;
}

function mostrarHistorialCompra(){
    var compras = JSON.parse(localStorage.getItem("compras"));
    var comprasUsuario = buscarCompras(compras,usuario.email); 
    comprasUsuario.forEach(element => {
        let numeroReserva = element.numReserva;
        let fechReserva = element.fechaReserva;
        let infoVuelos = element.pasajeros;
        let pagado = element.totalPagado;
        let printReserva = `No. reserva: ${numeroReserva}`;
        let printFechaReserva = `Comprado el ${fechReserva}`;
        let printPagado = `Total compra: ${pagado} €`;
        let printVuelo = `${element.vuelo.numVuelo} | ORIGEN: ${element.vuelo.origen} | DESTINO:${element.vuelo.destino} | FECHA: ${element.vuelo.fecha} | HORA: ${element.vuelo.hora}h`;
        let container = document.createElement('div');
        container.setAttribute('class', 'container card');
        var documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(container);
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row')
        let col1 = document.createElement('div');
        col1.setAttribute('class', 'col num-reserva');
        let contenidoCol1 = document.createTextNode(printReserva);
        col1.appendChild(contenidoCol1);
        let col2 = document.createElement('div');
        col2.setAttribute('class', 'col right');
        let contenidoCol2 = document.createTextNode(printFechaReserva);
        col2.appendChild(contenidoCol2);
        if (comprobarCheckin(element.vuelo)){
            let checking = document.createTextNode("Check In disponible");
            let pChecking = document.createElement('p');
            pChecking.setAttribute("class","checkin");
            pChecking.appendChild(checking);
            col2.appendChild(pChecking);
        }
        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row');
        let col3 = document.createElement('p');
        col3.setAttribute('class', 'col vuelo');
        let contenidoCol3 = document.createTextNode(printVuelo);
        col3.appendChild(contenidoCol3);
        let titlePasajeros = document.createTextNode('Pasajeros:');
        let parrafo = document.createElement('p');
        parrafo.setAttribute("class","p-pasajeros")
        parrafo.appendChild(titlePasajeros);
        col3.appendChild(parrafo);
        let listaPasajeros = document.createElement("ul");
        col3.appendChild(listaPasajeros);
        for (let i = 0; i < infoVuelos.length; i++) {
            let contenidoCol3b = document.createTextNode(`${infoVuelos[i].nombre} ${infoVuelos[i].apellidos} - ${infoVuelos[i].dni}`);
            let pasajero = document.createElement('li');
            pasajero.appendChild(contenidoCol3b);
            listaPasajeros.appendChild(pasajero);
        }
       
        let row3 = document.createElement('div');
        row3.setAttribute('class', 'row');
        let col4 = document.createElement('div');
        col4.setAttribute('class', 'col right total-precio');
        let contenidoCol4 = document.createTextNode(printPagado);
        col4.appendChild(contenidoCol4);
        var documentFragment2 = document.createDocumentFragment();
        documentFragment2.appendChild(row1);
        row1.appendChild(col1);
        row1.appendChild(col2);
        row2.appendChild(col3);
        row3.appendChild(col4);
        container.appendChild(row1);
        container.appendChild(row2);
        container.appendChild(row3);
        document.getElementById("historial").appendChild(container);
    });
}

function aniadirMetodo(){
    document.getElementById("container-aniadirMetodo").style.display="";
    document.getElementById("button-aniadir").style.display="none";
}

function guardarMetodoPago(){
    var nombre = document.getElementById("m-nombre").value;
    var numTar =document.getElementById("m-numTar").value;
    var fechaExp = document.getElementById("m-fechaExp").value;
    var cvv = document.getElementById("m-cvv").value;

    var metodo = new MetodoPago(nombre,numTar,fechaExp,cvv,usuario.email);
    var metodos = JSON.parse(localStorage.getItem("metodosPago"));
    metodos.push(metodo);
    localStorage.setItem("metodosPago",JSON.stringify(metodos));

    document.getElementById("button-aniadir").style.display="";
    document.getElementById("container-aniadirMetodo").style.display="none";
    mostrarMetodosPago();
}

function buscarMetodos(metodos,usuario){
    return metodos.filter(metodo => { return metodo.usuario == usuario });
 }

 function sacarTarjeta(num){
    return "Tarjeta ************" + num.substring(11,15);
 }

function mostrarMetodosPago(){
    var metodos = JSON.parse(localStorage.getItem("metodosPago"));
    var metodosUsuario = buscarCompras(metodos,usuario.email);
    if (metodosUsuario){
        metodosUsuario.forEach(metodo => {
            var tarjeta = document.createTextNode(sacarTarjeta(metodo.numTarjeta));
            var container = document.createElement("div");
            // var spanBorrar = document.createElement("span");
            // spanBorrar.appendChild(document.createTextNode("Borrar"));
            // spanBorrar.setAttribute("style","text-align:right");
            container.setAttribute("class","alert alert-primary");
            container.setAttribute("role","alert");
            container.appendChild(tarjeta);
            document.getElementById("container-mostrar-metodo").appendChild(container);
        });
    } 
}

mostrarDatos();
pintarGrafica();
mostrarHistorialCompra();
mostrarMetodosPago();
document.querySelectorAll(".text-muted").forEach(input => {
    input.style.display="none";
})


