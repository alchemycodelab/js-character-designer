import { 
    checkAuth, 
    getCharacter,
    logout, 
    updateCharacter,
    createCharacter,
    updateBottom,
    updateHead,
    updateMiddle,
    updateChatchphrases
} from '../fetch-utils.js';

// import functions and grab DOM elements
checkAuth();
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
const logoutButton = document.getElementById('logout');

let headCount = 0;
let middleCount = 0;
let bottomCount = 0;

let catchphrases = [];

headDropdown.addEventListener('change', async() => {
    headCount++;
    await updateHead(headDropdown.value);
});


middleDropdown.addEventListener('change', async() => {
    middleCount++;
    await updateMiddle(middleDropdown.value);
});


bottomDropdown.addEventListener('change', async() => {
    bottomCount++;
    updateBottom(bottomDropdown.value);
});

catchphraseButton.addEventListener('click', async() => {
    catchphrases.push(catchphraseInput.value);

    catchphraseInput.value = '';
    
    updateChatchphrases(catchphrases);
});

async function fetchAndRenderCharacter() {
    const { head, middle, bottom } = await getCharacter();

    if (head) headEl.style.backgroundImage = `url("../assets/${head}-head.png")`;
    if (middle) middleEl.style.backgroundImage = `url("../assets/${middle}-middle.png")`;
    if (bottom) bottomEl.style.backgroundImage = `url("../assets/${bottom}-pants.png")`;
}

function refreshData() {
    renderStats();
    fetchAndRenderCharacter();
}

window.addEventListener('load', async() => {
    let character = await getCharacter();

    if (!character) {
        character = await createCharacter({
            head: '',
            middle: '',
            bottom: '',
            catchphrases: [],
        });    
    }

    catchphrases = character.catchphrases;

    refreshData();
});

async function updatePart(part, value) {
    await updateCharacter(part, value);

    refreshData();
}

logoutButton.addEventListener('click', () => {
    logout();
});

function renderStats() {
    reportEl.textContent = `In this session, you have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;

    chatchphrasesEl.textContent = '';

    for (let catchphrase of catchphrases) {
        const p = document.createElement('p');

        p.classList.add('catchphrase');
        p.textContent = catchphrase;

        chatchphrasesEl.append(p);
    }
}