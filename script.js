// Lista de palavras possíveis para o jogo
const palavras = ["banana", "laranja", "melancia", "abacaxi", "morango"];

// Número máximo de chances que o jogador tem para errar
const chancesMax = 6;

// Variável que vai controlar quantas chances ainda restam (começa no máximo)
let chancesRestantes = chancesMax;

// Seleciona aleatoriamente uma palavra da lista para o jogo atual
let palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];

// Array para armazenar as letras que o jogador acertou
let letrasCorretas = [];

// Array para armazenar as letras que o jogador errou
let letrasErradas = [];

// Seleciona elementos HTML para mostrar o estado do jogo na tela
const wordEl = document.getElementById("word"); // palavra com letras e underlines
const wrongLettersEl = document.getElementById("wrong-letters"); // letras erradas
const chancesEl = document.getElementById("chances"); // chances restantes
const messageEl = document.getElementById("message"); // mensagens (ganhou/perdeu)

// Função que mostra a palavra na tela, mostrando as letras que o jogador acertou
function mostrarPalavra() {
  // Para cada letra da palavra selecionada:
  // Se o jogador acertou a letra, mostra a letra
  // Se não, mostra "_"
  let displayWord = palavraSelecionada
    .split("") // transforma a palavra em array de letras
    .map(letra => (letrasCorretas.includes(letra) ? letra : "_")) // para cada letra, mostra letra ou "_"
    .join(" "); // junta tudo com espaço entre as letras para mostrar

  // Atualiza o conteúdo do elemento HTML com a palavra parcial
  wordEl.textContent = displayWord;

  // Se a palavra já está completa (sem "_"), jogador ganhou
  if (!displayWord.includes("_")) {
    messageEl.style.color = "green";
    messageEl.textContent = "Parabéns! Você venceu!";

    // Remove o evento de teclado para não aceitar mais letras depois de ganhar
    window.removeEventListener("keydown", handleKeydown);
  }
}

// Função que atualiza as letras erradas e as chances restantes na tela
function atualizarErros() {
  // Mostra as letras erradas separadas por vírgula
  wrongLettersEl.textContent = letrasErradas.join(", ");

  // Mostra quantas chances ainda restam
  chancesEl.textContent = chancesRestantes;

  // Se acabar as chances, o jogador perdeu
  if (chancesRestantes <= 0) {
    messageEl.style.color = "red";
    messageEl.textContent = `Você perdeu! A palavra era "${palavraSelecionada}".`;

    // Remove o evento de teclado para não aceitar mais letras depois de perder
    window.removeEventListener("keydown", handleKeydown);
  }
}

// Função que responde quando o jogador pressiona uma tecla no teclado
function handleKeydown(e) {
  const letra = e.key.toLowerCase(); // pega a letra digitada e transforma em minúscula

  // Verifica se a letra é uma letra do alfabeto (inclui letras com acento e ç) e só uma letra
  if (letra.match(/[a-záéíóúãõç]/) && letra.length === 1) {

    // Se a palavra contém a letra digitada
    if (palavraSelecionada.includes(letra)) {

      // Se a letra ainda não foi marcada como correta, adiciona nas letras corretas
      if (!letrasCorretas.includes(letra)) {
        letrasCorretas.push(letra);
        mostrarPalavra(); // atualiza a palavra na tela
      }

    } else {
      // Se a letra digitada não está na palavra

      // Se ainda não foi registrada como erro, adiciona na lista de letras erradas
      if (!letrasErradas.includes(letra)) {
        letrasErradas.push(letra);
        chancesRestantes--; // diminui as chances restantes
        atualizarErros(); // atualiza os erros e chances na tela
      }
    }
  }
}

// Mostra a palavra inicial (com todos "_")
mostrarPalavra();

// Mostra as chances e erros iniciais
atualizarErros();

// Adiciona o ouvinte para capturar as teclas digitadas pelo jogador
window.addEventListener("keydown", handleKeydown);
