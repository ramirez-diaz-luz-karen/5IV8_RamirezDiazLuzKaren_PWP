function validarS(e){
    const input = e.target; /*Apunta al elemento HTML que disparó el evento */
    const valor = input.value; /*Extrae el contenido actual del campo antes de que se agregue la nueva tecla.*/
    var teclado = (document.all)? e.keyCode : e.which; /*Este comando sirve para saber que tecla fue presionada, los 3 ((document.all)? -Internet Explorer- e.keyCode -nav antiguos- : e.which -nav modernos como chrome y firefox-) sirven para lo mismo solo que en distintos navegadores*/
    
    if (teclado==8) return true; /*El codigo para Blackspace es "8", sirve para que se pueda usar la tecla de borrar y el filtr no la bloquee*/
    
    var codigo = String.fromCharCode(teclado); /*Esta variable toma el valor de la tecla presionada y lo convierte a un string*/

    if (!/[0-9.]/.test(codigo)) return false;/*Con la expresión regular llamada "Patron", permite solo numeros del 0 al 9, y el punto*/

    if (codigo =='.' && valor.includes('.')) return false; /*Con esta condicion se evita que se pueda ingresar mas de un punto*/
    
    const nuevoValor = valor + codigo; /*Esta variable crea el nuevo valor que tendra el campo, es decir el valor actual mas la nueva tecla presionada*/
    const partes = nuevoValor.split('.'); /*Esta variable crea un arreglo que separa el nuevo valor en dos partes, antes y despues del punto*/
    
    if (partes.length==2 && partes[1].length > 2) return false; /*Con esta condicion se evita que se puedan ingresar mas de dos decimales despues del punto*/

    return true;   
}


function comisiones(){
    var  valor= document.getElementsById("sueldoBase").value;
    var valor2 = document.getElementsById("comisionesTotales").value;

    var parseo = parseFloat(valor);
    alert(parseo);
    var parseo2 = parseFloat(valor2);
    alert(parseo2);

    var comision = (parseo2 * 0.01);
    alert(comision);

    var total = comision + parseo;
    alert(total);

    document.getElementById("sueldoT").value = "$ " + total; //LIMITE A 2 DECIMALES
}

function Borrar(){
    document.getElementById("cantidadi").value = "";
    document.getElementById("salodoi").value = "";
}
