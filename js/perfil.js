//Cierra la sesion, es decir estado= close y el usuario = null. Luego la guarda en el localStorage.
function cerrarSesion(){
    var sesion = sesionFromLocalStorage();
    sesion.cerrarSesion();
    sesion.guardarSesion();
}

function mostrarDatos(){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        document.querySelector(`#${input.id}`).value = usuario.devolverAtributo(input.id);
    })
}

function guardarDatosEnLocalStorage(usuarios,usuario,sesion,tipoDato){
        //actualiza el usuario de la sesion
        sesion.usuario = usuario;
        sesion.guardarSesion();
        //actualizar el array de usuarios --> puedo buscar el usuario y luego modificarlo con las funciones que ya tengo pensadas arriba
        console.log(usuarios.buscarUsuario(usuario));
        tipoDato == "personales" ? usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario)) : usuarios.modificarPassword(usuario, usuarios.buscarUsuario(usuario));
        
        usuarios.guardarUsuarios();
}

function guardarDatos(){
    var sesion = sesionFromLocalStorage();
    //CAMBIAR LA CLASE PARA QUE COJA EL SELECT TB!!!!!
    var datos = document.querySelectorAll(".info-personal-input");
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    datos.forEach( input => {
        if (input.value != "" && input.value !=usuario.devolverAtributo(input.id)){
            //guardar los cambios del usuarios atributo por atributo
            usuario.guardarAtributo(input.id, input.value);
        }
    });

    guardarDatosEnLocalStorage(usuarios,usuario,sesion,"personales");
}

function guardarContraseña(){
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var contraseñaNueva = document.querySelector("#nuevaPassword.pass-input").value;
    var contraseñaActual = document.querySelector("#password.pass-input").value;
    if (usuario.comprobarPassword(contraseñaActual)){
        if (usuario.comprobarPassword(contraseñaNueva)){
            var mensaje = "La contraseña nueva no puede ser igual a la anterior";
            mostrarMensaje(mensaje);
        }else{
            usuario.pass = contraseñaNueva;
            guardarDatosEnLocalStorage(usuarios,usuario,sesion,"password");
        }
    }else{
        mostrarMensaje("La contraseña actual no coincide");
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
          backgroundColor: ["#fff",'#2e2e5c'],
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
 

  window.onload = () => {mostrarDatos();}


