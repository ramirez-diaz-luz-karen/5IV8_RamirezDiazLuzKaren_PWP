/*
JS maneja variables del siguiente modo 
var-> una variable de acceso local y global dependiendo de donde se declare
let-> es una variable "protegida", solo se puede hacer uso dentro de la funcion o bloque donde se declara
const-> es una variable que no puede cambiar su valor, es una constante


var x= "hola";

if (true){
    let x = "habia una vez";
    console.log(x);

}


let y = "habia una vez";

console.log(x);


//Como usamos las funciones

function suma (a, b) {
    return a + b;
}

console.log(`Esta suma es de: ${suma(5,3)}` );


//Las funciones flecha nos aydan a poder realizar operaciones de una forma mucho más sencilla de acuerdo a la siguiente estructura:
//"cadena" -> id, clase, metodo, nombre, atributo

const funcionFlecha = (n1, n2) => n1 + n2;
console.log(`Esta suma es de: ${suma(5,3)}`);
*/
/* const razasDePerros = [
    "Pastor Alemán",
    "Labrador Retriever",
    "Bulldog Francés",
    "Beagle",
    "chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug",
];*/


//Formas de recorrer e imprimir un arreglo
//for
/*
for (let i = 0; i < razasDePerros.length; i++) {
    console.log(razasDePerros[i]);
}
*/

//for of
/*
for (const raza of razasDePerros) {

    console.log(raza);
}
*/

//for in
/*
for (const indice in razasDePerros) {
    console.log(razasDePerros[indice]);
}
*/

//forEach: itera sobre los elementos del arreglo y no devuelve nada
//Todos los for each son funciones flechapor defecto
//la estructura general del forEach es el siguente:
// argumento.forEach((variable, indice, arregloOriginal) => {codigo a ejecutar});
/*
razasDePerros.forEach(raza=> console.log(raza));
*/


//funcion MAP-> iterar sobre los elementos del arreglo y regresa un arreglo diferente con el cual podemos jugar 
/*
const razasDePerrosMayusculas = razasDePerros.map(raza=> raza.toUpperCase());
console.log(razasDePerrosMayusculas);*/

//FIND-> nos permite realizar una busqueda de un elemento delntro del arreglo, si lo encuentra, lo retorna sino lanza un "indefined"
/*
if(razasDePerros.find(raza=> raza ==="Chihuahua")){
    console.long("si se encontro la raza");
    console.log(razasDePerros);
}else{
    //hay que meterlo
    razasDePerros.push("Chihuahua");
    console.log(razasDePerros);
}*/

//FINDINDEX -> Permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, regresa el indice del elemento, sino regresa un -1, esta funcion es particularmente util cuando necesitamos modificar o eliminar de un arreglo original, dentro de una copia del mismo

/* const indiceChihuahua  = razasDePerros.findIndex(raza => raza == "Chihuahua");
console.log(indiceChihuahua);

if(indiceChihuahua > -1){
    //si se encontro y esta dentro del arreglo
    console.log(razasDePerros[indiceChihuahua]);
    //aparte le voy a decir que agregue un texto a este resultado
    razasDePerros[indiceChihuahua] += "(Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros);
}*/

function evaluar1(e){
    var teclado = (document.all)? e.keyCode : e.which;
    const input = e.target;
    const valor = input.value;
    const codigo = String.fromCharCode(teclado);

    if (teclado === 8) return true;
    if (!/[0-9\.\-]/.test(codigo)) return false;
    if (codigo === '.' && valor.includes('.')) return false;
    if (codigo === '-') {
        if (valor.includes('-')) return false;
        if (valor.length > 0) return false;
    }

    return true;
}

function ejercicio1() {
    var num1 = document.getElementById("num1-ej1").value;
    var num2 = document.getElementById("num2-ej1").value;

    var parseo1 = parseFloat(num1);
    var parseo2 = parseFloat(num2);
    var resultado = "";

    if (isNaN(parseo1) || isNaN(parseo2)) {
        resultado = "Por favor ingresa dos números válidos.";
    } else if (parseo1 === parseo2) {
        resultado = "Son iguales. Multiplicación: " + (parseo1 * parseo2);
    } else if (parseo1 > parseo2) {
        resultado = "El primero es mayor. Resta: " + (parseo1 - parseo2);
    } else {
        resultado = "El segundo es mayor. Suma: " + (parseo1 + parseo2);
    }

    document.getElementById("ej1-output").textContent = resultado;
}

function Borrar1() {
    document.getElementById("num1-ej1").value = "";
    document.getElementById("num2-ej1").value = "";
    document.getElementById("ej1-output").textContent = "Esperando datos...";
}


function evaluar2(e){
    const teclado = (document.all) ? e.keyCode : e.which;
    const input = e.target;
    const valor = input.value;
    const codigo = String.fromCharCode(teclado);

    if (teclado === 8) return true;

    if (codigo === '-') {
        if (valor.includes('-')) return false;
        if (valor.length > 0) return false;
        return true;
    }

    if (codigo === '.') {
        if (valor.includes('.')) return false;
        return true;
    }

    if (!/[0-9]/.test(codigo)) return false;

    return true;
}

function ejercicio2(){
    var num1 = document.getElementById("num1-ej2").value;
    var num2 = document.getElementById("num2-ej2").value;
    var num3 = document.getElementById("num3-ej2").value;
    var resultado = "";

    const parseo1 = parseFloat(num1);
    const parseo2 = parseFloat(num2);
    const parseo3 = parseFloat(num3);

    if (parseo1 === parseo2 || parseo1 === parseo3 || parseo2 === parseo3) {
        resultado = "Los números no deben repetirse. Ingresa tres valores distintos.";
    } else if (parseo1 > parseo2 && parseo1 > parseo3) {
        resultado = "El número " + parseo1 + " es el mayor.";
    } else if (parseo2 > parseo1 && parseo2 > parseo3) {
        resultado = "El número " + parseo2 + " es el mayor.";
    } else {
        resultado = "El número " + parseo3 + " es el mayor.";
    }

    document.getElementById("ej2-output").textContent = resultado;
}

function Borrar2(){
    document.getElementById("num1-ej2").value = "";
    document.getElementById("num2-ej2").value = "";
    document.getElementById("num3-ej2").value = "";
    document.getElementById("ej2-output").textContent = "Esperando datos...";
}

function evaluar3(e){
    var teclado = (document.all)? e.keyCode : e.which;
    const input = e.target;
    const valor = input.value;
    const codigo = String.fromCharCode(teclado);

    if (teclado === 8) return true;
    if (!/[0-9]/.test(codigo)) return false;

    return true;
}

function ejercicio3(){
    const salariob = document.getElementById("salariob").value;
    const horasextra = document.getElementById("horasextra").value;

    const salario = parseFloat(salariob);
    const horas = parseFloat(horasextra);
    let resultado = "";

    if (isNaN(salario) || isNaN(horas)) {
        resultado = "Ingresa valores numéricos válidos.";
    } else if (horas <= 8) {
        const pago = horas * (salario * 2);
        resultado = "Pago por horas extra: $" + pago.toFixed(2);
    } else {
        const pagoDoble = 8 * (salario * 2);
        const pagoTriple = (horas - 8) * (salario * 3);
        const pagoTotal = pagoDoble + pagoTriple;
        resultado = "Pago por horas extra: $" + pagoTotal.toFixed(2);
    }

    document.getElementById("ej3-output").textContent = resultado;
}

function Borrar3(){
    document.getElementById("salariob").value = "";
    document.getElementById("horasextra").value = "";
    document.getElementById("ej3-output").textContent = "Esperando datos...";
}

function evaluar4(e){
    var teclado = (document.all)? e.keyCode : e.which;
    const input = e.target;
    const valor = input.value;
    const codigo = String.fromCharCode(teclado);

    if (teclado === 8) return true;
    if (!/[0-9]/.test(codigo)) return false;

    return true;
}

function ejercicio4() {
    const años = document.getElementById("años").value;
    const salariomes = document.getElementById("salariom").value;

    const antiguedad = parseFloat(años);
    const salariom = parseFloat(salariomes);
    let resultado = "";

    if (antiguedad < 1) {
        const pago = 12 * (salariom * 0.05);
        resultado = "El pago de su utilidad será de: $" + pago.toFixed(2);
    } else if (antiguedad >= 1 && antiguedad < 2) {
        const pago = 12 * (salariom * 0.07);
        resultado = "El pago de su utilidad será de: $" + pago.toFixed(2);
    } else if (antiguedad >= 2 && antiguedad < 5) {
        const pago = 12 * (salariom * 0.10);
        resultado = "El pago de su utilidad será de: $" + pago.toFixed(2);
    } else if (antiguedad >= 5 && antiguedad <= 10) {
        const pago = 12 * (salariom * 0.15);
        resultado = "El pago de su utilidad será de: $" + pago.toFixed(2);
    } else if (antiguedad > 10) {
        const pago = 12 * (salariom * 0.20);
        resultado = "El pago de su utilidad será de: $" + pago.toFixed(2);
    }

    document.getElementById("ej4-output").textContent = resultado;
}

function Borrar4(){
    document.getElementById("salariom").value = "";
    document.getElementById("años").value = "";
    document.getElementById("ej4-output").textContent = "Esperando datos...";
}