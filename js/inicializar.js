// ---------------INICIALIZACION DE LOS VUELOS---------------------------
//Generamos 30 fechas disponibles.
function genera30fechas() {
    var hoy = new Date(Date.now());
    var fin = hoy * 1 + 90 * 24 * 3600 * 1000;
    var unDia = 24 * 3600 * 1000;
    var fecha;
    var fechas = [];
    for (let ms = hoy * 1; ms < fin * 1; ms += unDia) {
        fecha = new Date(ms);
        var day = null;
        var month = fecha.getMonth() + 1;
        fecha.getDate()/10 < 1 ? day = 0+fecha.getDate().toString() : day = fecha.getDate();
        month/10 < 1 ? month = 0+month.toString() : month = month;
        console.log(`${fecha.getFullYear()}-${month}-${day}`);
        fechas.push(`${fecha.getFullYear()}-${month}-${day}`);
    }
    return fechas;

}

function generarNumVuelo(){
    var num = parseInt(Math.random()*10000)
    return "DV"+ num.toString();
};

//Genera un id para el vuelo
function generaId() {
    idActual += 1;
    return idActual;
}

/*3 vuelos diarios a paris*/
function generaVuelosParis(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '08:00', '10:00', 30, 70,  generarNumVuelo()));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '13:00', '15:10', 30, 95,  generarNumVuelo()));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '19:00', '21:05', 30, 120,  generarNumVuelo()));
}

/*2 vuelos diarios a Edimburgo*/
function generaVuelosEdimburgo(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '09:00', '14:30', 30, 90,  generarNumVuelo()));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '14:00', '19:15', 30, 120,  generarNumVuelo()));
}

/*1 vuelo diarios a Ciudad de Mexico*/
function generaVuelosMexico(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Ciudad de Mexico', fecha, '13:00', '06:20', 30, 350,  generarNumVuelo()));
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
    var user = new Usuario("elena","mederos","54058798N","18-02-1991","elena@gmail.com","+34","686246095", "password",300,["DVN92285246612"]);
    var user2 = new Usuario("ana","mederos","54058799J","18-02-1991","ana@gmail.com","+34","686246095", "password",200,[]);
    usuarios.añadirUsuario(user2);
    usuarios.añadirUsuario(user);
    // Quería usar el usuarios.guardarUSuarios(), pero si lo usaba no me debaja iniciar sesión.. por qué? No lo he descubierto
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

// ---------------INICIALIZACION DE LAS COMPRAS---------------------------
function iniciaCompras(){
    var compras = [];
    var compra = new Compra();
    compra.numReserva = "DVN92285246612";
    compra.fechaReserva = "2022-10-31";
    compra.usuario = "elena@gmail.com"
    compra.pasajeros = [{nombre: "elena", apellidos: "mederos", dni: "54058798N"}];
    compra.vuelo = {asientosLibres:30, destino:"Edimburgo", fecha:"2022-11-01", hora:"09:00", horallegada:"14:30", id:11, origen:"Madrid", precio:90, numVuelo:"DV0923"};
    compra.totalPagado = 90;
    compras.push(compra)
    
    localStorage.setItem("compras",JSON.stringify(compras));
}

//funcion que inicializa los usuarios y los vuelos
function inicializar(){
    if (!localStorage.getItem("vuelos")){
        iniciaVuelos();
    }
    
    if (usuariosFromLocalStorage().usuarios.length == 0){
        iniciaUsuarios();
    }

    if(!localStorage.getItem("compras")){
        iniciaCompras();
    }
}

inicializar()
