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

const razasDePerros = [
    "Pastor Alemán",
    "Labrador Retriever",
    "Bulldog Francés",
    "Beagle",
    "chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug",
];

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

const indiceChihuahua  = razasDePerros.findIndex(raza => raza == "Chihuahua");
console.log(indiceChihuahua);

if(indiceChihuahua > -1){
    //si se encontro y esta dentro del arreglo
    console.log(razasDePerros[indiceChihuahua]);
    //aparte le voy a decir que agregue un texto a este resultado
    razasDePerros[indiceChihuahua] += "(Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros);
}
