function validar1(e) {
    const input = e.target;
    const valor = input.value;
    const teclado = (document.all) ? e.keyCode : e.which;

    if (teclado === 8) return true;

    const codigo = String.fromCharCode(teclado);

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(codigo)) return false;

    if (valor.endsWith(" ") && codigo === " ") return false;

    return true;
}

function problema1() {
    const cadena = document.getElementById("p1-input").value.trim();

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/.test(cadena)) {
        document.getElementById("p1-output").textContent = "Entrada inválida. Usa solo letras y separa las palabras con un solo espacio.";
        return;
    }

    const palabras = cadena.split(" "); //split espacio
    const resultado = palabras.reverse().join(" ");
    document.getElementById("p1-output").textContent = resultado;
}



function problema2() {
    var p2_x1 = document.querySelector("#p2_x1").value;
    var p2_x2 = document.querySelector("#p2_x2").value;
    var p2_x3 = document.querySelector("#p2_x3").value;
    var p2_x4 = document.querySelector("#p2_x4").value;
    var p2_x5 = document.querySelector("#p2_x5").value;

    var p2_y1 = document.querySelector("#p2_y1").value;
    var p2_y2 = document.querySelector("#p2_y2").value;
    var p2_y3 = document.querySelector("#p2_y3").value;
    var p2_y4 = document.querySelector("#p2_y4").value;
    var p2_y5 = document.querySelector("#p2_y5").value;

    //creamos los vectores
    var v1 =[p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 =[p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function(a, b){return a - b});
    v2 = v2.sort(function(a, b){return a - b});

    v2 = v2.reverse();

    var p2_producto = 0;
    for (var i=0; i< v1.length; i++){

        p2_producto += v1[i] * v2[i];
    }
    
    document.querySelector("#p2_resultado").textContent = "El producto escalar  minimo es: " + p2_producto;

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
