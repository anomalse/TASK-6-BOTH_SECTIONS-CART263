window.onload = run;
// window.onload = goFetch;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");
    let raw_rainbow_text = "";
    let everythingWorks = true
    try {
      //taken from lecture notes
      let response = await fetch('../files/rainbow.txt'); //response
      let textRainbow = await response.text();
      console.log(textRainbow);
      //Working correctly, printing to console

      document.querySelector("#stepOneButton").style.display = "none";
      console.log("Button hidden");
      //working

      // display div
      document.querySelector("#inputDiv").style.display = "block";
      console.log("Input div displayed");
      //working

      //add content
      document.querySelector("#rainbow_text").textContent = textRainbow;
      console.log("Rainbow text displayed");

      //using raw_rainbow_text not working????
      raw_rainbow_text = textRainbow;

      //running part B
      if (everythingWorks == true) {
        document.querySelector("#resetButton").addEventListener("click", resetPoem);
        runPartB(raw_rainbow_text);
        console.log("runningB");
      }

    } catch (e) {
      console.error("An error occurred:", e);
      everythingWorks = false
    }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    let everythingWorksB = true
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    /* FILL IN HERE */
    function producePoem() {
      try {
        //getting the user input
        let inputText = document.querySelector("#phrase")
        let newDelimiter = /[ .?!\n]/;
        let phrase_as_array = inputText.value.split(newDelimiter);
        console.log('got input');

        //Using the split() function split on spaces(" "), fullstops(.), exclamation marks(!),
        // question marks(?) and newline chars (\n). The result will be an array called phrase_as_array

        // SPLIT: Take the fetched text labelled here as originalRainBowText and split the text using the same rules as above. The result will be an array called rainbow_tokens
        let rainbow_tokens = originalRainBowText.split(newDelimiter);
        if (everythingWorksB == true) {
          runPartC(rainbow_tokens, phrase_as_array);
          console.log("runningC");
        }

      } catch (e) {
        console.error("An error occurred:", e);
        everythingWorksB = false
      }
    }

  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    console.log(rainbow_words);
    console.log(seed_phrase_array);

    //ITERATE OVER the seed_phrase_array and extract the next word in the sequence and save as nextChar
    // FOR EACH CHARACTER in this word nextChar, find the next word in the rainbow_tokens array whose word has nextChar in the SAME position as in the current word from the seed phrase:
    //     EXAMPLE:
    // First letter in the first word of the seed phrase is 'a' -> find the word in the rainbow_tokens whose word starts with 'a'
    // Second letter in the first word of the seed phrase is 'p' -> find the word in the rainbow_tokens whose word has the letter 'p' in the SECOND position
    // Third letter in the first word of the seed phrase is 'q' -> find the word in the rainbow_tokens whose word has the letter 'q' in the THIRD position
    // Continue until you get to the end of the first word ...then:
    // Go onto the second word in the seed phrase:
    // First letter in the second word of the seed phrase is 't' -> find the word in the rainbow_tokens whose word starts with 't' ......
    // Continue char for char and word for word until you get to the end of the seed phrase
    // Incrementally save the resulting found words in a string called poem_sentence with spaces between each found word.
    //       HINT:
    // You will need to loop through each word in the seed_phrase array
    //     then -> access the word and iterate over the characters
    //     then -> check for in the rainbow words for a match...
    // ONLY RUN runPartD(poem_sentence); upon success of all sub tasks above.

    // same variable as usual, he's back
    let everythingWorksC = true;

    //initialize
    let poem_sentence = "";

    /* FILL IN HERE */

    try {
      // loop for input text
      for (let wordIndex = 0; wordIndex < seed_phrase_array.length; wordIndex++) {
        // track current word
        let currentSeedWord = seed_phrase_array[wordIndex];

        // For each word, start another loop to process each character inside
        for (let charIndex = 0; charIndex < currentSeedWord.length; charIndex++) {
          // track current character
          let currentChar = currentSeedWord[charIndex]; //searching within current word
          // Initialize to store the word found
          let nextChar = "";

          // Third loop to search through all words in the rainbow text
          for (let rainbowIndex = 0; rainbowIndex < rainbow_words.length; rainbowIndex++) {
            // track current word
            let rainbowWord = rainbow_words[rainbowIndex];

            // Check if given rainbow word has the same character at the same position
            // check length then check character match
            if (rainbowWord.length > charIndex && rainbowWord[charIndex] === currentChar) {
              // If there's a match, store
              nextChar = rainbowWord;
              break; //done if we found a match??? I think
            }
          }

          // when match is found, adding it to the poem + adding a space
          if (nextChar) {
            poem_sentence += nextChar + " ";
          }
        }
      }
      //This was hard...

      if (everythingWorksC == true) {
        runPartD(poem_sentence);
        console.log("runningD");
      }

    } catch (e) {
      console.error("An error occurred:", e);
      everythingWorksC = false
    }

  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {

    // Unhide the output div
    document.querySelector("#output").style.display = "block";

    // Get reference 
    const outputElement = document.querySelector("#output");

    // Clear any existing content in the output so it doesn't add when you press the button again
    outputElement.innerHTML = "";

    // Iterate over each character
    for (let i = 0; i < new_sentence.length; i++) {
      // Create a span for each character so I can customize it
      const charSpan = document.createElement("span");

      // Set the character as the content
      charSpan.textContent = new_sentence[i];

      //styling

      //Random color, using HSL for better color variety just because
      const hue = Math.floor(Math.random() * 360);
      const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
      const lightness = 40 + Math.floor(Math.random() * 40);  // 40-80%
      charSpan.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      //Random size (between 14px and 28px)
      const fontSize = 14 + Math.floor(Math.random() * 15);
      charSpan.style.fontSize = `${fontSize}px`;

      //Random fontfrom below
      const fonts = [
        "'Arial'",
        "'Times New Roman'",
        "'Courier New'",
        "'Georgia'",
        "'Verdana'"
      ];
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      charSpan.style.fontFamily = randomFont;

      // Add hover increase size and shadow
      charSpan.onmouseover = function () {
        this.style.transform = "scale(1.5)";
        this.style.textShadow = "0 0 5px rgba(0,0,0,0.5)";
      };

      //go back to normal
      charSpan.onmouseout = function () {
        this.style.transform = `rotate(${Math.floor(Math.random() * 20 - 10)}deg)`;
        this.style.textShadow = "none";
      };

      // Append as a child of the output to see changes
      outputElement.appendChild(charSpan);
    }
  }

  /****** PART E:: RESET  */
  function resetPoem() {
    /*** TO FILL IN */

    //You will see in the fetchText() - we activate the event listener for the reset Button . It has a callback function called resetPoem. 
    // So your job here is to reset the following within that function:
    // CLEAR the html from the element with id output
    // HIDE the element with id output
    // CLEAR the value of the input field with id phrase
    // CLEAR any other elements and values based on your visualization

    // Clearing the output, setting to blank
    document.querySelector("#output").innerHTML = "";

    // Hiding the output element
    document.querySelector("#output").style.display = "none";

    // Clearing input same as output
    document.querySelector("#phrase").value = "";

    console.log("Resetted yeeee");
    //Reset working and redoing properly
  }
} //window onload
