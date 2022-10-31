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
          label: 'My First dataset',
          backgroundColor: ["#fff",'#00629c'],
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

function buscarCompras(compras,usuario){
   return compras.filter(compra => { return compra.usuario == usuario.email });
}

function mostrarHistorialCompra(){
    var compras = JSON.parse(localStorage.getItem("compras"));
    var comprasUsuario = buscarCompras(compras,usuario.email); 
    comprasUsuario.forEach(element => {
        let numeroReserva = element.numReserva;
        let fechReserva = element.fechaReserva;
        let pasajes = element.pasajeros;
        console.log(element.vuelo);
        let infoVuelos = [];
        for (let i = 0; i < pasajes.length; i++) {
            if (infoVuelos.length == 0) {
                infoVuelos.push(pasajes[i].vuelo);
                infoVuelos.push(pasajes[i].pasajero);
            } else {
                infoVuelos.push(pasajes[i].pasajero);
            }
            console.log(infoVuelos.length);
        }
        let pagado = element.totalPagado;
        let printReserva = `No. reserva: ${numeroReserva}`;
        let printFechaReserva = `Comprado el ${fechReserva}`;
        let printPagado = `Total compra: ${pagado} €`;
        let printVuelo = `Número de vuelo: ${infoVuelos[0]}`
        let container = document.createElement('div');
        container.setAttribute('class', 'container card');
        var documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(container);
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row')
        let col1 = document.createElement('div');
        col1.setAttribute('class', 'col');
        let contenidoCol1 = document.createTextNode(printReserva);
        col1.appendChild(contenidoCol1);
        let col2 = document.createElement('div');
        col2.setAttribute('class', 'col right');
        let contenidoCol2 = document.createTextNode(printFechaReserva);
        col2.appendChild(contenidoCol2);
        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row');
        let col3 = document.createElement('p');
        col3.setAttribute('class', 'col');
        let contenidoCol3 = document.createTextNode(printVuelo);
        col3.appendChild(contenidoCol3);
        for (let i = 1; i < infoVuelos.length; i++) {
            console.log(infoVuelos[i])
            let contenidoCol3b = document.createTextNode(infoVuelos[i]);
            let parrafo = document.createElement('p');
            parrafo.appendChild(contenidoCol3b);
            col3.appendChild(parrafo);
        }
        let row3 = document.createElement('div');
        row3.setAttribute('class', 'row');
        let col4 = document.createElement('div');
        col4.setAttribute('class', 'col right');
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


mostrarDatos();
pintarGrafica();
mostrarHistorialCompra();
document.querySelectorAll(".text-muted").forEach(input => {
    input.style.display="none";
})


