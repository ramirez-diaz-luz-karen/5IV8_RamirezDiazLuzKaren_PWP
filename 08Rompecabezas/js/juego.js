var instrucciones = [
  "Utiliza las flechas de navegación para mover las piezas.",
  "Para ordenar las piezas guíate por la imagen del objetivo."
];

//vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [

];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var matriz = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//vamos a teber que crear una matriz donde tengamos las posiciones correctas


var rompecabezas = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];


var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito saber las coordebadas de la pieza vacia, la que se va a mover

var filaVacia = 2;
var columnaVacia = 2;

//necesitamos una funcion que se encargue de mostrar las instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i=0; i< instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
        
};

//esta e¿funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
};


function checarSiGano(){
    for(var i = 0; i < rompeCorrecta.length; i++){
        for(var j = 0; j< rompe[i].length; j++){
            var rompeActual = rompe[i];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gano
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Felicidades, ganaste el juego");
    }
}

/*
    necesitamos una funcion que se encargue de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esto tenemos que hacer el uso de:
    arreglo[][] = posicion[][]
    //intercambiar
    posicion[][] = arreglo[][]


*/

function intercambiarPosicionesRompe(filaPos1, columnPos1, filaPos2, columnPos2,){
    var pos1 = rompe[filaPos1, columnPos1];
        var pos2 = rompe[filaPos2, columnPos2];

        //intercambio
        rompe[filaPos1, columnPos1] = pos1;
        rompe[filaPos2, columnPos2] = pos2;

        


}

function iniciar(){
    //mezclar las piezas del 
    //capturar el ultimo movimiento

};

//mandamos traer a la funcioon
mostrarInstrucciones(instrucciones);


//crear una funcion para saber que ganó

