// Word Category
const wordCategories = {
  fruits: ["banana", "apple", "cherry", "grape", "mango", "orange", "peach", "pear", "kiwi", "papaya",
            "melon", "watermelon", "coconut", "pineapple", "blueberry", "strawberry", "blackberry",
            "guava", "lychee", "durian", "jackfruit", "lime", "lemon", "passionfruit", "dragonfruit",
            "grapefruit", "starfruit", "avocado" ],
  animals: ["elephant", "giraffe", "kangaroo", "tiger", "lion", "zebra", "leopard", "panda", "monkey","gorilla",
            "rabbit", "deer", "wolf", "fox", "donkey","horse", "cow", "goat", "sheep", "pig","dog", "cat", "shark",
            "octopus", "penguin", "seal", "eagle", "owl", "parrot", "duck", "goose","chicken", "panther", "jellyfish", "starfish" ],
  countries: ["malaysia", "japan", "brazil", "canada", "france", "germany", "italy", "spain", "australia",
              "india", "china", "korea", "indonesia", "thailand", "vietnam", "singapore", "myanmar",
              "laos", "brunei", "pakistan", "bangladesh", "russia", "poland", "norway", "finland",
              "austria", "england", "mexico", "nigeria", "southafrica", "turkey", "denmark" ]
};

let randomWord = "";
let guessedWord = [];
let lives = 6;  //live
let ctx;

// BGM
 window.addEventListener('load', () => {
      const audio = document.getElementById('bgm');
      setTimeout(() => {
        audio.muted = false;
      }, 1000);
    });


// Start Game
function startGame() {
  document.getElementById('bgm').play();
  const category = document.getElementById("category").value;
  const words = wordCategories[category];
  randomWord = words[Math.floor(Math.random() * words.length)];

  guessedWord = Array(randomWord.length).fill("_");
  lives = 6;
  guessedLetters = [];

  document.getElementById("word").innerText = guessedWord.join(" ");
  document.getElementById("lives").innerText = lives;
  document.getElementById("message").innerText = "";
  document.getElementById("game").style.display = "block";
  document.getElementById("guessedLetters").innerText = "";

  // initialize canvas
  const canvas = document.getElementById("hangmanCanvas");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBase();
}

// submit guesses
let guessedLetters = [];

function checkGuess() {
  let input = document.getElementById("guess").value.toLowerCase();
  let message = document.getElementById("message");
  let correct = false;

  if (!input.match(/[a-z]/) || input.length !== 1) {
    message.innerText = "❌ Please enter a valid letter！";
    return;
  }

  if (guessedLetters.includes(input)) {
    message.innerText = `⚠️ You already guessed the letter "${input}". Please try another letter！`;
    document.getElementById("guess").value = "";
    return;
  } else {
    guessedLetters.push(input); // record the letter
  }

  document.getElementById("guessedLetters").innerText = guessedLetters.join(", ").toUpperCase();

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === input && guessedWord[i] === "_") {
      guessedWord[i] = input;
      correct = true;
    }
  }

  document.getElementById("word").innerText = guessedWord.join(" ");

  if (!correct) {
    lives--;
    document.getElementById("lives").innerText = lives;
    drawHangman();
  }

  if (guessedWord.join("") === randomWord) {
    message.innerHTML = '<span style="color: limegreen;">🎉 Congratulation, You guessed the right word!</span>';
  } else if (lives <= 0) {
    message.innerHTML = `<span style="color: red;">💀 Game Over! The word was: ${randomWord}</span>`;
  }

  document.getElementById("guess").value = "";
}

// restart
function restartGame() {
  const category = document.getElementById("category").value;
  const words = wordCategories[category];
  randomWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(randomWord.length).fill("_");
  guessedLetters = []; // reset the guessed letter
  lives = 6;

  document.getElementById("word").innerText = guessedWord.join(" ");
  document.getElementById("lives").innerText = lives;
  document.getElementById("message").innerText = "";
  document.getElementById("guessedLetters").innerText = "";

  const canvas = document.getElementById("hangmanCanvas");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBase();
}

// Hangman drawing functions
function drawBase() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(10, 180);
  ctx.lineTo(190, 180); // ground
  ctx.moveTo(50, 180);
  ctx.lineTo(50, 20);   // vertical pole
  ctx.lineTo(130, 20);  // transom
  ctx.lineTo(130, 40);  // Lifting point
  ctx.stroke();
}

function drawHangman() {
  switch (lives) {
    case 5: // head
      ctx.beginPath();
      ctx.arc(130, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4: // body
      ctx.beginPath();
      ctx.moveTo(130, 80);
      ctx.lineTo(130, 130);
      ctx.stroke();
      break;
    case 3: // left hand
      ctx.beginPath();
      ctx.moveTo(130, 90);
      ctx.lineTo(100, 110);
      ctx.stroke();
      break;
    case 2: // right hand
      ctx.beginPath();
      ctx.moveTo(130, 90);
      ctx.lineTo(160, 110);
      ctx.stroke();
      break;
    case 1: // left leg
      ctx.beginPath();
      ctx.moveTo(130, 130);
      ctx.lineTo(110, 160);
      ctx.stroke();
      break;
    case 0: // right leg
      ctx.beginPath();
      ctx.moveTo(130, 130);
      ctx.lineTo(150, 160);
      ctx.stroke();
      break;
  }
}
