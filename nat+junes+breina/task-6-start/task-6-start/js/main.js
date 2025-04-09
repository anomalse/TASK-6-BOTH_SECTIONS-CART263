window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);

  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");

    try {
      let response = await fetch("files/rainbow.txt"); //response
      let raw_rainbow_text = await response.text();
      //console.log(raw_rainbow_text)

      document.getElementById('stepOneButton').style.display = 'none';
      document.getElementById('inputDiv').style.display = 'block';
      document.getElementById('rainbow_text').innerHTML = raw_rainbow_text;

      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);
    } catch (e) { }
  }

  //runPartB(raw_rainbow_text);

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    /* FILL IN HERE */
    function producePoem() {
      console.log(originalRainBowText)

      let phrase = document.getElementById('phrase').value

      const newDelimiter = /[\s.!?\n|]+/;
      const phrase_as_array = phrase.split(newDelimiter)
      const rainbow_tokens = originalRainBowText.split(newDelimiter)

      console.log("phrase as array:", phrase_as_array);
      console.log("rainbow text as array:", rainbow_tokens);

      runPartC(rainbow_tokens, phrase_as_array);
    }
  }

  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    console.log(rainbow_words);
    console.log("seed phrase as array:", seed_phrase_array);
    let poem_sentence = [];

    for (let i = 0; i < seed_phrase_array.length; i++) {
      let nextWord = seed_phrase_array[i];

      for (let j = 0; j < nextWord.length; j++) {
        let char = nextWord[j];
        let foundWord = checkMatch(char, j);
        console.log(foundWord);
        poem_sentence.push(foundWord);
      }
    }

    console.log(poem_sentence);

    function checkMatch(matchChar, j) {
      for (let k = 0; k < rainbow_words.length; k++) {
        let nextRainbowWord = rainbow_words[k];

        for (let l = 0; l < nextRainbowWord.length; l++) {
          let rainbowChar = nextRainbowWord[l];
          if (matchChar === rainbowChar && j === l) {
            return nextRainbowWord;
          }
        }
      }
      return null;
    }

    // to next stage
    runPartD(poem_sentence);
  }

  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {
    console.log(new_sentence)
    document.getElementById('output').style.display = 'block';

    new_sentence.forEach(foundWord => {
      if(foundWord!==null){
      for (let i = 0; i < foundWord.length; i++) {
        let foundChar = document.createElement("span");
        foundChar.textContent = foundWord[i];
        document.getElementById('output').appendChild(foundChar);
        foundChar.style.opacity = 1;
        
        foundChar.addEventListener("mouseover", function() {
          foundChar.style.fontSize = "90px";
          foundChar.style.opacity = 1;

          let fadeEffect = setInterval(function() {
            if (foundChar.style.opacity > 0) {
              foundChar.style.opacity -= 0.01;
              //console.log("heyyy");
            } else {
              clearInterval(fadeEffect);
              foundChar.style.opacity = 0;
            }
          }, 5);
        
        })
        foundChar.style.fontSize = Math.floor((Math.random() * 15) + 25)+"px";
   
      
      
      }
       
      }
    });
    


  }


  /****** PART E:: RESET  */
  function resetPoem() {
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').style.display = 'none';
    document.getElementById('phrase').value = '';
  }
} 