window.onload = run;

function run() {
  // part D Website Re-design

  let image = document.createElement("img");
  let oneButton = document.querySelector("#stepOneButton");
  let inputCol = document.querySelector("#input-col");
  let phraseInput = document.querySelector("#phrase");
  let container = document.querySelector("#container");
  let resetButton = document.querySelector("#resetButton");
  let aniRef = null;

  image.src = "files/oracle.webp";
  image.style.position = "relative";
  image.style.width = 256 + "px";
  image.style.height = 256 + "px";
  image.style.left = "50%";
  image.style.transform = "translate(-50%, 0%)";

  oneButton.style.position = "relative";
  oneButton.style.left = "50%";
  oneButton.style.transform = "translate(-50%, -20%)";

  inputCol.style.position = "relative";
  inputCol.style.left = "50%";
  inputCol.style.transform = "translate(-50%, -20%)";
  inputCol.style.textAlign = "center"

  phraseInput.style.position = "relative";
  phraseInput.style.left = "50%";
  phraseInput.style.transform = "translate(-50%, -20%)";
  phraseInput.style.textAlign = "center"
  phraseInput.placeholder = ".:| Find out what fate awaits you |:.";

  container.style.backgroundColor = "#4b3752";
  container.appendChild(image);
  container.style.width = "25%";
  container.style.margin = "0 auto";

  resetButton.style.backgroundColor = "purple";
  resetButton.style.position = "relative";
  resetButton.style.left = "50%";
  resetButton.style.transform = "translate(-50%, -5%)";

  document.querySelector("h1").textContent = "FATE IS LIKE THE WEATHER";
  document.querySelector("h1").style.color = "#d6d2b0";
  oneButton.addEventListener("click", fetchText);
  oneButton.textContent = "initialize";
  oneButton.style.backgroundColor = "purple";

  // -------------------------------------------

  /****** PART A:: FETCH */
  async function fetchText() {
    //console.log("in fetch");
    let raw_rainbow_text = "";
    try {
      const response = await fetch('files/rainbow.txt'); // Fetches rainbow.txt file

      if (response.ok) { // If successfully fetched
        raw_rainbow_text = await response.text(); // Get the text
      } else {
        console.error('Failed to fetch the text file');
      }

      // Hide first button and make all the input elements visible to the user
      oneButton.style.display = "none";
      inputCol.style.backgroundColor = "transparent"
      document.querySelector("#phrase").style.display = "block";
      document.querySelector("#produce-poem").style.display = "block";
      document.querySelector("#inputDiv").style.display = "block";

      resetButton.addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);

      // If the rainbow text box exists, remove it
      // "If" because of the reset
      if (document.querySelector("#rainbowCol")) {
        document.querySelector("#rainbowCol").remove()
      }
    } catch (e) {
      console.error('Error fetching the text file:', e);
    }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);
    function producePoem() {
      console.log(originalRainBowText);

      // Hide the inputs
      document.querySelector("#phrase").style.display = "none";
      document.querySelector("#produce-poem").style.display = "none";

      // Access the value from the input field with id "phrase"
      const phrase = document.querySelector("#phrase").value;
      const phrase_as_array = phrase.split(/[\s.!?\n]+/); // Splits the users phrase string into array of words
      const rainbow_tokens = originalRainBowText.split(/[\s.!?\n]+/); // Splits the rainbow.txt string into array of words

      // If the user phrase and rainbow text has more than 0 words
      if (phrase_as_array.length > 0 && rainbow_tokens.length > 0) {
        runPartC(rainbow_tokens, phrase_as_array);
      } else {
        console.error('Error: One or both arrays are empty or not correctly formed.');
      }
    }
  }

  let nextWord = null;
  let nextChar = null;
  let rainbowNextWord = null
  let poem_sentence = "";

  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_tokens, phrase_as_array) {
    console.log(rainbow_tokens);
    console.log(phrase_as_array);

    // Goes through each word in users phrase
    for (let i = 0; i < phrase_as_array.length; i++) {
      nextWord = phrase_as_array[i];
      // console.log(nextWord)

      // Goes through each character in users phrase
      for (let j = 0; j < nextWord.length; j++) {
        nextChar = nextWord[j];

        // Goes through each word in rainbow text
        for (let k = 0; k < rainbow_tokens.length; k++) {
          rainbowNextWord = rainbow_tokens[k];

          // Checks if the current character and its position matches the character and position of current rainbow text word
          if (rainbowNextWord[j] == nextChar) {

            // Adds it to the final sentence
            poem_sentence += rainbowNextWord + " ";
            //console.log(poem_sentence);

            // Finish's searching for the word
            break;
          }
        }
        //console.log(nextChar);
      }
    }
    //to next stage
    runPartD();
  }


  /** PART D:: VISUALIZE **/
  let i = 0;
  let speed = 50;
  let shouldStop = null;

  function runPartD() {
    let text = poem_sentence.toString(); // Makes a variable called text that is a string of poem_sentence
    inputCol.style.width = "100%"
    inputCol.style.backgroundColor = "purple"
    shouldStop = false; // Makes sure that typeWriter isn't halted
    typeWriter(text);
    aniRef = window.requestAnimationFrame(animate); // Starts animation
  }

  // Prints letters out one at a time
  function typeWriter(text) {
    // If it should be stopped
    if (shouldStop == true) {
      i = text.length; // Finish loop
      return; // End function
    }

    // If i is less than the amount of text
    if (i < text.length) {
      inputCol.innerHTML += text.charAt(i); // Add the next character to the input column
      i++;
      setTimeout(() => { typeWriter(text) }, speed); // Recursively call the function with a delay
    }
  }

  let opacity = 1;
  let opacitySpeed = -0.1;

  // Blinks
  function animate() {
    opacity += opacitySpeed // Add opacitySpeed to opacity every frame

    // If opacity is ever more than or equal to 1 or less than or equal to 0
    if (opacity >= 1 || opacity <= 0) {
      opacitySpeed = -opacitySpeed; // Reverse its change trajectory
    }

    document.querySelector("#inputDiv").style.opacity = opacity; // Apply opacity changes every frame
    aniRef = window.requestAnimationFrame(animate); // Call self every frame
  }

  /** PART E:: RESET **/
  function resetPoem() {
    /** TO FILL IN **/
    shouldStop = true; // Make sure that typeWriter stops

    // Iterate through every child node under inputCol
    inputCol.childNodes.forEach(node => {
      // If it is a text node
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove(); // Remove it
      }
    });

    cancelAnimationFrame(aniRef); // Cancel the animation
    document.querySelector("#inputDiv").style.opacity = 1; // Return opacity to normal
    oneButton.style.display = "block" // Bring back the initialize button
    phraseInput.value = ""; // Erase anything in phraseInput

    console.log("RESET");
  }
} //window onload