const words = [
    "680e2ee1f8b7d555c5b8575f1edd364d09931b4450d23b47e3587d2e1cff9131",
    "6f36344919e26777ffe66a2f36397a3a19e48ec1ee834e3cd3921479ab841b0d",
    "fdfa87b9dac23854bf16d87748924c1f635d813c923057cf21c2be33e4d56f1b",
    "d84089fcc3f1621e7d7ae48c5e4870541a1c51cfc717cd9c4d11d326eb388b59",
    "2bc20aa900a87f69970d23ad070dc5e31e231f82900ebace67d4a23d0c259220",
    "52560f69dcf1bcefaf5d14b43f8c4a1124059ba1a1c064318f0164aa6e7580b5",
    "a7f9bf4c40568c26a8fc37a0b7d314c99a29e8bb473703278789aa3bddfdb0b9",
    "b671f90079bd72522946d30945e9535f1e10892e24a0901261b51f0dac0f1a9b",
    "bcfad5a71338f2339c95265c2e626d61a93367d13d81c466193fd73578af9893",
    "9a03e37181d3c4747aa4e6752b2536c513b6e3cc7c44286c53abc203b98779a2"
];

const words2 = [
    "52455345415558",
    "54454c45434f4d4d554e49434154494f4e53",
    "43594245525345435552495445",
    "50524f4752414d4d4154494f4e",
    "524f5554455552",
    "5452414e534d495353494f4e",
    "50454e54455354",
    "43455254494649434154494f4e53",
    "53455256455552",
    "53595354454d45"
];

const step_code = "d8639c216d6621cbd090dfcb6ce219efdbe329ab7e44d54e34433f47d9fceca9";

const step_code2 = [
        "37333335",
        "36343932",
        "32323633",
        "38343633",
        "36303133"
    ]

const hangman = ['basis', 'leftbeam', 'topbeam', 'rightbeam', 'rope', 'head', 'chest', 'leftarm', 'rightarm', 'leftleg', 'rightleg'];

function hexToString(hex) {
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    return new TextDecoder().decode(bytes);
}

async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getWord(words2, word) {
    for (const word2 of words2) {
        if ((await sha256(hexToString(word2))) === word) {
            return hexToString(word2);
        }
    }
    return null;
}

async function getCode(codelist, code) {
    for (const code2 of codelist) {
        if ((await sha256(hexToString(code2))) === code) {
            return hexToString(code2);
        }
    }
    return null;
}

function Triforce() {
    document.querySelectorAll(".game").forEach(game => {
        game.style.opacity = "0";
    });
    document.querySelector("body").style.overflowY = "hidden";
    document.querySelector(".container").style.overflowY = "hidden";
    document.querySelector("main").style.display = "none";
    document.querySelector(".stats").style.display = "none";
    document.querySelectorAll(".triangle").forEach(triangle => {
        triangle.style.display = "block";
    });
    setTimeout(() => {
        document.getElementById("msg").style.opacity = "1";
        document.getElementById("t1").style.top = "0";
        document.getElementById("t1").style.left = "50px";
        document.getElementById("t1").style.transform = "rotate(0deg)";
        document.getElementById("t2").style.top = "86.6px";
        document.getElementById("t2").style.left = "0";
        document.getElementById("t2").style.transform = "rotate(0deg)";
        document.getElementById("t3").style.top = "86.6px";
        document.getElementById("t3").style.left = "100px";
        document.getElementById("t3").style.transform = "rotate(0deg)";
    }, 100);
}

function displayStepCode(codelist, code, malusvalue) {
    getCode(codelist, code).then(decodedCode => {
        const codeElement = document.getElementById("step-code");
        const codeDisplay = document.getElementById("code-display");
        
        if (decodedCode) {
            codeElement.textContent = `${decodedCode}${malusvalue}`;
            setTimeout(() => {
                codeDisplay.style.opacity = "1";
            }, 1500);
        }
    });
}

async function startGame() {
    const word = words[Math.floor(Math.random() * words.length)];
    const wordStr = await getWord(words2, word);
    document.getElementById("restant").innerHTML = `Coups restant: ${hangman.length}`;
    if (!wordStr) {
        alert("Erreur : mot introuvable !");
        return;
    }

    let guess = "";
    let error = 0;
    let malusvalue = 0;

    function display(word, guess) {
        document.getElementById("word").innerHTML = "";
        word.split('').forEach(letter => {
            if (guess.includes(letter)) {
                document.getElementById("word").innerHTML += letter + " ";
            } else {
                document.getElementById("word").innerHTML += "_ ";
            }
        });
    }

    function win(word) {
        for (const letter of word) {
            if (!guess.includes(letter)) return false;
        }
        return true;
    }

    function malus() {
        guess = "";
        error = 0;
        malusvalue++;
        document.getElementById("restant").innerHTML = `Coups restant: ${hangman.length}`;
        document.getElementById("malus").innerHTML = `Malus: ${malusvalue} min`;
        hangman.forEach(id => document.getElementById(id).style.display = "none");
        document.querySelectorAll('.c_letter > button').forEach(btn => {
            btn.disabled = false;
        });
        display(wordStr, guess);
    }

    display(wordStr, guess);

    document.querySelectorAll('.c_letter > button').forEach(btn => {
        btn.addEventListener("click", () => {
            const letter = btn.innerHTML.toUpperCase();
            if (!btn.disabled){

                if (wordStr.includes(letter)) {
                    if (!guess.includes(letter)) {
                        guess += letter;
                    }
                    display(wordStr, guess);
                    if (win(wordStr)) {
                        Triforce();
                        displayStepCode(step_code2, step_code, malusvalue);
                    }
                } else {
                    error++;
                    document.getElementById("restant").innerHTML = `Coups restant: ${hangman.length - error}`;
                    if (error <= hangman.length) {
                        document.getElementById(hangman[error - 1]).style.display = "block";
                    }
                    if (error === hangman.length) {
                        setTimeout(malus, 300);
                    }
                }
            }

            btn.disabled = true;
        });
    });
}

startGame();