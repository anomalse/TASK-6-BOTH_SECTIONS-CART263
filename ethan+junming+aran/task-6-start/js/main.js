window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");
    let raw_rainbow_text = "";
    try {
      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      let response = await fetch("files/rainbow.txt");
      let raw_rainbow_text = await response.text();
      let words = textColor(raw_rainbow_text);
      //console.log(rainbowText);
      document.querySelector("#stepOneButton").style.display = "none";
      document.querySelector("#inputDiv").style.display = "block";
      //document.querySelector("#rainbow_text").textContent = raw_rainbow_text;
      document.querySelector("#rainbow_text").innerHTML = words;
      runPartB(raw_rainbow_text);
    } catch (e) { }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    /* FILL IN HERE */
    function producePoem() {
      //console.log(originalRainBowText)
      //get userInput
      let userInput = document.querySelector("#phrase").value;

      //split userInput 
      let phrase_as_array = userInput.split(/[.?!\n\s]/);
      //console.log(phrase_as_array);

      //split Text
      let rainbow_tokens = originalRainBowText.split(/[.?!\n\s]/);
      //console.log(rainbow_tokens);

      //SR
      runPartC(rainbow_tokens, phrase_as_array);

    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    //console.log(rainbow_words);
    //console.log(seed_phrase_array);

    let userInputLength = seed_phrase_array.length;
    let textLength = rainbow_words.length;
    let poem_sentence = "";

    for (let i = 0; i < userInputLength; i++) {
      let word = seed_phrase_array[i];
      let wordLength = word.length;
      for (let k = 0; k < wordLength; k++) {

        let nextChar = word.charAt(k);
        //console.log(nextChar);
        for (let j = 0; j < textLength; j++) {
          let textWord = rainbow_words[j];
          let textNextChar = textWord.charAt(k);
          //console.log(textNextChar);

          if (textNextChar === nextChar) {
            if (poem_sentence === "") {
              poem_sentence += textWord;
              break;
            }
            else {
              poem_sentence += " " + textWord;
              break;
            }
          }
        }

      }

    }
    //console.log(poem_sentence);


    //to next stage
    runPartD(poem_sentence);
  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {
    let outputDiv = document.querySelector("#output");
    outputDiv.style.display = "block";
    outputDiv.innerHTML = "";
    // new_sentence.split("").forEach((char, index) => {
    //   let span = document.createElement("span");
    //   span.textContent = char;
    //   span.style.color = randomColor();
    //   span.style.fontSize = `${Math.floor(Math.random() * 20) + 20}px`;
    //   output.appendChild(span);
    // })
    let delay = 0;
    for (let i = 0; i < new_sentence.length; i++) {
      let span = document.createElement("span");
      let char = new_sentence[i];

      span.textContent = char;
      span.style.color = randomColor();
      span.style.fontSize = `${Math.random() * 20 + 15}px`;
      span.style.fontWeight = Math.random() > 0.5 ? "bold" : "normal";
      span.style.opacity = "0";
      span.style.transition = "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
      span.style.display = "inline-block";

      // Add hover effect
      span.addEventListener("mouseover", function () {
        this.style.transform = "scale(1.5) rotate(10deg)";
        this.style.transition = "transform 0.2s ease-in-out";
      });
      span.addEventListener("mouseout", function () {
        this.style.transform = "scale(1) rotate(0)";
      });

      outputDiv.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
      }, delay);

      delay += 100;
    }
  }

  /****** PART E:: RESET  */
  function resetPoem() {
    /*** TO FILL IN */
    const output = document.getElementById("output");
    const phrase = document.getElementById("phrase");
    const stepOneButton = document.querySelector("#stepOneButton");
    const input = document.querySelector("#inputDiv");
    output.innerHTML = "";
    output.style.display = "none";
    phrase.value = "";
    stepOneButton.style.display = "";
    input.style.display = "none";
  }
} //window onload


function textColor(text) {
  let words = text.split(" ")
  let wordsLength = words.length;
  let colorWordArray = [];

  for (let i = 0; i < wordsLength; i++) {
    let coloredWord = `<span style="color: ${randomColor()}">${words[i]}</span>`;
    colorWordArray.push(coloredWord);
  }

  let result = colorWordArray.join(" ");
  return result;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`
}