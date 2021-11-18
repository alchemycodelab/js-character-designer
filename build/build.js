import { 
    checkAuth, 
    getCharacter,
    logout, 
    updateCharacter,
    createCharacter,
} from "../fetch-utils.js";

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
let head = '';
let middle = '';
let bottom = '';

let catchphrases = [];

headDropdown.addEventListener('change', async () => {
    const value = headDropdown.value;

    headCount++;
    head = value;
    headEl.style.backgroundImage = `url("../assets/${value}-head.png")`;
    await updateCharacterInSupabase()
});


middleDropdown.addEventListener('change', async () => {
    const value = middleDropdown.value;

    middleCount++;
    middle = value;
    middleEl.style.backgroundImage = `url("../assets/${value}-middle.png")`;
    await updateCharacterInSupabase()
});


bottomDropdown.addEventListener('change', async () => {
    const value = bottomDropdown.value;

    bottomCount++;
    bottom = value;
    bottomEl.style.backgroundImage = `url("../assets/${value}-pants.png")`;
    await updateCharacterInSupabase()
});

catchphraseButton.addEventListener('click', async () => {
    const newCatchphrase = catchphraseInput.value;
    catchphrases.push(newCatchphrase);

    catchphraseInput.value = '';
    
    await updateCharacterInSupabase()
    renderUpdate();
});

function renderUpdateStats() {
    reportEl.textContent = `You have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;

    chatchphrasesEl.textContent = '';

    for (let catchphrase of catchphrases) {
        const p = document.createElement('p');

        p.classList.add('catchphrase');
        p.textContent = catchphrase;

        chatchphrasesEl.append(p);
    }
}

function renderUpdateCharacter() {
    if (head) headEl.style.backgroundImage = `url("../assets/${head}-head.png")`;
    if (middle) middleEl.style.backgroundImage = `url("../assets/${middle}-middle.png")`;
    if (bottom) bottomEl.style.backgroundImage = `url("../assets/${bottom}-pants.png")`;
}

function renderUpdate() {
    renderUpdateStats();
    renderUpdateCharacter();
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

    head = character.head;
    middle = character.middle;
    bottom = character.bottom;
    catchphrases = character.catchphrases;

    renderUpdate();
})

async function updateCharacterInSupabase() {
    const newCharacter = {
        head: head,
        middle: middle,
        bottom: bottom,
        catchphrases: catchphrases,
    };

    await updateCharacter(newCharacter)

    renderUpdate();
}

logoutButton.addEventListener('click', () => {
    logout()
});
