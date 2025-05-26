// script.js

const palavras = ['luca', 'cachai', 'cabro', 'carabineiro'];

let indicePalavraAtual = 0;
let palavraAtual = palavras[indicePalavraAtual].toLowerCase();
let letrasCorretas = [];
let letrasErradas = [];
const maxErros = 6;

const palavraElemento = document.getElementById('palavra');
const letrasErradasElemento = document.getElementById('letras-erradas');
const mensagemElemento = document.getElementById('mensagem');

const bonequinhoPartes = [
  document.querySelector('.forca-cabeca'),
  document.querySelector('.forca-corpo'),
  document.querySelector('.forca-braco-esq'),
  document.querySelector('.forca-braco-dir'),
  document.querySelector('.forca-perna-esq'),
  document.querySelector('.forca-perna-dir'),
];

const tecladoDiv = document.getElementById('teclado');

let jogoEncerrado = false;

// Cria teclado virtual com botões A-Z
function criarTeclado() {
  const letras = 'abcdefghijklmnopqrstuvwxyz';
  tecladoDiv.innerHTML = ''; // limpa
  for (let letra of letras) {
    const botao = document.createElement('button');
    botao.textContent = letra.toUpperCase();
    botao.id = `tecla-${letra}`;
    botao.addEventListener('click', () => letraClicada(letra));
    tecladoDiv.appendChild(botao);
  }
}

// Quando clica numa letra do teclado virtual
function letraClicada(letra) {
  if (jogoEncerrado) return;

  // Desabilita o botão da letra clicada
  const botao = document.getElementById(`tecla-${letra}`);
  botao.disabled = true;

  if (palavraAtual.includes(letra)) {
    if (!letrasCorretas.includes(letra)) {
      letrasCorretas.push(letra);
    }
  } else {
    if (!letrasErradas.includes(letra)) {
      letrasErradas.push(letra);
      mostrarParteBonequinho();
    }
  }

  atualizarPalavraNaTela();
  atualizarLetrasErradas();
  verificarVitoria();
  verificarDerrota();
}

function mostrarParteBonequinho() {
  const erros = letrasErradas.length;
  if (erros <= maxErros) {
    bonequinhoPartes[erros - 1].style.display = 'block';
  }
}

function atualizarPalavraNaTela() {
  const exibicao = palavraAtual
    .split('')
    .map(letra => (letrasCorretas.includes(letra) ? letra : '_'))
    .join(' ');
  palavraElemento.textContent = exibicao;
}

function atualizarLetrasErradas() {
  letrasErradasElemento.textContent = letrasErradas.join(', ');
}

function verificarVitoria() {
  const todasLetrasDescobertas = palavraAtual
    .split('')
    .every(letra => letrasCorretas.includes(letra));

  if (todasLetrasDescobertas) {
    mensagemElemento.textContent = '🎉 Você acertou!';
    jogoEncerrado = true;
    desabilitarTeclado();
  }
}

function verificarDerrota() {
  if (letrasErradas.length >= maxErros) {
    mensagemElemento.textContent = `💀 Você perdeu! A palavra era: ${palavraAtual}`;
    jogoEncerrado = true;
    desabilitarTeclado();
  }
}

function desabilitarTeclado() {
  const botoes = tecladoDiv.querySelectorAll('button');
  botoes.forEach(botao => (botao.disabled = true));
}

function proximaPalavra() {
  indicePalavraAtual = (indicePalavraAtual + 1) % palavras.length;
  palavraAtual = palavras[indicePalavraAtual].toLowerCase();
  letrasCorretas = [];
  letrasErradas = [];
  mensagemElemento.textContent = '';
  jogoEncerrado = false;

  // Esconde todas as partes do bonequinho
  bonequinhoPartes.forEach(parte => (parte.style.display = 'none'));

  atualizarPalavraNaTela();
  atualizarLetrasErradas();
  criarTeclado();
}

// Inicializa o jogo
criarTeclado();
atualizarPalavraNaTela();
