//Crea dinámicamente el formulario de inicio de sesión en la barra de navegación
function navMenu(nav,sesion){
    //     //collapsable button
//     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
    
    // collapsable div
    var collapsableDiv = document.createElement("div");
    collapsableDiv.setAttribute("class","collapse navbar-collapse");
    collapsableDiv.setAttribute("id","navbarSupportedContent");

    //la lista de enlaces
    var elementsRight = document.createElement("ul");
    elementsRight.setAttribute("style","display:inline; margin: 10px;")
    //elementsRight.setAttribute("class","navbar-nav ml-auto");

    //Iniciar sesion/Registro - modal button
    if (!sesion){
        var iniSesionButtonLi = document.createElement("li");
        iniSesionButtonLi.setAttribute("style","display:inline")
        // iniSesionButtonLi.setAttribute("class","nav-item active")
        var iniSesionButton = document.createElement("button");
        iniSesionButton.setAttribute("type","button");
        iniSesionButton.setAttribute("class","btn btn-primary");
        iniSesionButton.setAttribute("data-toggle","modal");
        iniSesionButton.setAttribute("data-target","#iniSesionModal");
        iniSesionButton.innerHTML="Iniciar Sesión";
        iniSesionButtonLi.appendChild(iniSesionButton);
    }else{
        var iniSesionButtonLi = document.createElement("li");
        iniSesionButtonLi.setAttribute("class","nav-item active");
        var enlaceUser = document.createElement('a');
        enlaceUser.setAttribute('href', 'perfil.html');
        enlaceUser.style.color = 'black';
        var icono_user = document.createElement('img');
        icono_user.setAttribute('src', './img/user-solid.svg');
        icono_user.style.height = "36px";
        icono_user.style.marginRight = "5px";
        enlaceUser.appendChild(icono_user);
        enlaceUser.style.width = '146px'
        icono_user.style.border = '3px solid'
        icono_user.style.borderRadius = '100%'
        icono_user.style.paddingLeft = '2%';
        icono_user.style.paddingRight = '2%';
        enlaceUser.style.marginRight = '1%';
        iniSesionButtonLi.appendChild(enlaceUser);
    }

    //checkIn
    var checkInLi = document.createElement("li");
    // checkInLi.setAttribute("class","nav-item active");
    checkInLi.setAttribute("style","display:inline;margin-right:20px")
    var checkIn = document.createElement('a');
    checkIn.setAttribute('href', 'registro.html');
    checkIn.innerHTML="Check In";
    checkInLi.appendChild(checkIn);

    //Registro 
    var enlaceRegistroLi = document.createElement("li");
    // enlaceRegistroLi.setAttribute("class","nav-item active");
    enlaceRegistroLi.setAttribute("style","display:inline;margin-right:20px")
    var enlaceRegistro = document.createElement('a');
    enlaceRegistro.setAttribute('href', 'registro.html');
    enlaceRegistro.innerHTML="Regístrate";
    enlaceRegistroLi.appendChild(enlaceRegistro);

    elementsRight.appendChild(checkInLi);
    elementsRight.appendChild(enlaceRegistroLi);
    elementsRight.appendChild(iniSesionButtonLi);
    collapsableDiv.appendChild(elementsRight);
    nav.appendChild(elementsRight);
}

//Comprueba si el usuario existe y si la contraseña es correcta, si es así inicia sesión.
//Iniciar sesión consiste en guardar un objeto de la clase sesion en el localStorage con 
//el estado = open y usuario = al usuario que se haya logueado
function iniciarSesion(){
    // var email = document.getElementById("email-input").value;
    // var password = document.getElementById("password-input").value;
    var email = "elena@gmail.com";
    var password = "password";

    var usuarios = usuariosFromLocalStorage();

    var usuarioJSON = usuarios.existeUsuario(email);
    var usuario = new Usuario();
    usuario = usuario.fromJsonToUsuario(usuarioJSON);
    if (usuario){
        if (usuario.comprobarPassword(password)){
           var sesion = new Sesion("open", usuario);
           sesion.guardarSesion();
           window.location.href="perfil.html";
        //    mostrarDatos();
        }else{
            var mensaje = "Login incorrecto";
            mostrarMensaje(mensaje);
        }
    }else{
        var mensaje = "No existe cuenta creada con ese email";
        mostrarMensaje(mensaje);
    }
}

window.onload = () => {
    var nav = document.getElementsByTagName('nav')[0];
    nav.setAttribute("class", "navbar navbar-light bg-light")
    
    //logo
    var enlaceHome = document.createElement('a');
    enlaceHome.setAttribute('href', 'home.html');
    nav.appendChild(enlaceHome);
    var logo = document.createElement('img');
    logo.setAttribute('src', './img/logo.png');
    enlaceHome.appendChild(logo);
    logo.style.width = '275px';
    
    navMenu(nav,JSON.parse(localStorage.getItem("sesion")));

}