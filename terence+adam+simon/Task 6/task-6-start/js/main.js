window.onload = run;


function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


 /****** PART A:: FETCH */  

 
 async function fetchText() {
    console.log("in fetch");
    //let raw_rainbow_text = "";
    try {
      let response =await fetch('files/rainbow.txt');
      let raw_rainbow_text = await response.text();
      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      document.querySelector("#stepOneButton").style.display="none";
      document.querySelector("#inputDiv").style.display ="block";
      document.querySelector("#rainbow_text").textContent = raw_rainbow_text;
      runPartB(raw_rainbow_text);

    } catch (e) {
      console.log(e)
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
      let input = document.querySelector("#phrase").value;
      let phrase_as_array = input.split(/[\s.!?\n]+/);
      let rainbow_tokens= originalRainBowText.split(/[\s.!?\n]+/);

      
        runPartC(rainbow_tokens, phrase_as_array); 
      } 
    }
  


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    console.log(rainbow_words);
    console.log(seed_phrase_array);

    let poem_sentence ="";

    for (let word of seed_phrase_array){
      let matched_word = "";

      for(let i =0; i< word.length; i++){
        let letter = word[i];

        let match = rainbow_words.find(
          rainbow_word=>rainbow_word.length>i&& rainbow_word[i]===letter
      );

      matched_word += match ? match + " " : word +" ";

    }

    poem_sentence += matched_word.trim()+" ";
  }

  //visuallizes the poem in the rainbow text raw window (should not be shown)
    // document.querySelector("#rainbow_text").textContent = poem_sentence.trim();

 
    //to next stage
    runPartD(poem_sentence);
  }

  
   /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence){
   

    let outputDiv = document.querySelector("#output");
    outputDiv.style.display ="block";

    outputDiv.innerHTML = "";

    new_sentence.split("").forEach((char, index) => {
      let span = document.createElement("span");
      span.textContent = char;

      span.style.fontSize = `${Math.random()*15+20}px`;
      span.style.color = `hsl(0, 0%, ${Math.random()*100}%)`; 
      span.style.margin = "5px";
      span.style.display = "inline-block";
      span.style.transition = "transform 0.2s ease-in-out";
      span.style.position = "absolute";
      span.style.characterSize = "normal"

      

      span.addEventListener("mousedown", () => {

        if (span.style.characterSize === "normal" || span.style.characterSize === "small") {
        span.style.transform = "scale(15)";
        } else if (span.style.characterSize === "big") {

          span.style.transform = "scale(4)"

        }

      });

      span.addEventListener("mouseup", ()=> {

        if (span.style.characterSize === "big") {

        span.style.transform = "scale(0.7)";
        span.style.characterSize = "small"
        span.style.color = `hsl(${Math.random()*65+180}, 100%, 50%)`;
       

        } else if (span.style.characterSize === "normal" || span.style.characterSize === "small") {

          span.style.transform = "scale(2.5)";
          span.style.characterSize = "big"
          span.style.color = `hsl(${Math.random()*58}, 100%, 50%)`;
          

        } 

      });

      outputDiv.appendChild(span);

      const moveRandomly = () => {
        const maxX = outputDiv.clientWidth - span.offsetWidth;
        const maxY = outputDiv.clientHeight - span.offsetHeight;  

        const newX = Math.random()*maxX;
        const newY = Math.random()*maxY;

        span.style.left =`${newX}px`;
        span.style.top = `${newY}px`;
      };
      setInterval(moveRandomly, 200);
      moveRandomly();
    });




  }

  /****** PART E:: RESET  */
  function resetPoem() {
  /*** TO FILL IN */

  //delete the poem's visualisation
 let deletedElement = document.querySelector("#output");

 deletedElement.replaceChildren();

 console.log(deletedElement)

 
//delet the imput
 let phrase = document.querySelector("#phrase")

 phrase.value = "";
  
 console.log(phrase);

  }

  
} //window onload


