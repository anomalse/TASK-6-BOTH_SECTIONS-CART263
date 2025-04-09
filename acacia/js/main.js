window.onload = run;

function run() {
  // finds step one button, adds event listener 
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");
    let raw_rainbow_text = "";
    try {
      // get rainbow.txt file
      let response = await fetch("files/rainbow.txt");
      // convert to text
      raw_rainbow_text = await response.text();
      // console.log(raw_rainbow_text);

      // hide button with stepOneButton id in html 
      document.querySelector("#stepOneButton").style.display = "none";

      // display div with id inputDiv 
      document.querySelector("#inputDiv").style.display = "block";

      // display fetched text inside div with id rainbow_text
      document.querySelector("#rainbow_text").textContent = raw_rainbow_text;


      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);
    } catch (e) { }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem") // mouseclick event listener: produce-poem
      .addEventListener("click", producePoem); // specify callback function on click: producePoem (when clicked, runs function)

    /* FILL IN HERE */
    function producePoem() {
      console.log(originalRainBowText)

      // access value from input fields with id phrase
      let userInput = document.querySelector("#phrase").value;
      // Using the split() function split on spaces(" "), fullstops(.), exclamation marks(!), question marks(?) and newline chars (\n).
      let phrase_as_array = userInput.split(/[ .!?\n]+/);
      console.log("phrase as array:", phrase_as_array);

      // split fetched text with same delimiters
      let rainbow_tokens = originalRainBowText.split(/[ .!?\n]+/);
      console.log("rainbow tokens array:", rainbow_tokens);

      //SR
      runPartC(rainbow_tokens, phrase_as_array);

    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_tokens, phrase_as_array) {

    // loop over phrase_as_array and match chars in rainbow_tokens
    console.log("rainbow_tokens:", rainbow_tokens);
    console.log("phrase_as_array:", phrase_as_array);

    let poem_sentence = "";
    let rainbowIndex = 0;

    // loop over each word in phrase_as_array
    for (let i = 0; i < phrase_as_array.length; i++) {
      let currentWord = phrase_as_array[i];

      // log the current word and its position
      console.log(`\ncurrent word: ${currentWord}`);
      console.log(`current word pos: ${i + 1}`);

      // loop over each character in the current word
      for (let c = 0; c < currentWord.length; c++) {
        let currentLetter = currentWord[c];

        // logging current letter and letter position
        console.log(`current letter: ${currentLetter}`);
        console.log(`current letter position: ${c + 1}`);

        let foundMatch = false;

        // loop over rainbow_tokens starting from rainbowIndex
        for (let r = rainbowIndex; r < rainbow_tokens.length; r++) {
          let candidate = rainbow_tokens[r];

          // checking if candidate matches this letter at position c
          if (candidate.length > c &&
            candidate[c].toLowerCase() === currentLetter.toLowerCase()) {
            // found match -> add candidate to poem_sentence
            poem_sentence += candidate + " ";
            // search after this token
            rainbowIndex = r + 1;
            foundMatch = true;

            // log poem construction
            console.log(`poem construction: ${poem_sentence}`);

            break;
          }
        }

        // if no letter found: skip
        if (!foundMatch) {
          console.log("no match for this letter: skipping.");
        }
      }
    }

    // final poem log
    console.log("\n=== Final poem sentence so far ===");
    console.log(poem_sentence);


    //to next stage
    runPartD(poem_sentence);

  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {
    // show the output div
    let outputDiv = document.querySelector("#output");
    outputDiv.style.display = "block";

    // clear old content
    outputDiv.innerHTML = "";

    // style tag for animation
    let styleTag = document.createElement("style");
    styleTag.innerHTML = `
    @keyframes floaty {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `;
    document.head.appendChild(styleTag);

    // loop each character
    for (let i = 0; i < new_sentence.length; i++) {
      let span = document.createElement("span");
      span.textContent = new_sentence[i];

      // random style
      span.style.fontSize = (14 + Math.random() * 16) + "px";
      span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      span.style.marginRight = "5px";

      // add animation 
      span.style.display = "inline-block";
      span.style.animation = "floaty 1s ease-in-out infinite alternate";

      // interactive: click -> remove letter
      span.addEventListener("click", () => {
        span.remove();
      });

      // append to output
      outputDiv.appendChild(span);
    }

  }

  /****** PART E:: RESET  */
  function resetPoem() {
    /*** TO FILL IN */

    // clear and hide element with id output
    let outputDiv = document.querySelector("#output");
    outputDiv.innerHTML = "";
    outputDiv.style.display = "none";

    // clear value of input field with id phrase
    document.querySelector("#phrase").value = "";

    // remove style
    let styleTag = document.querySelector("style");
    if (styleTag) styleTag.remove();

  }
} //window onload


