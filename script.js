let estudiantes = {
    gryffindor: 0,
    ravenclaw: 0,
    hufflepuff: 0,
    slytherin: 0,
};

const tabla = {
    1: { A: "hufflepuff", B: "ravenclaw", C: "gryffindor", D: "slytherin" },
    2: { A: "ravenclaw", B: "gryffindor", C: "slytherin", D: "hufflepuff" },
    3: { A: "gryffindor", B: "slytherin", C: "hufflepuff", D: "ravenclaw" },
    4: { A: "slytherin", B: "hufflepuff", C: "ravenclaw", D: "gryffindor" },
    5: { A: "hufflepuff", B: "ravenclaw", C: "gryffindor", D: "slytherin" },
    6: { A: "ravenclaw", B: "gryffindor", C: "slytherin", D: "hufflepuff" },
    7: { A: "gryffindor", B: "slytherin", C: "hufflepuff", D: "ravenclaw" },
    8: { A: "slytherin", B: "hufflepuff", C: "ravenclaw", D: "gryffindor" },
    9: { A: "hufflepuff", B: "ravenclaw", C: "gryffindor", D: "slytherin" },
    10: { A: "ravenclaw", B: "gryffindor", C: "slytherin", D: "hufflepuff" },
};

const escudos = {
    gryffindor: "🦁",
    ravenclaw: "🦅",
    hufflepuff: "🦡",
    slytherin: "🐍",
};

function actualizarEstudiantesDesdeInput() {
    estudiantes.gryffindor =
        parseInt(document.getElementById("gryffindorInput").value) || 0;
    estudiantes.ravenclaw =
        parseInt(document.getElementById("ravenclawInput").value) || 0;
    estudiantes.hufflepuff =
        parseInt(document.getElementById("hufflepuffInput").value) || 0;
    estudiantes.slytherin =
        parseInt(document.getElementById("slytherinInput").value) || 0;
}

function procesarRespuestas() {
    actualizarEstudiantesDesdeInput();

    let texto = document.getElementById("respuestasTexto").value.trim();
    let letras = texto
        .match(/[a-zA-Z]/g)
        .slice(0, 10)
        .join("");

    if (letras.length != 10) {
        document.getElementById("puntos").innerHTML =
            "Deben ser 10 respuestas para asignar una casa";
        return;
    }

    let puntos = {
        gryffindor: 0,
        ravenclaw: 0,
        hufflepuff: 0,
        slytherin: 0,
    };

    for (let i = 0; i < letras.length; i++) {
        let posicion = i + 1;
        let letra = letras[i].toUpperCase();
        let casa = tabla[posicion][letra];
        if (tabla[posicion] && casa) {
            puntos[casa]++;
        }
    }

    document.getElementById("puntos").innerText =
        `📊 Puntos: ❤️ ${puntos.gryffindor} | 💙 ${puntos.ravenclaw}  | 💛 ${puntos.hufflepuff} | 💚 ${puntos.slytherin}`;

    let ordenadas = Object.keys(puntos).sort((a, b) => puntos[b] - puntos[a]);
    let casaGanadora = ordenadas[0];
    let segundaCasa = ordenadas[1];

    let minimo = Math.min(...Object.values(estudiantes));
    let diferencia = estudiantes[casaGanadora] - minimo;

    let casaAsignada = diferencia > 3 ? segundaCasa : casaGanadora;
    estudiantes[casaAsignada]++;

    let resultadoEl = document.getElementById("resultado");
    resultadoEl.innerHTML = `Propuesta de casa:
    <span class="casa ${casaAsignada}">
    ${casaAsignada.toUpperCase()} ${escudos[casaAsignada]}
    </span>`;

    document.getElementById("puntos").style.color = "white";
}

function limpiarRespuestas() {
    document.getElementById("respuestasTexto").value = "";
    document.getElementById("puntos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
