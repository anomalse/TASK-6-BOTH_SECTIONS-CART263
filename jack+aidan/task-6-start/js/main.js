window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


 /****** PART A:: FETCH */  
 async function fetchText() {
    console.log("in fetch");
    let raw_rainbow_text = "";
    try {
      let response = await fetch("./files/rainbow.txt");
      let parsedResponse = await response.text();
      raw_rainbow_text = parsedResponse;
      console.log(raw_rainbow_text);
      document.getElementById('stepOneButton').style.display = 'none';
      document.getElementById('inputDiv').style.display = 'block';
      document.getElementById('rainbow_text').textContent = raw_rainbow_text;
      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);
    } catch (e) {
      console.log(e);
    }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

   /* FILL IN HERE */
    function producePoem() {
      console.log(originalRainBowText)
      let phraseInput = "";
      phraseInput = document.getElementById('phrase').value;
      console.log(phraseInput);
      const phrase_as_array =  phraseInput.split(/[ .!?,\n]/);
      const rainbow_tokens = originalRainBowText.split(/[ .!?,\n]/);
      console.log(phrase_as_array);
      console.log(rainbow_tokens);
      //SR
      runPartC(rainbow_tokens, phrase_as_array);

    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    console.log(rainbow_words);
    console.log(seed_phrase_array);
    let poem_sentence = "";

    for(let i = 0;i < seed_phrase_array.length; i++){
      console.log('in loop 1');
      
      let nextChar = seed_phrase_array[i];
      for (let k = 0; k < nextChar.length; k++){
        for (let j = 0; j < rainbow_words.length; j++){
          let nextChar2 = rainbow_words[j];
          if (nextChar2[k] == nextChar[k]){
            poem_sentence += nextChar2 + " "; //add to array
            console.log(nextChar2)
            console.log(poem_sentence)
            break;
          } 
        }  
      }
    }
    //to next stage
    runPartD(poem_sentence);
  }

  
   /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence){
    const outputElement = document.getElementById('output')
    outputElement.style.display = 'block';
    
    for(let i = 0;i < new_sentence.length; i++){
      //color 
      function random_rgba() {
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
      } 
      let colour = random_rgba();
      let colour2 = random_rgba();
      //create divs
      let newDiv = document.createElement('div');
      let newText = document.createTextNode(new_sentence[i]);
      outputElement.appendChild(newText);
      newDiv.appendChild(newText);
      outputElement.appendChild(newDiv);
      newDiv.style.background=(colour);
      newDiv.style.color=(colour2);
      //animation
      function animateDivs(){
        let moveX = 1
        let moveY = 1
        let left = newDiv.style.left + moveX
        let top = newDiv.style.top + moveY
        if (left <= 0 || left >= 1890 - 20) {
          moveX *= -1;
        }
        if (top <= 0 || top >= 645 - 20) {
          moveY *= -1;
        }
        newDiv.style.left = left + 'px';
        newDiv.style.top = top + 'px';
        
      }
      window.requestAnimationFrame(function(){
        animateDivs();
      });
      }

  }

  /****** PART E:: RESET  */
  function resetPoem() {
  /*** TO FILL IN */
  let outputDiv = document.getElementById('output')
  outputDiv.innerHTML = "";
  outputDiv.style.display = ('none');
  let inputPhrase = document.getElementById('phrase')
  inputPhrase.value = "";
  }
} //window onload


