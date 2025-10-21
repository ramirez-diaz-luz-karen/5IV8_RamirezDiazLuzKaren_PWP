var instrucciones = [
  "Utiliza las flechas de navegación para mover las piezas.",
  "Para ordenar las piezas guíate por la imagen del objetivo."
];

//vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [

];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//vamos a teber que crear una matriz donde tengamos las posiciones correctas
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

//esta funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
};


function checarSiGano(){
    for(var i = 0; i < rompeCorrecta.length; i++){
        for(var j = 0; j< rompe[i].length; j++){
            var rompeActual = rompe[i][j];
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
        rompe[filaPos1, columnPos1] = pos2;
        rompe[filaPos2, columnPos2] = pos1;
}

//que se encarge de saber donde está la pieza vacia 
function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


//necesitamos limitar el tamaño del rompecabezas
function posicionValida(fila,columna){
    return(fila >= 0 && fila <= 2 && columna >=0 && columna <=2);
}

//debemos crear una funcion que e encargue del movimiento detectando el evento de las flechas de navegacion.
//debemos crear una matriz de identificacion de movimiento
//arriba es 38, abajo 40, izquierda 37, derecha 39

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
}; ////Este es formato JSON, se parece a un diccionario en python, esta es una lista

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve 
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    //solo mando a llamar a que la posicion sea valida
    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        //tengo que hacer una funcion que se encargue de intercambiar las posiciones

        intercambiarPosiciones(filaVacia,columnaVacia, nuevaColumnaPiezaVacia, nuevaFilaPiezaVacia);
        actualizarPosicionVacia(nuevaColumnaPiezaVacia, nuevaFilaPiezaVacia);
        //tengo que guardar el ultimo mov
        agregarUltimoMovimiento(direccion);
    }

}

function intercambiarPosiciones(fila1, column1, fila2, column2){
    var pieza1 = rompe[fila1, column1];
        var pieza2 = rompe[fila2, column2];

        //intercambio ya debe ser por parte de os frames y el html
        intercambiarPosicionesRompe(fila1,column1,fila2,column2);

        //para el html
        intercambiarPosicionesDOM('pieza'+pieza1, 'pieza'+pieza2);

}

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var pieza1= document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    //vamos a clonarlas
    var padre1 = pieza1.parentNode;
    var padre2 = pieza2.parentNode;

    //lo clono
    var clonElemento1 = pieza1.cloneNode(true);
    var clonElemento2 = pieza2.cloneNode(true);


    //reemplazar a los padres con sus clones
    padre1.replaceChild(clonElemento1,pieza2);
    padre2.replaceChild(clonElemento2, pieza1);

}

    //debo actualizar los movimiento en el DOM
function actualizarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");

    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case ultimoMovimiento.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;

    }
}

//poder mezclar todas las piezas
function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Asi no se puede");
        return;
    }

    var direcciones =[codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces-1);
    }, 100);
}

//necesitamos mover que teclas se estan oprimiendo
function capturarTeclas(){
    document.body.onkeydown = (function(evento){
        if (
            evento.which === codigosDireccion.ARRIBA ||
            evento.which === codigosDireccion.ABAJO ||
            evento.which === codigosDireccion.DERECHA ||
            evento.which === codigosDireccion.IZQUIERDA
            ) {
            moverEnDireccion(evento.which);


            //saber si gano
            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }
            ,500);

            }
            evento.preventDefault();
        }
    });
}

function iniciar(){
    //mezclar las piezas d
    mezclarPiezas(30);
    capturarTeclas();
    //capturar el ultimo movimiento

};

iniciar();

//mandamos traer a la funcioon
mostrarInstrucciones(instrucciones);


//crear una funcion para saber que ganó

