// Clas Usuario
class Usuario {
    constructor(nom,ape,dni,fechaNac,email,exTtel,tel,pass,points){
        this.nom = nom;
        this.ape = ape;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.email = email;
        this.exTtel = exTtel;
        this.tel = tel;
        this.pass = pass;
        this.points = points;
    }
    
    //Comprueba si la contraseña del usuario es la contraseña guardada para el mismo
    comprobarPassword(password){
        return this.pass==password;  
    }

    //Se le pasa un objeto JSON con los atributos del Usuario y lo convierte (y devuelve) en un objeto de la clase Usuario
    fromJsonToUsuario(json){
         return Object.assign(this, json);
    }

    //Devuelve el valor del atributo que se le pida
    devolverAtributo(atributo){
        var valor = "";
        switch (atributo) {
            case "nombre":
                
                valor = this.nom;
                break;
            case "apellido":
                valor = this.ape;
                break;
            case "dni":
                valor = this.dni;
                break;
            case "fechaNac":
                valor = this.fechaNac;
                break;
            case "email":
                valor = this.email;
                break;
            case "extension":
                valor = this.exTtel;
                break;
            case "telefono":
                valor = this.tel;
                    break; 
            default:
                break;
        }

        return valor;
    }
    
    //Guarda el valor del atributo dado
    guardarAtributo(atributo,valor){
        switch (atributo) {
            case "nombre":
                this.nom = valor;
                break;
            case "apellido":
                this.ape = valor;
                break;
            case "dni":
                this.dni = valor;
                break;
            case "fechaNac":
                this.fechaNac = valor;
                break;
            case "email":
                this.email = valor;
                break;
            case "extension":
                this.exTtel = valor;
                break;
            case "telefono":
                this.tel = valor;
                break;    
            default:
                break;
        }
    }
}

//Clase Usuarios
class Usuarios{
    constructor(){
        this.usuarios = [];
    }
    
    //Comprueba si el usuario ya existe (se comprueba por el correo)
    existeUsuario(email) {
        var existe = false;
        var key = 0;
        var usuarios = this.usuarios;
        var usuario = null;
    
        while (!existe && key < usuarios.length) {
            if (usuarios[key].email == email) {
                existe = true;
                usuario = usuarios[key];
            }
            key++
        }
        return usuario
    }
    
    //Añade un usuario
    añadirUsuario(usuario){
        this.usuarios.push(usuario);
    }

    //Devuelva la posicion donde está el usuario
    buscarUsuario(usuario){
        var existe = false;
        var key = 0;
        var usuarios = this.usuarios;

        while (!existe && key < usuarios.length) {
            if (usuarios[key].email == usuario.email) {
                var position = key;
            }
            key++
        }
        return position
    }    
    
    //Modifica los datos personales del usuario
    modificarDatosPersonales(usuario, posicion){
        this.usuarios[posicion].nom = usuario.nom;
        this.usuarios[posicion].ape = usuario.ape;
        this.usuarios[posicion].dni = usuario.dni;
        this.usuarios[posicion].fechaNac = usuario.fechaNac;
        this.usuarios[posicion].email = usuario.email;
        this.usuarios[posicion].exTtel = usuario.exTtel;
        this.usuarios[posicion].tel = usuario.tel;
    }

    //Modifica el password de un usuario --> ESTA DEBERÍA IR EN LA CLASE USUARIO
    modificarPassword(usuario, posicion){
        this.usuarios[posicion].pass = usuario.pass;
    }

    //Guarda los usuarios en el localStorage
    guardarUsuarios(){
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
    }

    //Se le pasa un objeto JSON con los atributos de la clase y lo convierte en un objeto de la clase Usuarios
    fromJsonToUsuarios(json){
        return Object.assign(this, json);
   }
}

//Clase Sesion
class Sesion{
    constructor(estado, usuario){
        this.estado = estado;
        this.usuario = usuario;
    }
    
    //Cierra la sesión
    cerrarSesion(){
        this.estado = "close";
        this.usuario = null;
    }
    
    //Guarda la sesión en el localStorage
    guardarSesion(){
        localStorage.setItem("sesion",JSON.stringify(this))
    }
    //Se le pasa un objeto JSON con los atributos de la clase y lo convierte en un objeto de la clase Sesion
    fromJsontoSesion(json){
        return Object.assign(this, json);
   }
}

//Clase vuelo
class Vuelo {
    constructor(id, origen, destino, fecha, hora, horallegada, asientosLibres, precio) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.hora = hora;
        this.horallegada = horallegada;
        this.asientosLibres = asientosLibres;
        this.precio = precio;
    }
}

//Muestra un mensaje de error por el console.log
function mostrarMensaje(mensaje){
    console.log(mensaje);
}

//Devuelve la sesión guarda en el localStorage como objeto Sesion
function sesionFromLocalStorage(){
    var sesionJSON = JSON.parse(localStorage.getItem("sesion"));
    var sesion = new Sesion();
    sesion = sesion.fromJsontoSesion(sesionJSON);

    return sesion;
}

//Devuelve los usuarios guardos en el localStorage como objeto Usuarios
function usuariosFromLocalStorage(){
    var usuariosJSON = JSON.parse(localStorage.getItem("usuarios"));
    var usuarios = new Usuarios();
    usuarios = usuarios.fromJsonToUsuarios(usuariosJSON);

    return usuarios;
}

//Devuelve el usuario guardo en la sesion del localStorage como objeto Usuario
function usuarioFromSesion(sesion){
    var usuarioJSON = sesion.usuario;
    var usuario = new Usuario();
    usuario = usuario.fromJsonToUsuario(usuarioJSON);
    return usuario;
}
