function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado==8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//Funcion para calcular el interes
function interes(){
    var valor = document.getElementById("cantidadi").value;

    var parseo = parseFloat(valor);
    alert(parseo);
    var interes = (parseo * 0.085);//LIMITE A 2 DECIMALES
    alert(interes);
    var total = interes + parseo;
    alert(total);
    document.getElementById("saldoi").value = "$ " + total; //LIMITE A 2 DECIMALES
}

function Borrar(){
    document.getElementById("cantidadi").value = "";
    document.getElementById("saldoi").value = "";
}
