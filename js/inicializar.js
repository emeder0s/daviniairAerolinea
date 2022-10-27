// ---------------INICIALIZACION DE LOS VUELOS---------------------------
//Generamos 30 fechas disponibles.
function genera30fechas() {
    var hoy = new Date(Date.now());
    var fin = hoy * 1 + 30 * 24 * 3600 * 1000;
    var unDia = 24 * 3600 * 1000;
    var fecha;
    var fechas = [];
    for (let ms = hoy * 1; ms < fin * 1; ms += unDia) {
        fecha = new Date(ms)
        fechas.push(`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`);
    }
    return fechas;

}

//Genera un id para el vuelo
function generaId() {
    idActual += 1;
    return idActual;
}

/*3 vuelos diarios a paris*/
function generaVuelosParis(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '8:00', '10:00', 30, 70));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '13:00', '15:10', 30, 95));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '19:00', '21:05', 30, 120));
}

/*2 vuelos diarios a Edimburgo*/
function generaVuelosEdimburgo(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '9:00', '14:30', 30, 90));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '14:00', '19:15', 30, 120));
}

/*1 vuelo diarios a Ciudad de Mexico*/
function generaVuelosMexico(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Ciudad de Mexico', fecha, '13:00', '6:20', 30, 350));
}

function generaVuelos30dias() {
    var fechas = genera30fechas();
    for (let i = 0; i < fechas.length; i++) {
        generaVuelosParis(fechas[i]);
        generaVuelosMexico(fechas[i]);
        generaVuelosEdimburgo(fechas[i]);

    }
}

//hacemos un array con 180 vuelos en total (6 vuelos diarios por 30 días)
var arrayVuelo = [];
var idActual = 0;

function iniciaVuelos() {
        generaVuelos30dias();
        localStorage.setItem("vuelos", JSON.stringify(arrayVuelo));
}

// ---------------INICIALIZACION DE LOS USUARIOS---------------------------
function iniciaUsuarios(){
    var usuarios = new Usuarios();
    var user = new Usuario("elena","mederos","54058798N","18-02-1991","elena@gmail.com","+34","686246095", "password",7000,[]);
    var user2 = new Usuario("ana","mederos","54058799J","18-02-1991","ana@gmail.com","+34","686246095", "password",200,[]);
    usuarios.añadirUsuario(user2);
    usuarios.añadirUsuario(user);
    // Quería usar el usuarios.guardarUSuarios(), pero si lo usaba no me debaja iniciar sesión.. por qué? No lo he descubierto
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

//funcion que inicializa los usuarios y los vuelos
function inicializar(){
    if (!localStorage.getItem("vuelos")){
        iniciaVuelos();
    }
    
    if (usuariosFromLocalStorage().usuarios.length == 0){
        iniciaUsuarios();
    }
}

inicializar()
