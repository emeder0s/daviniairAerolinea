var usuarios = usuariosFromLocalStorage();
console.log(usuarios);
var usuario = new Usuario();
console.log(usuario)
function registrarse(){
    var usuario = new Usuario(document.getElementById("nombre").value,document.getElementById("apellido").value,"","",document.getElementById("email").value,"","",document.getElementById("password").value,0);
    console
    var usuarios = usuariosFromLocalStorage();
    console.log(usuarios);
    if(usuarios.existeUsuario(email)== null){
        usuarios.añadirUsuario(usuario);
        usuarios.guardarUsuarios();
        var sesion = new Sesion("open", usuario);
        sesion.guardarSesion();
        window.location="home.html"
    }else{
        mostrarMensaje("Ya hay una cuenta destina a este email");
    }
}