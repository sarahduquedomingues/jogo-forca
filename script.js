const palavras = ['mequetrefe', 'escarnio', 'prolixo'];

let indicePalavraAtual = 0;
let palavraAtual = palavras[indicePalavraAtual].toLowerCase();
let letrasCorretas = [];
let letrasErradas = [];
const maxErros = 6; // ✅ Limite de erros

const palavraElemento = document.getElementById('palavra');
const letrasErradasElemento = document.getElementById('letras-erradas');

const mensagemElemento = document.createElement('p');
mensagemElemento.id = 'mensagem';
document.body.appendChild(mensagemElemento);

// ✅ Função que atualiza a palavra mostrada
function atualizarPalavraNaTela() {
  const exibicao = palavraAtual
    .split('')
    .map(letra => (letrasCorretas.includes(letra) ? letra : '_'))
    .join(' ');
  palavraElemento.textContent = exibicao;
}

// ✅ Função que atualiza as letras erradas mostradas
function atualizarLetrasErradas() {
  letrasErradasElemento.textContent = letrasErradas.join(', ');
}

// ✅ Verifica se ganhou
function verificarVitoria() {
  const todasLetrasDescobertas = palavraAtual
    .split('')
    .every(letra => letrasCorretas.includes(letra));

  if (todasLetrasDescobertas) {
    mensagemElemento.textContent = '🎉 Você acertou!';
    jogoEncerrado = true;
  }
}

// ✅ Verifica se perdeu
function verificarDerrota() {
  if (letrasErradas.length >= maxErros) {
    mensagemElemento.textContent = `💀 Você perdeu! A palavra era: ${palavraAtual}`;
    jogoEncerrado = true;
  }
}

let jogoEncerrado = false; // flag para travar o jogo depois de ganhar ou perder

// ✅ Muda para a próxima palavra
function proximaPalavra() {
  indicePalavraAtual = (indicePalavraAtual + 1) % palavras.length;
  palavraAtual = palavras[indicePalavraAtual].toLowerCase();
  letrasCorretas = [];
  letrasErradas = [];
  mensagemElemento.textContent = '';
  jogoEncerrado = false;
  atualizarPalavraNaTela();
  atualizarLetrasErradas();
}

// ✅ Detecta letras digitadas
document.addEventListener('keydown', event => {
  if (jogoEncerrado) return; // trava se o jogo já acabou

  const letra = event.key.toLowerCase();

  if (letra.match(/[a-z]/) && letra.length === 1) {
    if (palavraAtual.includes(letra)) {
      if (!letrasCorretas.includes(letra)) {
        letrasCorretas.push(letra);
      }
    } else {
      if (!letrasErradas.includes(letra)) {
        letrasErradas.push(letra);
      }
    }

    atualizarPalavraNaTela();
    atualizarLetrasErradas();
    verificarVitoria();
    verificarDerrota();
  }
});

atualizarPalavraNaTela();
