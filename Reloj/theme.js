function cambiarTema(colorFondo, colorTexto) {
  document.body.style.backgroundImage = `url(${colorFondo})`;
  document.body.style.color = colorTexto;
  
  // Cambiar el color del texto en #date, #clock y #clock span
  var elementosTexto = document.querySelectorAll('#date, #clock, #clock span, #footer');
  elementosTexto.forEach(function(elemento) {
    elemento.style.color = colorTexto;
  });

  // Verificar si el fondo es blanco y cambiar el color del texto en #footer
  if (colorFondo.includes('fondoblanco')) {
    var footer = document.getElementById('footer');
    footer.style.color = '#000000'; // Cambiar a color negro
  } else if (colorFondo.includes('fondoazul') || colorFondo.includes('fondorojo') || colorFondo.includes('fondoverde') || colorFondo.includes('fondovioleta') || colorFondo.includes('fondonegro')) {
    var footer = document.getElementById('footer');
    footer.style.color = '#ffffff'; // Cambiar a color blanco
  }
}

document.getElementById('temasBtn').addEventListener('click', function() {
  var temasContainer = document.getElementById('temasContainer');
  if (temasContainer.style.display === 'block') {
    temasContainer.classList.add('flip-scale-up-hor'); 
    setTimeout(function() {
      temasContainer.style.display = 'none';
      temasContainer.classList.remove('flip-scale-up-hor');
    }, 500);
  } else {
    temasContainer.style.display = 'block';
    temasContainer.classList.add('slide-left');
  }
});

var temas = document.getElementsByClassName('tema');
for (var i = 0; i < temas.length; i++) {
  temas[i].addEventListener('click', function() {
    var temaSeleccionado = this.src;
    if (temaSeleccionado.includes('fondoazul')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    } else if (temaSeleccionado.includes('fondorojo')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    }
    else if (temaSeleccionado.includes('fondovioleta')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    }
    else if (temaSeleccionado.includes('fondoverde')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    }
    else if (temaSeleccionado.includes('fondonegro')) {
      cambiarTema(temaSeleccionado, '#000000');
    }
    else if (temaSeleccionado.includes('fondoblanco')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    }
    else if (temaSeleccionado.includes('fondocyrex')) {
      cambiarTema(temaSeleccionado, '#000000'); 
    }
    var temasContainer = document.getElementById('temasContainer');
    temasContainer.style.display = 'none';
  });
}

document.getElementById('alarmasBtn').addEventListener('click', function() {
  var container = document.querySelector('.container');
  container.style.visibility = (container.style.visibility === 'hidden' || container.style.visibility === '') ? 'visible' : 'hidden';

  if (container.style.visibility === 'visible') {
      container.classList.add('scale-up-hor-center');
  } else {
      container.classList.remove('scale-up-hor-center');
  }
});
