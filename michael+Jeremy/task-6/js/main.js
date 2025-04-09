window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


 /****** PART A:: FETCH */  
 async function fetchText() {
    console.log("in fetch");
    try {
      const response = await fetch("./files/rainbow.txt");
      const raw_rainbow_text = await response.text();

      document.querySelector('#stepOneButton').style.display = 'none';
      document.querySelector('#inputDiv').style.display = 'block';
      document.querySelector('#rainbow_text').textContent = raw_rainbow_text;


      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);
    } catch (e) {console.log(e)}
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

   /* FILL IN HERE */
    function producePoem() {
      try{
      console.log(originalRainBowText)
      const phrase = document.querySelector("#phrase").value;
      const newDelimiter = /[.?! |\n]/

      const splitSentences =  phrase.split(newDelimiter);
      const phrase_as_array = splitSentences.filter((x) => {return !(x == "")});


      const dirty_rainbow_tokens = originalRainBowText.split(newDelimiter);
      const rainbow_tokens = dirty_rainbow_tokens.filter((x) => {return !(x == "")});
      
      //SR
      runPartC(rainbow_tokens, phrase_as_array);
      } catch(e){console.log(e)}
    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    try{
    console.log(rainbow_words);
    console.log(seed_phrase_array);
    
    let poem_sentence = "";
    let nextChar = "";

    for (let i = 0; i < seed_phrase_array.length; i++) { // each word in phrase array
      nextChar = seed_phrase_array[i];
      for (let index = 0; index < nextChar.length; index++){ // each character in word
        let currentChar = nextChar[index];
        for(let word of rainbow_words){ // each word in input/rainbow text
          if (word[index] == currentChar){
            poem_sentence += `${word} `;
            break;
          }
        }
      }
    }
    
    poem_sentence = poem_sentence.substring(0, poem_sentence.length - 1);

    //to next stage
    runPartD(poem_sentence);
    } catch(e){console.log(e)}
  }

  
   /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence){
    try{
    document.querySelector("#output").style.display = "flex";
    let output = document.querySelector("#output");
    output.attributes.style.value = "width: 100%; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; flex-basis: 0; position: relative; overflow: hidden;";
    output.style.display = "flex";
    
    let character_list = [];

    let isRandomized = false;

    output.addEventListener("mouseenter", ()=>{
      console.log("entered container");
      if (!isRandomized) {
        const containerRect = output.getBoundingClientRect();
        for (let i = 0; i < character_list.length; i++){
          character_list[i].moveToRandom(containerRect);
        }
        isRandomized = true;
      }
    });

    output.addEventListener("mousemove", (e) => {
      for (let i = 0; i < character_list.length; i++){
        character_list[i].moveWithParallax(e);
      }
    });

    output.addEventListener("mouseleave", () => {
      for (let i = 0; i < character_list.length; i++){
        character_list[i].returnToOriginal();
      }
      isRandomized = false;
    });

    class Character {
      constructor(char){
        this.char = char;
        this.color = colorGenerator();
        this.reference;
        this.initialPos;
        this.originalTop = 0;
        this.originalLeft = 0;
        this.randomPos = [0, 0];
      }
 
      moveToRandom(containerRect){
        try{
          if (this.reference == undefined){
            return;
          }

          // store initial position
          if (!this.initialPos) {
            const rect = this.reference.getBoundingClientRect();
            this.initialPos = rect;
            this.originalTop = rect.top;
            this.originalLeft = rect.left;
          }

          // calculate random positions within the container
          this.randomPos = [
            Math.floor(Math.random() * (containerRect.height)), 
            Math.floor(Math.random() * (containerRect.width))
          ];

          this.reference.style.position = "absolute";
          this.reference.style.top = `${this.randomPos[0]}px`;
          this.reference.style.left = `${this.randomPos[1]}px`;
          this.reference.style.zIndex = "1";
        } catch(e){
          console.log(e);
        }
      }

      moveWithParallax(e) {
        try {
          if (!this.reference || !this.initialPos) return;
          
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          // get container dimensions and position
          const container = document.querySelector("#output");
          const containerRect = container.getBoundingClientRect();
          
          // relative mouse position within container
          const relX = mouseX - containerRect.left;
          const relY = mouseY - containerRect.top;

          const centerX = containerRect.width / 2;
          const centerY = containerRect.height / 2;
          
          // percentage from center (-1 to 1)
          const percentX = (relX - centerX) / centerX;
          const percentY = (relY - centerY) / centerY;
          
          // movement amount based on character position (creates depth)
          const index = character_list.indexOf(this);
          const depth = (index % 5) + 1; // 1-5 depth factor
          
          // limit movement to container boundaries
          const maxOffset = 20;
          const offsetX = percentX * maxOffset * (depth / 5);
          const offsetY = percentY * maxOffset * (depth / 5);
          
          this.reference.style.transition = "transform 0.2s ease-out";
          this.reference.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } catch(e) {
          console.log(e);
        }
      }
      
      returnToOriginal() {
        try {
          if (!this.reference) return;
          
          this.reference.style.position = "";
          this.reference.style.top = "";
          this.reference.style.left = "";
          this.reference.style.transform = "";
          this.reference.style.zIndex = "";
          
        } catch(e) {
          console.log(e);
        }
      }
    }

    for (let i = 0; i < new_sentence.length; i++){
      const newCharacter = new Character(new_sentence[i], [Math.random(), Math.random()]);
      character_list.push(newCharacter);
      addCharacter(newCharacter);
    }

    
    function addCharacter(character){
      const newElement = document.createElement("div");
      character.reference = newElement;

      // Make spaces visible by giving them a special representation
      if (character.char === ' ') {
        newElement.innerHTML = '&nbsp;'; // Non-breaking space
        newElement.style.width = '10px'; // Give space a width
        newElement.style.height = '10px'; // Give space a height
        newElement.style.border = '1px dashed rgba(200,200,200,0.5)'; // Show a border for spaces
        newElement.style.borderRadius = '50%';
        newElement.style.margin = '3px';
      } else {
        newElement.innerHTML = character.char;
      }
      
      newElement.style.color = `rgb(${character.color[0]},${character.color[1]},${character.color[2]})`
      output.appendChild(newElement);
    }
    

    function colorGenerator(){
      try{
      const green = ((Math.random() * 127.5) * 2);        
      const blue = ((Math.random() * 127.5) * 2);
      return [255,green,blue];
      }catch(e){console.log(e)}
    }

  }catch(e){console.log(e)}
  }



  /****** PART E:: RESET  */
  function resetPoem() {
  /*** TO FILL IN */
  const outputID = document.querySelector("#output");
  outputID.innerHTML = "";
  outputID.style.display = "none";
  
  
  document.querySelector("#phrase").value = "";
  }
} //window onload


