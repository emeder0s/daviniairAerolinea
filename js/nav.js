function dropdownMenu(nav){
    //div dropdown
    var dropDownDiv = document.createElement("div");
    dropDownDiv.setAttribute("class", "dropdown")
    dropDownDiv.setAttribute("style","width: 200px;")
    //button
    var dropDownButton = document.createElement("button");
    dropDownButton.setAttribute("class","btn btn-secondary dropdown-toggle nav-button")
    dropDownButton.setAttribute("type", "button");
    dropDownButton.setAttribute("id", "iniciarSesion");
    dropDownButton.setAttribute("data-toggle", "dropdown");
    dropDownButton.setAttribute("aria-haspopup", "true");
    dropDownButton.setAttribute("aria-expanded", "false");
    dropDownButton.setAttribute("style","width: 126px;");
    dropDownButton.innerHTML="Iniciar Sesión";
    //div dropdown menu
    var dropDownMenu = document.createElement("div");
    dropDownMenu.setAttribute("class", "dropdown-menu");
    dropDownMenu.setAttribute("aria-labelledby", "dropdownMenuButton");
    // input email
    var inputEmail = document.createElement("input");
    inputEmail.setAttribute("id","email-input");
    inputEmail.setAttribute("style","width: 100%;");
    inputEmail.setAttribute("placeholder","Email");

    // input password
    var inputPassword = document.createElement("input");
    inputPassword.setAttribute("id","password-input");
    inputPassword.setAttribute("style","width: 100%;");
    inputPassword.setAttribute("placeholder","Password");

    //iniciar sesion button
    var iniSesionButton = document.createElement("button");
    iniSesionButton.setAttribute("class","btn btn-success nav-button")
    iniSesionButton.setAttribute("type", "button");
    iniSesionButton.setAttribute("onclick","iniciarSesion()");
    iniSesionButton.setAttribute("style","width: 126px;");
    iniSesionButton.innerHTML="Iniciar Sesión";
    //parrafo registro
    var texto = document.createTextNode("¿No estás registrado aún?");
    var parrafoReg = document.createElement("p");
    parrafoReg.appendChild(texto);

    //enlace registrate
    var enlace = document.createElement("a");
    enlace.setAttribute("href", "registro.html");
    enlace.innerHTML="Regístrate";

    dropDownMenu.appendChild(inputEmail);
    dropDownMenu.appendChild(inputPassword);
    dropDownMenu.appendChild(iniSesionButton);
    dropDownMenu.appendChild(parrafoReg);
    dropDownMenu.appendChild(enlace);

    dropDownDiv.appendChild(dropDownButton);
    dropDownDiv.appendChild(dropDownMenu);
    nav.appendChild(dropDownDiv);
}

window.onload = () => {
    var nav = document.getElementsByTagName('nav')[0];
    nav.style.width = '100%';
    nav.style.height = '60px';
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.55)';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'space-between';
    nav.style.alignItems = 'center';
    
    //logo
    var enlaceHome = document.createElement('a');
    enlaceHome.setAttribute('href', 'home.html');
    nav.appendChild(enlaceHome);
    var logo = document.createElement('img');
    logo.setAttribute('src', './img/logopng.png');
    enlaceHome.appendChild(logo);
    logo.style.width = '275px';

    //perfil
    var enlaceUser = document.createElement('a');
    enlaceUser.setAttribute('href', 'perfil.html');
    enlaceUser.style.color = 'black';
    nav.appendChild(enlaceUser);
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
    var sesion = JSON.parse(localStorage.getItem("sesion"));
    if(sesion){
        enlaceUser.appendChild(document.createTextNode(`Hola, ${sesion.usuario.nom}`));
        nav.appendChild(enlaceUser);
    }else{
        dropdownMenu(nav);
    }

}