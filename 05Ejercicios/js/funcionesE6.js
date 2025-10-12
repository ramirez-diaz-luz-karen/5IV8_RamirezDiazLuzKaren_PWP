
function calcularEdad() {
      const fechaInput = document.getElementById('fecha').value;
      if (!fechaInput) {
        alert("Por favor ingresa una fecha de nacimiento.");
        return;
      }

      const fecha = new Date(fechaInput);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fecha.getFullYear();
      const m = hoy.getMonth() - fecha.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;

      if (edad < 7) {
        alert("La edad calculada es menor a 7 años. No está permitida.");
        document.getElementById('resultado').textContent = "";
        return;
      }

      if (edad > 120) {
        alert("La edad calculada supera los 120 años. Verifica la fecha.");
        document.getElementById('resultado').textContent = "";
        return;
      }

      document.getElementById('resultado').textContent = `Edad calculada: ${edad} años.`;
    }


function mostrarEdad() {
  const edad = parseInt(document.getElementById('edad').value);
  if (isNaN(edad) || edad < 0 || edad > 120) {
    alert("Edad inválida. Ingresa un número entre 0 y 120.");
    return;
  }

  const resultado = document.getElementById('resultado');
  const gif = document.getElementById('gifContainer');

  resultado.textContent = `Edad ingresada: ${edad} años.`;
  resultado.classList.remove('oculto');
  resultado.classList.add('visible', 'desvanecer');

  gif.classList.remove('oculto');
  gif.classList.add('visible', 'desvanecer');

  setTimeout(() => {
    resultado.classList.remove('visible', 'desvanecer');
    resultado.classList.add('oculto');
    gif.classList.remove('visible', 'desvanecer');
    gif.classList.add('oculto');
    resultado.textContent = "";
  }, 5000);
}


function Borrar() {
    document.formulario.reset();
    document.getElementById('campoFecha').classList.add('oculto');
    document.getElementById('campoEdad').classList.add('oculto');
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('gifContainer').classList.add('oculto');
}
