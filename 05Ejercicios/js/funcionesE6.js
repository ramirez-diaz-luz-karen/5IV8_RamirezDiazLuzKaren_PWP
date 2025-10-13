
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

      document.getElementById('resultado').value = `Edad: ${edad} años.`;
    }


function mostrarEdad() {
  const edad = parseInt(document.getElementById('edad').value);
  const resultado = document.getElementById('resultado');
  const gif = document.getElementById('container-gif');

  if (isNaN(edad) || edad < 7 || edad > 120) {
    alert("Edad inválida. Ingresa un número entre 7 y 120.");
    resultado.value = "";
    gif.style.display = "none";
    return;
  }

  resultado.value = `${edad} años.`;
  gif.style.display = "block";

  setTimeout(() => {
    resultado.value = "";
    gif.style.display = "none";
  }, 5000);
}

function Borrar() {
  document.getElementById('fecha').value = "";
  document.getElementById('edad').value = "";
  document.getElementById('resultado').value = "";
  document.getElementById('container-gif').style.display = "none";
}

