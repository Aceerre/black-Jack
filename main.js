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

  //calculamos puntos jugador por posible blackjack o +21
  for (let i in cartasJugador) {
    puntosJugador += cartasJugador[i].valor;
  }
  if (puntosJugador === 21) {
    resultado.innerHTML = `¡BlackJack! Has ganado`;
  }
  if (puntosJugador > 21) {
    resultado.innerHTML = `¡Has perdido! te has pasado`;
  }
  //puntos crupier
  for (let i in cartasCrupier) {
    puntosCrupier += cartasCrupier[i].valor;
  }
  pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  cCrup.innerHTML = JSON.stringify(cartasCrupier);
  pJug.innerHTML = "Puntuación jugador: " + puntosJugador;
  cJug.innerHTML = JSON.stringify(cartasJugador);
}
////////////////////////////////
////////////////////////////////PEDIRCARTA
////
function pedirCarta() {
  let cJugador = baraja[indiceCarta];
  cartasJugador.push(cJugador);
  indiceCarta++;

  for (let i in cartasJugador) {
    puntosJugador += cartasJugador[i].valor;
  }
  if (puntosJugador > 21) {
    resultado.innerHTML = `¡Has perdido! te has pasado`;
  }

  if (puntosCrupier < 16) {
    let cCrupier1 = baraja[indiceCarta];
    cartasCrupier.push(cCrupier1);
    indiceCarta++;
    for (let i in cartasCrupier) {
      puntosCrupier += cartasCrupier[i].valor;
    }
  }
  cJug.innerHTML = JSON.stringify(cartasJugador);
  cCrup.innerHTML = JSON.stringify(cartasCrupier);
  pCrup.innerHTML = "Puntuación crupier: " + puntosCrupier;
  pJug.innerHTML = "Puntuación jugador: " + puntosJugador;
  console.log(cartasCrupier);
  console.log(cartasJugador);
}
/////
///////////////////////////
////

function playagain() {
  location.reload(true);
}

///FUNCION BOTONES
document.getElementById("brepartir").addEventListener("click", () => {
  repartir();
  console.log(cartasCrupier);
});
document.getElementById("bpedircarta").addEventListener("click", () => {
  pedirCarta();
});
document.getElementById("bplayagain").addEventListener("click", () => {
  playagain();
});
