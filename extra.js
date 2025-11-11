/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const guardado = new Map();

    return function(...args){
        let actual = guardado;

        for(const arg of args){
            if(!actual.has(arg)){
                actual.set(arg, new Map());
            }
            actual = actual.get(arg);
        }
        if (actual.has('resultado')){
            return actual.get('resultado');
        }
        const resultado = fn(...args);
        actual.set('resultado', resultado);
        return resultado;
    };
}


 let callCount = 0;
 const memoizedFn = memoize(function (a, b) {
callCount += 1;
 return a + b;
})
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1 