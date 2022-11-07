function tajetas(){
    var email = localStorage.getItem("emailCheckin");
    var mensaje = document.createElement('p');
    mensaje.innerHTML=`Las tarjetas de embarque se enviaran al email: ${email}`;
    document.getElementById("tarjetas").appendChild(mensaje);
}

tajetas();