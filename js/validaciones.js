//EMAIL 

function validacionEmail(email){
    var expr="^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
    var  regExp    = new RegExp(expr); 
    var validation = regExp.test(email);
    if (!validation){
        document.getElementById("emailHelp").style.display="";
    }

    return validation;
}


//DNI
function cogeNumero(dni) {
    var num = ""
    for (let i = 0; i <= dni.length - 2; i++) {
        num = num + dni[i];

    }
    return num
}

function validacionDni(dni) {
    if (dni.length == 9){
        var validation = true;
        var letra = dni[dni.length - 1].toUpperCase()
        var numero = cogeNumero(dni);

        var resto = numero % 23;
        var letras = "TRWAGMYFPDXBNJZSQVHLCKET"
        var conjunto = letras.charAt(resto);

        if (numero > "99999999" || letra != conjunto) {
            validation = false;
           document.getElementById("dniHelp").style.display="";
        }
    }else{
        var validation = false;
    }

    return validation;
}

//TELEFONO
function esNumero(letra){
    return letra >= 48 && letra <= 57;
}

function validacionTelefono(telefono){
    var i = 0;
    var validation = true;
    while(i<telefono.length && validation){
        validation = esNumero(telefono.charCodeAt(i));
        i++;
    }
    if (!validation){
        document.getElementById("telefonoHelp").style.display="";
    }
    return validation
 }

// NOMBRE Y APELLIDO
function esLetra(letra){
    return letra >= 97 && letra <= 122;
}

function validacionNombreoApellidos(nombre,input){
    nombre = nombre.replace(" ", "");
    nombre = nombre.toLowerCase();
    var i = 0;
    var validation = true;
    if (nombre.length>0){
        while(i<nombre.length && validation){
            validation = esLetra(nombre.charCodeAt(i));
            i++;
        }
    }else {
        validation=false
    }

    if (!validation){
        switch (input){
            case "nombre":
                document.getElementById("nombreHelp").style.display="";
                break;
            case "apellidos":
                document.getElementById("apellidosHelp").style.display="";
                break;
        }
    }
    return validation;
}

//Valida si todos los datos personales son correctos
function validacionesDatosPersonales(){
    document.querySelectorAll(".text-muted").forEach(elem => {
        elem.style.display="none";
    })
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var dni = document.getElementById("dni").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    
    return validacionNombreoApellidos(nombre,"nombre") && validacionNombreoApellidos(apellidos,"apellidos") && validacionDni(dni) && validacionEmail(email) && validacionTelefono(telefono);
}

// CONTRASEÑA
function longitudPassword(password){
    return password.length >= 8;
}

function esMayuscula(letra)
{
    return letra >= 65 && letra <= 90;
}

function mayusculas(password){
    var i = 0;
    var validation = false;
    while(i<password.length && !validation){
        validation = esMayuscula(password.charCodeAt(i));
        i++;
    }

    return validation;
}

function esMinuscula(letra)
{
    return letra >= 97 && letra <= 122;
}

function minusculas(password){
    var i = 0;
    var validation = false;
    while(i<password.length && !validation){
        validation = esMinuscula(password.charCodeAt(i));
        i++;
    }

    return validation;
}

function esNumero(letra){
    return letra >= 48 && letra <= 57;
}

function numeros(password){
    var i = 0;
    var validation = false;
    while(i<password.length && !validation){
        validation = esNumero(password.charCodeAt(i));
        i++;
    }

    return validation;
}

function esCaracterEspecial(letra){
    return (letra >= 33 && letra <= 47) || (letra >= 58 && letra <= 64);
}

function caracteresEspeciales(password){
    var i = 0;
    var validation = false;
    while(i<password.length && !validation){
        validation = esCaracterEspecial(password.charCodeAt(i));
        i++;
    }

    return validation;

}

function validacionPassword(password){
    validation = longitudPassword(password) && mayusculas(password) && minusculas(password) && caracteresEspeciales(password);
    if (!validation){
        if (document.getElementById("passwordHelp")){
            document.getElementById("passwordHelp").style.display="";
        }
    }
    return validation
}

function validacionRepetirPassword(password,repetirPassword){
    validation = password == repetirPassword;
    if (!validation){
        document.getElementById("repetirPassworddHelp").style.display="";
    }
    return validation;
}

function validacionesRegistro(){
    document.querySelectorAll(".text-muted").forEach(elem => {
        elem.style.display="none";
    })
    var nombre = document.getElementById("r-nombre-input").value;
    var apellidos = document.getElementById("r-apellidos-input").value;
    var email = document.getElementById("r-email-input").value;
    var password = document.getElementById("r-password-input").value;
    var repetirPassword = document.getElementById("r-repetirPassword-input").value;

    var validacion1 = validacionNombreoApellidos(nombre,"nombre");
    var validacion2 = validacionNombreoApellidos(apellidos,"apellidos");
    var validacion3 = validacionEmail(email);  
    var validacion4 = validacionPassword(password);
    var validacion5 = validacionRepetirPassword(password,repetirPassword);

    return validacion1 &&  validacion2 && validacion3 && validacion4 && validacion5;

}