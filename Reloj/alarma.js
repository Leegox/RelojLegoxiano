var alarmTimers = {}; // Objeto para almacenar los temporizadores asociados a cada alarma


// Mostrar el modal de alarma
document.getElementById('verAlarma').addEventListener('click', function() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'block';
});

// Cerrar el modal de configuración
document.getElementsByClassName('close')[0].addEventListener('click', function() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'none';
});

// Programar la alarma
function programarAlarma(hora, minuto, dia) {
  var now = new Date();
  var diaActual = now.getDay();  // Obtener el día actual de la semana (0 para Domingo, 1 para Lunes, etc.)

  // Calcular el número de días hasta la próxima alarma
  var diasHastaAlarma = (dia - diaActual + 7) % 7;

  // Calcular la fecha y hora de la próxima alarma
  var alarmaTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diasHastaAlarma, hora, minuto, 0);

  var tiempoRestante = alarmaTime - now;

  if (tiempoRestante < 0) {
    tiempoRestante += 24 * 60 * 60 * 1000;
  }

  var timerId = setTimeout(function() {
    var audio = document.getElementById('alarmAudio');
    audio.loop = true;
    audio.play();
  }, tiempoRestante);

  return timerId; // Devuelve el identificador del temporizador
}


// Limpiar la alarma
document.getElementById('limpiarAlarma').addEventListener('click', function() {
  var audio = document.getElementById('alarmAudio');
  audio.pause();
  audio.currentTime = 0;
});

// Mostrar el modal de configuración de sonido
document.getElementById('setSound').addEventListener('click', function() {
  var soundModal = document.getElementById('soundModal');
  soundModal.style.display = 'block';
});

// Cerrar el modal de configuración de sonido
document.getElementsByClassName('closeSoundModal')[0].addEventListener('click', function() {
  var soundModal = document.getElementById('soundModal');
  soundModal.style.display = 'none';
});

// Seleccionar sonido
var selectSoundButtons = document.getElementsByClassName('selectSound');
for (var i = 0; i < selectSoundButtons.length; i++) {
  selectSoundButtons[i].addEventListener('click', function() {
    var soundModal = document.getElementById('soundModal');
    soundModal.style.display = 'none';

    var selectedSoundSrc = this.getAttribute('data-src');
    document.getElementById('alarmAudio').src = selectedSoundSrc;
  });
}

// Validar la hora y el minuto
function validarHoraMinuto(hora, minuto) {
  // Convertir a números enteros
  hora = parseInt(hora, 10);
  minuto = parseInt(minuto, 10);

  if (isNaN(hora) || isNaN(minuto) || hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
    alert("Por favor, ingresa una hora y un minuto válidos.");
    return false; // La validación falló, no continuar
  } else {
    return true; // La validación fue exitosa, continuar
  }
}

// Modal configurado

// Configurar la alarma y mostrar el modal de configuración
document.getElementById('configurarAlarma').addEventListener('click', function() {
  var hora = document.getElementById('hora').value;
  var minuto = document.getElementById('minuto').value;
  var dia = document.getElementById('dia').value;

  // Validar la hora, el minuto y el día antes de continuar
  if(validarHoraMinuto(hora, minuto)) {
    // Programar la alarma y mostrar la hora, el día y el sonido configurados
    programarAlarma(hora, minuto, dia);

    var modal = document.getElementById('modalConfigurada');
    modal.style.display = 'block';

    var diaTexto = obtenerDiaTexto(dia); // Obtener el día seleccionado
    mostrarHoraConfigurada(hora, minuto, diaTexto);
    mostrarSonidoConfigurado();
  }
});

// Mostrar la hora configurada
function mostrarHoraConfigurada(hora, minuto, dia) {
  var horaConfiguradaElement = document.getElementById('horaConfigurada');
  horaConfiguradaElement.textContent = "Día " + dia + ", " + hora + ':' + minuto;
}

// Obtener el día actual
function obtenerDiaActual() {
  var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  var now = new Date();
  var dia = diasSemana[now.getDay()];
  return dia;
}

// Función para obtener el texto del día seleccionado
function obtenerDiaTexto(dia) {
  var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return diasSemana[dia];
}

// Cerrar el modal de configuración de alarma
document.getElementById('cerrarModal').addEventListener('click', function() {
  var modal = document.getElementById('modalConfigurada');
  var modal1 = document.getElementById('myModal');
  modal.style.display = 'none';
  modal1.style.display = 'none';
});

// Función para guardar la alarma en localStorage
function guardarAlarmaEnLocalStorage(alarma) {
  var alarmas = JSON.parse(localStorage.getItem('alarmas')) || [];
  alarmas.push(alarma);
  localStorage.setItem('alarmas', JSON.stringify(alarmas));
}

// Función para cargar y mostrar las alarmas desde localStorage
function cargarYMostrarAlarmas() {
  var alarmas = JSON.parse(localStorage.getItem('alarmas')) || [];
  var listaAlarmas = document.getElementById('listaAlarmas');
  listaAlarmas.innerHTML = '';

  alarmas.forEach(function(alarma, index) {
    var listItem = document.createElement('li');
    listItem.textContent = 'Día ' + obtenerDiaTexto(alarma.dia) + ', ' + alarma.hora + ':' + alarma.minuto;
    
    // Agregar botón de eliminar
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      eliminarAlarma(index); // Llamar a la función eliminarAlarma con el índice
    });
    
    listItem.appendChild(deleteButton);
    listaAlarmas.appendChild(listItem);
  });
}

function eliminarAlarma(index) {
  var alarmas = JSON.parse(localStorage.getItem('alarmas')) || [];
  var alarma = alarmas[index];

  clearTimeout(alarmTimers[alarma.timerId]); // Cancela el temporizador

  alarmas.splice(index, 1);
  localStorage.setItem('alarmas', JSON.stringify(alarmas));
  cargarYMostrarAlarmas();
  
  // Actualiza el temporizador actual
 // Actualiza la variable global con el temporizador actual
 window.alarmTimeout = Object.values(alarmTimers).find(timerId => timerId !== undefined);
}

// En el evento de ver alarmas, cargar y mostrar las alarmas desde localStorage
document.getElementById('verAlarmas').addEventListener('click', function() {
  cargarYMostrarAlarmas();
  var modal = document.getElementById('listaAlarmasModal');
  modal.style.display = 'block';
});

// Cerrar el modal de lista de alarmas
document.getElementById('cerrarListaModal').addEventListener('click', function() {
  var modal = document.getElementById('listaAlarmasModal');
  modal.style.display = 'none';
});

// Cargar y programar alarmas
function cargarYProgramarAlarmasDesdeLocalStorage() {
  var alarmas = JSON.parse(localStorage.getItem('alarmas')) || [];
  
  // Cancelar las alarmas previas (si hay alguna)
  Object.values(alarmTimers).forEach(timerId => clearTimeout(timerId));
  alarmTimers = {};

  alarmas.forEach(function(alarma) {
    if (alarma.activa) {
      var timerId = programarAlarma(alarma.hora, alarma.minuto, alarma.dia);
      alarmTimers[alarma.timerId] = timerId;
    }
  });
}

// Al cargar la página, cargar y programar las alarmas desde localStorage
window.addEventListener('load', function() {
  cargarYProgramarAlarmasDesdeLocalStorage();
});

// En el evento de configurar alarma, guarda la alarma en localStorage y programa
document.getElementById('configurarAlarma').addEventListener('click', function() {
  var hora = document.getElementById('hora').value;
  var minuto = document.getElementById('minuto').value;
  var dia = document.getElementById('dia').value;

  if(validarHoraMinuto(hora, minuto)) {
    guardarAlarmaEnLocalStorage({ hora: hora, minuto: minuto, dia: dia, activa: true });
    programarAlarma(hora, minuto, dia);
    var modal = document.getElementById('modalConfigurada');
    modal.style.display = 'block';

    var diaTexto = obtenerDiaTexto(dia);
    mostrarHoraConfigurada(hora, minuto, diaTexto);
    mostrarSonidoConfigurado();
  }
});

// En el evento de ver alarmas, cargar y mostrar las alarmas desde localStorage
document.getElementById('verAlarmas').addEventListener('click', function() {
  cargarYMostrarAlarmas();
  var modal = document.getElementById('listaAlarmasModal');
  modal.style.display = 'block';
});

// Cerrar el modal de lista de alarmas
document.getElementById('cerrarListaModal').addEventListener('click', function() {
  var modal = document.getElementById('listaAlarmasModal');
  modal.style.display = 'none';
});

// Al cargar la página, cargar y programar las alarmas desde localStorage
window.addEventListener('load', function() {
  cargarYProgramarAlarmasDesdeLocalStorage();
});
