/* Modifications we did:
1. creative word selection: Instead of taking the first matching word, it randomizes it for more variety.
2. word transformations: converts the words 20% of the time to uppercase letters, 20% of the time surrounds the word with asterisks and the rest stays as is.
3. random/occasional poetic transitions to add some variety 
4. added colors and titles
5. Output structure: The words are outputted in different ways by randomizing their position and their font giving variety. 
6. displays the new poem completely and then displays random letters found in the new poem and when you hover over them some movement happens. 
*/

window.onload = run;

function run() {
  // Color palette for visual enhancement
  const colorPalette = [
    '#FF6B6B', 
    '#4ECDC4', 
    '#45B7D1', 
    '#FDCB6E', 
    '#6C5CE7', 
    '#A8E6CF', 
    '#FF8ED4'  
  ];

  document.querySelector("#stepOneButton").addEventListener("click", fetchText);

  // Reset functionality
  document.querySelector("#resetButton").addEventListener("click", resetPoem);

  /****** PART A:: FETCH */  
  async function fetchText() {
    console.log("in fetch");
    try {
      // Fetch rainbow.txt
      const response = await fetch('files/rainbow.txt');
      const raw_rainbow_text = await response.text();

      // Creative enhancement: title generator
      const whimsicalTitles = [
        "Hush, just read",
        "CART 263 Nightmares",
        "Echoes of Silence",
        "Crying during finals",
        "It's tough out here"
      ];

      // Hide stepOneButton
      document.querySelector("#stepOneButton").style.display = 'none';

      // Display inputDiv
      document.querySelector("#inputDiv").style.display = 'block';

      // Display fetched text with random styling
      const rainbowTextElement = document.querySelector("#rainbow_text");
      rainbowTextElement.textContent = raw_rainbow_text;
      rainbowTextElement.style.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      // Add a randomly selected whimsical title
      const titleElement = document.createElement('h2');
      titleElement.textContent = whimsicalTitles[Math.floor(Math.random() * whimsicalTitles.length)];
      titleElement.style.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      titleElement.style.textAlign = 'center';
      titleElement.style.fontStyle = 'italic';
      rainbowTextElement.parentNode.insertBefore(titleElement, rainbowTextElement);

      // Run Part B
      runPartB(raw_rainbow_text);
    } catch (e) {
      console.error("Error fetching text:", e);
    }
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document.querySelector("#produce-poem").addEventListener("click", producePoem);

    function producePoem() {
      // Get user input phrase
      const phraseInput = document.querySelector("#phrase").value;

      // Validate input
      if (!phraseInput.trim()) {
        alert("Please enter a phrase!");
        return;
      }

      // Split phrase and rainbow text
      const phrase_as_array = phraseInput.split(/[ .!?\n]+/);
      const rainbow_tokens = originalRainBowText.split(/[ .!?\n]+/);

      // Run Part C
      runPartC(rainbow_tokens, phrase_as_array);
    }
  }

  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    const poeticTransitions = [
      "...and then...",
      "suddenly,",
      "continue,",
      "thank you, next",
      "a few hundred years later"
    ];

    // Create poem 
    let poem_sentence = '';

    for (let wordIndex = 0; wordIndex < seed_phrase_array.length; wordIndex++) {
      let word = seed_phrase_array[wordIndex];
      
      // Occasional transition
      // if (Math.random() < 0.3 && poem_sentence.length > 0) {
      //   poem_sentence += poeticTransitions[Math.floor(Math.random() * poeticTransitions.length)] + ' ';
      // }

      // Matching word logic
      let foundWords = [];

      // Iterate through characters of the current word
      for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
        // Find words in rainbow_words that match the character at this position
        const matchingWords = rainbow_words.filter(rainbowWord => 
          rainbowWord[i] && rainbowWord[i].toLowerCase() === word[i].toLowerCase()
        );

        // If multiple matches, choose randomly
        if (matchingWords.length > 0) {
          const selectedWord = matchingWords[Math.floor(Math.random() * matchingWords.length)];
          console.log(selectedWord)
          foundWords.push(selectedWord);
        } else {
          // Log when no match is found
          console.log(`No match for letter '${word[i]}' in word '${word}'.`);
          
          // Fallback: Select a random word if no match is found
          const fallbackWord = rainbow_words[Math.floor(Math.random() * rainbow_words.length)];
          console.log(`Fallback word selected: ${fallbackWord}`);
          foundWords.push(fallbackWord);
        }
      }

      // Add the matching word (with some randomness)
      if (foundWords.length > 0) {
        // Occasionally modify the word (e.g., add emphasis)
        let finalWord = foundWords[0];
        if (Math.random() < 0.2) {
          finalWord = finalWord.toUpperCase();
        } else if (Math.random() < 0.2) {
          finalWord = '*' + finalWord + '*';
        }
        
        poem_sentence += finalWord + ' ';
      }
    }

    // Trim any extra whitespace and add final flourish
    poem_sentence = poem_sentence.trim() + '.';

    // Run Part D 
    runPartD(poem_sentence);
  }

  /****** PART D:: DISPLAY */
  function runPartD(poem_sentence) {
    // Additional creative touch: Word count and complexity analysis
    const wordCount = poem_sentence.split(/\s+/).length;

    console.log("Poem generated:", poem_sentence);
    console.log(`Word Count: ${wordCount}`);

    document.getElementById("output").style.display = "block";

    // Print the full poem first
    printFullPoem(poem_sentence);

    // Create scattered visualization
    createScatteredVisualization(poem_sentence);
  }

  // Function to print full poem
function printFullPoem(poemText) {
  const outputContainer = document.querySelector("#output");
  const fullPoemElement = document.createElement("div");
  fullPoemElement.textContent = poemText;
  fullPoemElement.style.fontFamily = 'Arial, sans-serif';
  fullPoemElement.style.fontSize = '20px';
  fullPoemElement.style.marginBottom = '20px';
  fullPoemElement.style.whiteSpace = 'pre-wrap'; // Preserve formatting of poem
  outputContainer.appendChild(fullPoemElement);
}

  function createScatteredVisualization(poemText) {
    // Remove any existing visualization
    const existingViz = document.querySelector("#poem-visualization");
    if (existingViz) {
        existingViz.remove();
    }

    // Create SVG container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "poem-visualization");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "500");
    svg.style.backgroundColor = 'rgba(240,240,240,0.5)';

    // Font choices for variety
    const fonts = [
        'Arial', 
        'Courier New', 
        'Georgia', 
        'Verdana', 
        'Palatino Linotype', 
        'Bookman Old Style'
    ];

    // Split poem into words 
    const words = poemText.split(/\s+/);
    const svgWidth = window.innerWidth * 0.9;
    const svgHeight = 500;

   // Function to get random position that ensures the word stays within bounds
  // Function to get random position that ensures the word stays within bounds
function getRandomPosition() {
  // Ensure words stay within the canvas boundaries
  const maxX = svgWidth; // No need to subtract the word width, just use full width
  const maxY = svgHeight; // No need to subtract the word height, just use full height

  const x = Math.random() * maxX; // Get a random X position within canvas width
  const y = Math.random() * maxY; // Get a random Y position within canvas height

  return {x, y};
}
    // Create words as scattered SVG text elements
    words.forEach(word => {
      
      // Split each word into individual letters
      const letters = word.split('');

      // Create each letter as a scattered SVG text element
      letters.forEach(letter => {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

            // Randomize word properties
            const fontSize = Math.floor(Math.random() * 30 + 16);
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            const font = fonts[Math.floor(Math.random() * fonts.length)];
            const position = getRandomPosition();

            // Set text attributes
            text.setAttribute("x", position.x);
            text.setAttribute("y", position.y);
            text.setAttribute("font-size", `${fontSize}px`);
            text.setAttribute("font-family", font);
            text.setAttribute("fill", color);
            text.setAttribute("opacity", "0.8");

            // Add word content
            text.textContent = letter;

            // Interactivity: hover and animation effects
            text.style.transition = "transform 0.3s ease, opacity 0.3s ease";
            text.addEventListener("mouseover", () => {
                text.style.transform = "scale(1.5) rotate(10deg)";
                text.setAttribute("opacity", "1");
            });

            text.addEventListener("mouseout", () => {
                text.style.transform = "scale(1) rotate(0deg)";
                text.setAttribute("opacity", "0.8");
            });

            // Add to SVG
            svg.appendChild(text);
        });
    });

    // Add SVG to document
    const outputContainer = document.querySelector("#output");
    outputContainer.appendChild(svg);
}


   /****** PART E:: RESET  */
   function resetPoem() {
    // Reset stepOneButton to visible
  document.querySelector("#stepOneButton").style.display = 'block';

  // Hide input div
  document.querySelector("#inputDiv").style.display = 'none';

  // Clear rainbow text
  const rainbowTextElement = document.querySelector("#rainbow_text");
  rainbowTextElement.textContent = '';

  // Clear any previous title
  const existingTitle = rainbowTextElement.previousElementSibling;
  if (existingTitle && existingTitle.tagName === 'H2') {
    existingTitle.remove();
  }

  // Clear phrase input
  document.querySelector("#phrase").value = '';

  // Clear output and visualization
  const outputElement = document.querySelector("#output");
  outputElement.textContent = '';
  
  
  // Clear visualization
  const visualization = document.querySelector("#poem-visualization");
  if (visualization) {
    visualization.remove();
  }

  // Remove any event listeners 
  const produceButton = document.querySelector("#produce-poem");
  const oldButton = produceButton.cloneNode(true);
  produceButton.parentNode.replaceChild(oldButton, produceButton);
  }
} //window onload


