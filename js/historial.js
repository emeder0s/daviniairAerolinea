
function userHistorial() {
    let historial = JSON.parse(localStorage.compras);
    if (historial == null) { alert('Todavía no has hecho compras') };
    let comprasUsuario = historial.filter(element => {
        if (element.usuario == "D0001") {
            return element;
        }
    });
    return comprasUsuario;
}
function desplegarHistorial() {
    let comprasUsuario = userHistorial()
    comprasUsuario.forEach(element => {
        let numeroReserva = element.numReserva;
        let fechReserva = element.fechaReserva;
        let pasajes = element.numPasajes;
        // console.table(pasajes);
        // console.log(pasajes);
        let infoVuelos = [];
        // console.log(infoVuelos.length);
        for (let i = 0; i < pasajes.length; i++) {

            if (infoVuelos.length == 0) {
                infoVuelos.push(pasajes[i].vuelo);
                infoVuelos.push(pasajes[i].Pasajero);
            } else {
                infoVuelos.push(pasajes[i].Pasajero);
            }
            console.log(infoVuelos.length);
        }
        let pagado = element.totalPagado;
        let printReserva = `No. reserva: ${numeroReserva}`;
        let printFechaReserva = `Comprado el : ${fechReserva}`;
        let printPagado = `Total compra: ${pagado} €`;
        let printVuelo = `Número de vuelo: ${infoVuelos[0]}`
        let container = document.createElement('div');
        container.setAttribute('class', 'container card');
        var documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(container);
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row')
        let col1 = document.createElement('div');
        col1.setAttribute('class', 'col');
        let contenidoCol1 = document.createTextNode(printReserva);
        col1.appendChild(contenidoCol1);
        let col2 = document.createElement('div');
        col2.setAttribute('class', 'col right');
        let contenidoCol2 = document.createTextNode(printFechaReserva);
        col2.appendChild(contenidoCol2);
        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row');
        let col3 = document.createElement('p');
        col3.setAttribute('class', 'col');
        let contenidoCol3 = document.createTextNode(printVuelo);
        col3.appendChild(contenidoCol3);
        for (let i = 1; i < infoVuelos.length; i++) {
            console.log(infoVuelos[i])
            let contenidoCol3b = document.createTextNode(infoVuelos[i]);
            let parrafo = document.createElement('p');
            parrafo.appendChild(contenidoCol3b);
            col3.appendChild(parrafo);
        }
        let row3 = document.createElement('div');
        row3.setAttribute('class', 'row');
        let col4 = document.createElement('div');
        col4.setAttribute('class', 'col right');
        let contenidoCol4 = document.createTextNode(printPagado);
        col4.appendChild(contenidoCol4);
        var documentFragment2 = document.createDocumentFragment();
        documentFragment2.appendChild(row1);
        row1.appendChild(col1);
        row1.appendChild(col2);
        row2.appendChild(col3);
        row3.appendChild(col4);
        container.appendChild(row1);
        container.appendChild(row2);
        container.appendChild(row3);
        document.getElementById("historial").appendChild(container);
    });






}

let compra1 = new Compra('0001', '2022-10-28', 'D0001', [JSON.parse('{"vuelo": "B505", "Pasajero": "Gerardo Mir"}'), JSON.parse('{"vuelo": "B505", "Pasajero": "Gerar2"}')], "AB544", '1,500');
let compra2 = new Compra('0002', '2022-10-28', 'D0001', [JSON.parse('{"vuelo": "B504", "Pasajero": "Helen Mederos"}')], "AB544", '1,500');
let compra3 = new Compra('0003', '2022-10-28', 'D0003', [JSON.parse('{"vuelo": "B503", "Pasajero": "Mary of the Green"}'), JSON.parse('{"vuelo": "B505", "Pasajero": "Serg Shepherd "}')], "AB544", '1,500');
function subirHistorial() {
    localStorage.clear();
    var historial = [compra1, compra2, compra3];
    localStorage.setItem("compras", JSON.stringify(historial));
}

userHistorial();