class carta {
  constructor(valor, palo) {
    this.valor = valor;
    this.palo = palo;
  }
}

let baraja = [];
let cartasJugador = [];
let puntosJugador = 0;
let cartasCrupier = [];
let puntosCrupier = 0;
let indiceCarta = 0;
const palos = ["Picas", "Corazones", "Tréboles", "Diamantes"];

let pCrup = document.getElementById("puntosCrupier");
let pJug = document.getElementById("puntosJugador");
let cCrup = document.getElementById("cartasCrupier");
let cJug = document.getElementById("cartasJugador");
let res = document.getElementById("resultado");

///BOTONES

let brepartir = document.getElementById("brepartir");
let bpedir = document.getElementById("bpedircarta");
let bplayagain = document.getElementById("bplayagain");
let bplantarse = document.getElementById("bplantarse");

brepartir.addEventListener("click", () => {
  repartir();
  console.log(cartasCrupier);
});
bpedir.addEventListener("click", () => {
  pedirCarta();
});
bplayagain.addEventListener("click", () => {
  playagain();
});
bplantarse.addEventListener("click", () => {
  plantarse();
});

function calculoJugador() {
  for (let i in cartasJugador) {
    if (cartasJugador[i].valor >= 10) {
      puntosJugador += 10;
    } else {
      puntosJugador += cartasJugador[i].valor;
    }
  }
}
function calculoCrupier() {
  for (let i in cartasCrupier) {
    if (cartasCrupier[i].valor >= 10) {
      puntosCrupier += 10;
    } else {
      puntosCrupier += cartasCrupier[i].valor;
    }
  }
}

///visibilidad botones
bpedircarta.style.display = "none";
bplantarse.style.display = "none";
bplayagain.style.display = "none";

//crear baraja
for (let i = 0; i < 4; i++) {
  //palos
  for (let j = 1; j <= 13; j++) {
    //cartas
    baraja.push(new carta(j, palos[i]));
  }
}

//barajar
for (let i = 0; i < 100; i++) {
  baraja.splice(Math.random() * 52, 0, baraja[0]);
  baraja.shift();
}

/////////////////////REPARTIR
function repartir() {
  let cJugador = baraja[indiceCarta];
  cartasJugador.push(cJugador);
  indiceCarta++;

  let cJugador2 = baraja[indiceCarta];
  cartasJugador.push(cJugador2);
  indiceCarta++;

  let cCrupier1 = baraja[indiceCarta];
  cartasCrupier.push(cCrupier1);
  indiceCarta++;
  let cCrupier2 = baraja[indiceCarta];
  cartasCrupier.push(cCrupier2);
  indiceCarta++;

  //calculamos puntos jugador por posible blackjack o +21
  calculoJugador();
  if (puntosJugador === 21) {
    resultado.innerHTML = `¡BlackJack! Has ganado`;
    bpedir.style.display = "none";
    bprepartir.style.display = "none";
    bplantarse.style.display = "none";
    bplayagain.style.display = "inline";
  }

  //puntos crupier
  calculoCrupier();
  if (puntosCrupier === 21) {
    resultado.innerHTML = `¡BlackJack! Has perdido`;
    bpedir.style.display = "none";
    bprepartir.style.display = "none";
    bplantarse.style.display = "none";
    bplayagain.style.display = "inline";
  }
  pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  cCrup.innerHTML +=
    cCrupier1.valor +
    ` de ` +
    cCrupier1.palo +
    ` | ` +
    cCrupier2.valor +
    ` de ` +
    cCrupier2.palo;
  pJug.innerHTML = "Puntuación jugador: " + puntosJugador;
  cJug.innerHTML +=
    cJugador.valor +
    ` de ` +
    cJugador.palo +
    ` | ` +
    cJugador2.valor +
    ` de ` +
    cJugador2.palo +
    ` `;
  bpedir.style.display = "";
  brepartir.style.display = "none";
  bplantarse.style.display = "";
  comprobar();
}
////////////////////////////////
////////////////////////////////PEDIRCARTA
////
function pedirCarta() {
  let cJugador = baraja[indiceCarta];
  cartasJugador.push(cJugador);
  indiceCarta++;
  // puntosJugador += cJugador.valor;
  function calculoJugador2() {
    if (cJugador.valor >= 10) {
      puntosJugador += 10;
    } else {
      puntosJugador += cJugador.valor;
    }
  }

  calculoJugador2();

  cJug.innerHTML += ` | ` + cJugador.valor + ` de ` + cJugador.palo;
  pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  pJug.innerHTML = "Puntuación jugador: " + puntosJugador;

  if (puntosCrupier < 16) {
    let cCrupier1 = baraja[indiceCarta];
    cartasCrupier.push(cCrupier1);
    indiceCarta++;
    //puntosCrupier += cCrupier1.valor;
    function calculoCrupier2() {
      if (cCrupier1.valor >= 10) {
        puntosCrupier += 10;
      } else {
        puntosCrupier += cCrupier1.valor;
      }
    }

    calculoCrupier2();

    cCrup.innerHTML += ` | ` + cCrupier1.valor + ` de ` + cCrupier1.palo;
    pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  }
  comprobar();
}
/////
///////////////////////////
////

function comprobar() {
  if (puntosJugador > 21) {
    resultado.innerHTML = `¡Has perdido! te has pasado`;

    bplayagain.style.display = "inline";
    brepartir.style.display = "none";
    bpedir.style.display = "none";
    bplantarse.style.display = "none";
  }
  if (puntosCrupier > 21) {
    resultado.innerHTML = `¡Has ganado!el crupier se ha pasado`;

    bplayagain.style.display = "inline";
    brepartir.style.display = "none";
    bpedir.style.display = "none";
    bplantarse.style.display = "none";
  }
}

function plantarse() {
  if (puntosCrupier < 16) {
    let cCrupier1 = baraja[indiceCarta];
    cartasCrupier.push(cCrupier1);
    indiceCarta++;
    puntosCrupier += cCrupier1.valor;
    cCrup.innerHTML += ` | ` + cCrupier1.valor + ` de ` + cCrupier1.palo;
    pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  }
  comprobar();
  if (puntosCrupier < 16) {
    let cCrupier1 = baraja[indiceCarta];
    cartasCrupier.push(cCrupier1);
    indiceCarta++;
    puntosCrupier += cCrupier1.valor;
    cCrup.innerHTML += ` | ` + cCrupier1.valor + ` de ` + cCrupier1.palo;
    pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  }
  comprobar();
  if (puntosJugador > puntosCrupier) {
    resultado.innerHTML = `¡Has ganado!`;
    bplayagain.style.display = "inline";
    bplantarse.style.display = "none";
    bpedir.style.display = "none";
  }
  if (puntosJugador < puntosCrupier) {
    resultado.innerHTML = `¡Has perdido!`;
    bplayagain.style.display = "inline";
    bplantarse.style.display = "none";
    bpedir.style.display = "none";
  }
  if (puntosJugador === puntosCrupier) {
    resultado.innerHTML = `¡Empate!`;
    bplayagain.style.display = "inline";
    bplantarse.style.display = "none";
    bpedir.style.display = "none";
  }
}

function playagain() {
  location.reload(true);
}
