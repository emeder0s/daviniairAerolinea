//Crea dinámicamente el formulario de inicio de sesión en la barra de navegación
function navMenu(nav,sesion){
    //logo
    var enlaceHome = document.createElement('a');
    enlaceHome.setAttribute('href', 'home.html');
    nav.appendChild(enlaceHome);
    var logo = document.createElement('img');
    logo.setAttribute('src', './img/logo.png');
    enlaceHome.appendChild(logo);
    logo.style.width = '275px';

    // collapsable div
    var collapsableDiv = document.createElement("div");
    collapsableDiv.setAttribute("class","collapse navbar-collapse");
    collapsableDiv.setAttribute("id","navbarSupportedContent");

    //la lista de enlaces
    var elementsRight = document.createElement("ul");
    elementsRight.setAttribute("class","navbar-nav");
    elementsRight.setAttribute("style","display: flex;flex-direction: row;align-items: center; margin: 10px;")

    
    
    //Iniciar sesion/Registro - modal button
    var iniSesionButtonLi = document.createElement("li");
    iniSesionButtonLi.setAttribute("class","nav-item");
    //iniSesionButtonLi.setAttribute("style","display:inline;");
    
    if (!sesion){
        var iniSesionButton = document.createElement("button");
        iniSesionButton.setAttribute("type","button");
        iniSesionButton.setAttribute("id","iniSesionNavButton");
        iniSesionButton.setAttribute("class","btn btn-primary");
        iniSesionButton.setAttribute("data-toggle","modal");
        iniSesionButton.setAttribute("data-target","#iniSesionModal");
        iniSesionButton.innerHTML="Iniciar Sesión";
        iniSesionButtonLi.appendChild(iniSesionButton);

        //Registro 
        var enlaceRegistroLi = document.createElement("li");
        enlaceRegistroLi.setAttribute("class","nav-item");
        enlaceRegistroLi.setAttribute("style","margin-right:15px")
        var enlaceRegistro = document.createElement('a');
        enlaceRegistro.setAttribute('href', '');
        enlaceRegistro.setAttribute("data-toggle","modal");
        enlaceRegistro.setAttribute("data-target","#registroModal");
        enlaceRegistro.innerHTML="Regístrate";
        enlaceRegistroLi.appendChild(enlaceRegistro);
    }else{        
        var enlaceRegistroLi = null;
        iniSesionButtonLi.setAttribute("class","nav-item dropdown");
        var dropdownMenuDiv = document.createElement("div");
        dropdownMenuDiv.setAttribute("class","dropdown-menu");
        dropdownMenuDiv.setAttribute("style","position: absolute;")
        dropdownMenuDiv.setAttribute("aria-labelledby","dropdownMenuLink");
        dropdownMenuDiv.innerHTML='<a class="dropdown-item" href="perfil.html">Mi cuenta</a><a class="dropdown-item" href="" onclick="cerrarSesion();">Cerrar Sesion</a>';
        var enlaceUser = document.createElement('a');
        enlaceUser.setAttribute('href', '#');
        enlaceUser.setAttribute('class', 'dropdown-toggle');
        enlaceUser.setAttribute('id', 'dropdownMenuLink');
        enlaceUser.setAttribute('data-toggle', 'dropdown');
        enlaceUser.setAttribute('aria-haspopup', 'true');
        enlaceUser.setAttribute('aria-expanded', 'false');
        enlaceUser.innerHTML = `<span>Hola, ${usuarioFromSesion(sesion).nom} ${usuarioFromSesion(sesion).ape}</span>`;

        var icono_user = document.createElement('img');
        // var usuario = usuarioFromSesion(sesion);
        icono_user.setAttribute('src', './img/user-solid.svg');
        icono_user.style.marginRight = "5px";
        icono_user.style.height = "15px";
        enlaceUser.insertBefore(icono_user, enlaceUser.firstChild);

        var dropdownDiv = document.createElement("div");
        dropdownDiv.setAttribute("class","dropdown");
        dropdownDiv.appendChild(enlaceUser);
        dropdownDiv.appendChild(dropdownMenuDiv)
        iniSesionButtonLi.appendChild(dropdownDiv);
    }

    //checkIn
    var checkInLi = document.createElement("li");
    checkInLi.setAttribute("class","nav-item");
    checkInLi.setAttribute("style","margin-right:20px")
    var checkIn = document.createElement('a');
    checkIn.setAttribute('href', 'checking.html');
    checkIn.innerHTML="Check In";
    checkInLi.appendChild(checkIn);

    elementsRight.appendChild(checkInLi);
    if (enlaceRegistroLi){
        elementsRight.appendChild(enlaceRegistroLi);
    }
    elementsRight.appendChild(iniSesionButtonLi);
    collapsableDiv.appendChild(elementsRight);
    nav.appendChild(elementsRight);
}

//Actualiza los campos del nav una vez se ha iniciado sesión o el usuario se ha registrado (después de registrarse tb se inicia sesión)
function actualizarNav(){
    var nav = document.getElementById("navigation-nav");
    nav.innerHTML = "";
    navMenu(nav,JSON.parse(localStorage.getItem("sesion")));
}

//Comprueba si el usuario existe y si la contraseña es correcta, si es así inicia sesión.
//Iniciar sesión consiste en guardar un objeto de la clase sesion en el localStorage con 
//el estado = open y usuario = al usuario que se haya logueado
function iniciarSesion(from){
    document.querySelectorAll(".alert-warning").forEach(elem=>elem.style.display="none");
    if (from == "reserva"){
        var email = document.getElementById("email-input").value;
        var password = document.getElementById("password-input").value;
    }else{
        var email = document.getElementById("email-sesion-input").value;
        var password = document.getElementById("password-sesion-input").value;
    }

    var usuarios = usuariosFromLocalStorage();
    var usuarioJSON = usuarios.existeUsuario(email);

    if (usuarioJSON){
        var usuario = new Usuario();
        usuario = usuario.fromJsonToUsuario(usuarioJSON);
        if (usuario.comprobarPassword(password)){
           var sesion = new Sesion("open", usuario);
           sesion.guardarSesion();
           if (from == "reserva"){
            document.getElementById("resgistro-reserva").style.display="none";
           }else{
            actualizarNav();
            document.getElementById("close-ini-sesion").click();
           }   
        }else{
            document.getElementById("wrong-login-alert").style.display="";
            
        }
    }else{
        document.getElementById("no-exist-account-alert").style.display="";
    }
}

//Registra al usuario si no existe. Previamente hace las validaciones necesarias para ver que todos los datos cumplen las reglas establecidas
//El email: debe cumplir con el formato email: xxxx@xxx.xxx
//El nombre y el apelido: solo permite letras
//La contraseña: Debe tener una longitud por lo menos de 8 caracteres y 
//contener al menos una mayúscula, una minúscula, un número y un caracter especial (&,%,$...)
function registrarse(){
    if (validacionesRegistro()){
        var usuario = new Usuario(document.getElementById("r-nombre-input").value,document.getElementById("r-apellidos-input").value,"","",document.getElementById("r-email-input").value,"","",document.getElementById("r-password-input").value,0); 
        var usuarios = usuariosFromLocalStorage();
    
        if(usuarios.existeUsuario(document.getElementById("r-email-input").value)== null){
            usuarios.aniadirUsuario(usuario);
            usuarios.guardarUsuarios();
            var sesion = new Sesion("open", usuario);
            sesion.guardarSesion();
            actualizarNav();
            document.getElementById("close-registro").click();
        }else{
            mostrarMensaje("Ya hay una cuenta destina a este email");
        } 
    }
}

function cerrarSesion(){
    localStorage.removeItem("sesion");
}

window.onload = () => {
    var nav = document.getElementsByTagName('nav')[0];
    nav.setAttribute("class", "navbar navbar-light bg-light");
    nav.setAttribute("id", "navigation-nav")
    navMenu(nav,JSON.parse(localStorage.getItem("sesion")));
}

