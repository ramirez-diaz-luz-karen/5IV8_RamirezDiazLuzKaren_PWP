
function problema1() {
    const input = document.getElementById("p1-input");
    const cadena = input.value.trim();

   
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(cadena)) {
        document.getElementById("resultadoC").value = "Solo se permiten letras y espacios.";
        return;
    }

    if (cadena.includes("  ")) {
        document.getElementById("resultadoC").value = "No se permiten espacios múltiples entre palabras.";
        return;
    }

    const palabras = cadena.split(" ").filter(p => p.length > 0);
    if (palabras.length < 2) {
        document.getElementById("resultadoC").value = "Debes ingresar al menos dos palabras.";
        return;
    }

    const resultado = palabras.reverse().join(" ");
    document.getElementById("resultadoC").value = resultado;
}

function Borrar1(){
    document.getElementById("resultadoC").value = "";
    document.getElementById("p1-input").value = "";
}


function problema2() {
    

}


function problema3() {
    //tarea

}
