function validarV(e){
    const input = e.target; /*Apunta al elemento HTML que disparó el evento */
    const valor = input.value; /*Extrae el contenido actual del campo antes de que se agregue la nueva tecla.*/
    var teclado = (document.all)? e.keyCode : e.which; /*Este comando sirve para saber que tecla fue presionada, los 3 ((document.all)? -Internet Explorer- e.keyCode -nav antiguos- : e.which -nav modernos como chrome y firefox-) sirven para lo mismo solo que en distintos navegadores*/
    
    if (teclado==8) return true; /*El codigo para Blackspace es "8", sirve para que se pueda usar la tecla de borrar y el filtr no la bloquee*/
    
    var codigo = String.fromCharCode(teclado); /*Esta variable toma el valor de la tecla presionada y lo convierte a un string*/

    if (!/[0-9]/.test(codigo)) return false;/*Con la expresión regular llamada "Patron", permite solo numeros del 0 al 9*/
    
    if (valor.length >= 3) return false; /*maximo 3 cifras para alumnos */

    const nuevoValor = valor + codigo; /*Esta variable crea el nuevo valor que tendra el campo, es decir el valor actual mas la nueva tecla presionada*/
    return true;   
}

function calcularPorcentaje(){

    var alumnosH = document.getElementById("alumnosH").value;
    var alumnosM = document.getElementById("alumnosM").value;
    
    const parseoH = parseInt(alumnosH);
    const parseoM = parseInt(alumnosM);

    const totalAmulnos = parseoH + parseoM;

    const porcentajeH = (parseoH * 100) / totalAmulnos;
    const porcentajeM = (parseoM * 100) / totalAmulnos;

    document.getElementById("porcentajeH").value = porcentajeH.toFixed(2) + "%";
    document.getElementById("porcentajeM").value = porcentajeM.toFixed(2) + "%";
}

function Borrar(){
    document.getElementById("alumnosH").value = "";
    document.getElementById("alumnosM").value = "";
    document.gerElementById("porcentajeH").value = "";
    document.getElementById("porcentajeM").value = "";
}