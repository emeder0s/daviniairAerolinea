class Vuelo {
    constructor(origen, destino, fecha, hora, asientosLibres) {   //fecha de vuelta también?
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.hora = hora;
        this.asientosLibres = asientosLibres;
    }
}

var arrayVuelo = []

function genera100fechas() {
    var hoy = new Date(Date.now());
    var fin = hoy * 1 + 100 * 24 * 3600 * 1000;
    var unDia = 24 * 3600 * 1000;
    var fecha;
    var fechas = [];
    for (let ms = hoy * 1; ms < fin * 1; ms += unDia) {
        fecha = new Date(ms)
        fechas.push(`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`);
    } 
    return fechas;
}

/*3 vuelos diarios a paris*/
function generaVuelosParis(fecha) {
    arrayVuelo.push(new Vuelo('Madrid', 'Paris', fecha, '8:00', 30));
    arrayVuelo.push(new Vuelo('Madrid', 'Paris', fecha, '13:00', 30));
    arrayVuelo.push(new Vuelo('Madrid', 'Paris', fecha, '19:00', 30));
}

/*2 vuelos diarios a Edimburgo*/
function generaVuelosEdimburgo(fecha) {
    arrayVuelo.push(new Vuelo('Madrid', 'Edimburgo', fecha, '9:00', 30));
    arrayVuelo.push(new Vuelo('Madrid', 'Edimburgo', fecha, '14:00', 30));
}

/*1 vuelos diarios a Ciudad de Mexico*/
function generaVuelosMexico(fecha) {
    arrayVuelo.push(new Vuelo('Madrid', 'Ciudad de Mexico', fecha, '16:00', 30));
}

function generaVuelos100dias() {
    var fechas = genera100fechas();
    for(let i = 0; i < fechas.length; i++) {
        generaVuelosParis(fechas[i]);
        generaVuelosMexico(fechas[i]);
        generaVuelosEdimburgo(fechas[i]);

    }
}
console.log(genera100fechas());



