let estudiantes = {
  gryffindor: 13,
  ravenclaw: 18,
  hufflepuff: 11,
  slytherin: 12
};

const tabla = {
  1: {A:"hufflepuff", B:"ravenclaw", C:"gryffindor", D:"slytherin"},
  2: {A:"ravenclaw", B:"gryffindor", C:"slytherin", D:"hufflepuff"},
  3: {A:"gryffindor", B:"slytherin", C:"hufflepuff", D:"ravenclaw"},
  4: {A:"slytherin", B:"hufflepuff", C:"ravenclaw", D:"gryffindor"},
  5: {A:"hufflepuff", B:"ravenclaw", C:"gryffindor", D:"slytherin"},
  6: {A:"ravenclaw", B:"gryffindor", C:"slytherin", D:"hufflepuff"},
  7: {A:"gryffindor", B:"slytherin", C:"hufflepuff", D:"ravenclaw"},
  8: {A:"slytherin", B:"hufflepuff", C:"ravenclaw", D:"gryffindor"},
  9: {A:"hufflepuff", B:"ravenclaw", C:"gryffindor", D:"slytherin"},
  10:{A:"ravenclaw", B:"gryffindor", C:"slytherin", D:"hufflepuff"}
};

const escudos = {
  gryffindor: "🦁",
  ravenclaw: "🦅",
  hufflepuff: "🦡",
  slytherin: "🐍"
};

function actualizarEstudiantesDesdeInput(){
  estudiantes.gryffindor = parseInt(document.getElementById("gryffindorInput").value) || 0;
  estudiantes.ravenclaw = parseInt(document.getElementById("ravenclawInput").value) || 0;
  estudiantes.hufflepuff = parseInt(document.getElementById("hufflepuffInput").value) || 0;
  estudiantes.slytherin = parseInt(document.getElementById("slytherinInput").value) || 0;
}

function mostrarContador(){
  document.getElementById("contador").innerText =
    "❤️ Gryffindor: " + estudiantes.gryffindor +
    " 💙 Ravenclaw: " + estudiantes.ravenclaw +
    " 💛 Hufflepuff: " + estudiantes.hufflepuff +
    " 💚 Slytherin: " + estudiantes.slytherin;
}

function procesarRespuestas(){
  actualizarEstudiantesDesdeInput();

  let texto = document.getElementById("respuestasTexto").value.trim();
  let partes = texto.split(" ");

  let puntos = {
    gryffindor: 0,
    ravenclaw: 0,
    hufflepuff: 0,
    slytherin: 0
  };

  partes.forEach(parte => {
    let [numero, letra] = parte.split(".");
    numero = parseInt(numero);
    letra = letra?.toUpperCase();
    if(tabla[numero] && tabla[numero][letra]){
      puntos[tabla[numero][letra]]++;
    }
  });

  document.getElementById("detalle").innerText =
    "📊 Puntos: ❤️ Gryffindor " + puntos.gryffindor +
    " | 💙 Ravenclaw " + puntos.ravenclaw +
    " | 💛 Hufflepuff " + puntos.hufflepuff +
    " | 💚 Slytherin " + puntos.slytherin;

  let ordenadas = Object.keys(puntos).sort((a,b)=> puntos[b]-puntos[a]);
  let casaGanadora = ordenadas[0];
  let segundaCasa = ordenadas[1];

  let minimo = Math.min(...Object.values(estudiantes));
  let diferencia = estudiantes[casaGanadora] - minimo;

  let casaAsignada = diferencia > 3 ? segundaCasa : casaGanadora;
  estudiantes[casaAsignada]++;

  let resultadoEl = document.getElementById("resultado");
  resultadoEl.innerText = "✨ Asignado a " + casaAsignada.toUpperCase();
  resultadoEl.className = casaAsignada;

  document.getElementById("escudo").innerText = escudos[casaAsignada];
  mostrarContador();
}

mostrarContador();