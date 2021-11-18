// import functions and grab DOM elements

// initialize state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
const headDropdown = document.getElementById('head-dropdown');
const middleDropdown = document.getElementById('middle-dropdown');
const bottomDropdown = document.getElementById('bottom-dropdown');
const headEl = document.getElementById('head');
const middleEl = document.getElementById('middle');
const bottomEl = document.getElementById('bottom');
const reportEl = document.getElementById('report');
const chatchphrasesEl = document.getElementById('chatchphrases');
const catchphraseInput = document.getElementById('catchphrase-input');
const catchphraseButton = document.getElementById('catchphrase-button');

let headCount = 0;
let middleCount = 0;
let bottomCount = 0;

const catchphrases = [];

headDropdown.addEventListener('change', () => {
    const value = headDropdown.value;

    headCount++;
    headEl.style.backgroundImage = `url("./assets/${value}-head.png")`;
    updateStats();
});


middleDropdown.addEventListener('change', () => {
    const value = middleDropdown.value;

    middleCount++;
    middleEl.style.backgroundImage = `url("./assets/${value}-middle.png")`;
    updateStats();
});


bottomDropdown.addEventListener('change', () => {
    const value = bottomDropdown.value;

    bottomCount++;
    bottomEl.style.backgroundImage = `url("./assets/${value}-pants.png")`;
    updateStats();
});

catchphraseButton.addEventListener('click', () => {
    const newCatchphrase = catchphraseInput.value;
    catchphrases.push(newCatchphrase);

    catchphraseInput.value = '';
    updateStats();
});

function updateStats() {
    reportEl.textContent = `You have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;

    chatchphrasesEl.textContent = '';

    for (let catchphrase of catchphrases) {
        const p = document.createElement('p');

        p.classList.add('catchphrase');
        p.textContent = catchphrase;

        chatchphrasesEl.append(p);
    }
}