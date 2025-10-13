
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



function problema2() {
    

}

function validar3(e) {
    const input = e.target;
    const valor = input.value;
    const teclado = (document.all) ? e.keyCode : e.which;

    if (teclado === 8) return true;

    const codigo = String.fromCharCode(teclado);

    if (!/^[A-Z,]$/.test(codigo)) return false;

    if (codigo === " ") return false;

    if (valor.length === 0 && codigo === ",") return false;

    if (valor.endsWith(",") && codigo === ",") return false;

    return true;
}

function problema3() {
    const input = document.getElementById("p3-input").value.trim();

    if (!/^[A-Z]+(,[A-Z]+)*$/.test(input)) {
        document.getElementById("p3-output").textContent = "Formato inválido. Usa solo letras mayúsculas separadas por una coma, sin espacios.";
        return;
    }

    const palabras = input.split(",");
    let palabraMax = "";
    let maxUnicos = 0;

    for (let palabra of palabras) {
        const letrasUnicas = new Set(palabra);
        const soloLetras = [...letrasUnicas].filter(l => /^[A-Z]$/.test(l));

        if (soloLetras.length > maxUnicos) {
            maxUnicos = soloLetras.length;
            palabraMax = palabra;
        }
    }

    document.getElementById("p3-output").textContent =
        `La palabra con más caracteres únicos es "${palabraMax}" con ${maxUnicos} caracteres distintos.`;
}
