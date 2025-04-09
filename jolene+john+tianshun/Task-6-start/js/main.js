window.onload = run;

function run() {
    document.querySelector("#stepOneButton").addEventListener("click", fetchText);
    document.querySelector("#resetButton").addEventListener("click", resetPoem);

    /****** PART A:: FETCH */
    async function fetchText() {
        console.log("in fetch");
        let raw_rainbow_text = "";

        try {
            raw_rainbow_text = await fetch("./files/rainbow.txt")
                .then(res => res.text())
                .catch(err => {
                    console.log(err)
                })

            document.querySelector("#stepOneButton").style.display = 'none';
            document.querySelector("#inputDiv").style.display = 'block';
            document.querySelector("#rainbow_text").append(raw_rainbow_text)

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
            try {
                let phrase = document.querySelector("#phrase").value;
                let phrase_as_array = phrase.split(/[ .?\n!]/);
                let rainbow_tokens = originalRainBowText.split(/[ .?\n!]/)

                //SR
                runPartC(rainbow_tokens, phrase_as_array);
            } catch (e) {
                console.error('ERROR FOUND: ' + e)
            }


        }
    }


    /****** PART C:: POEM CREATION  */
    function runPartC(rainbow_words, seed_phrase_array) {
        let poem_sentence = "";

        seed_phrase_array.forEach(seed_word => {
            for (let i = 0; i < seed_word.length; i++) {
                const nextChar = seed_word[i];
                const foundWord = rainbow_words.find(word => word.length > i && word[i] === nextChar);

                if (foundWord) {
                    poem_sentence += foundWord + " ";
                }

            }
        });

        console.log("Generated Poem Sentence: ", poem_sentence);

        //to next stage
        runPartD(poem_sentence);
    }


    /****** PART D:: VISUALIZE  */
    function runPartD(new_sentence) {
        const output = document.querySelector("#output");
        output.style.display = 'block';
        output.innerHTML = "";
        new_sentence = new_sentence.split(" ");

        new_sentence.forEach(word => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            span.style.color = getRandomColor();
            span.style.fontSize = getRandomFontSize();
            span.style.fontFamily = getRandomFontFamily();
            span.style.display = "inline-block";
            span.style.margin = "5px";
            span.style.transition = "all 0.3s ease";
            span.style.fontWeight = getRandomFontWeight();
            span.style.transform = getRandomRotation();

            span.addEventListener("mouseover", () => {
                span.style.transform = "scale(1.4) rotate(5deg)";
                span.style.color = getRandomColor();
                span.style.textShadow = "2px 2px 5px " + getRandomColor();
                span.style.fontWeight = getRandomFontWeight();
                span.style.fontFamily = getRandomFontFamily();
                span.style.fontSize = getRandomFontSize();

            });

            span.addEventListener("mouseleave", () => {
                span.style.transform = getRandomRotation();
                span.style.color = getRandomColor();
                span.style.textShadow = "none";
                span.style.fontFamily = getRandomFontFamily();

            });

            output.appendChild(span);
        });

        function getRandomColor() {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getRandomFontSize() {
            const size = Math.floor(Math.random() * 100) + 5;
            return size + "px";
        }

        function getRandomFontWeight() {
            const weights = ["normal", "bold", "bolder", "lighter"];
            return weights[Math.floor(Math.random() * weights.length)];
        }

        function getRandomFontFamily() {
            const fonts = ["Arial", "Courier New", "Georgia", "Tahoma", "Times New Roman", "Verdana", "Impact", "Comic Sans MS"];
            return fonts[Math.floor(Math.random() * fonts.length)];
        }

        function getRandomRotation() {
            const angle = Math.floor(Math.random() * 30) - 15;
            return `rotate(${angle}deg)`;
        }
    }


    /****** PART E:: RESET  */
    function resetPoem() {
        let output = document.querySelector("#output");
        let phrase = document.querySelector("#phrase");
        let rainbow_text = document.querySelector("#rainbow_text");

        document.querySelector("#stepOneButton").style.display = 'block';
        document.querySelector("#inputDiv").style.display = 'none';

        output.innerHTML = ""
        phrase.value = "";
        rainbow_text.innerHTML = "";
        output.style.display = 'none';

    }
} //window onload