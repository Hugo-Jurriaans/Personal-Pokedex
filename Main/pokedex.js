async function getPokemonData() {
    if (!localStorage.getItem("globalpokedata")) {
        const rawdata = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`);
        const json = await rawdata.json();
        localStorage.setItem("globalpokedata", JSON.stringify(json));
    }
}

async function getsuggestions() {
    const suggestscontainer = document.getElementById("suggestions");
    for (let i = 0; i <= 3; i++) {
        const suggest = document.createElement("div");
        const suggestimage = document.createElement("img");
        const suggestname = document.createElement("p");
        const suggestdexnumber = document.createElement("p");
        suggest.id = `suggestion${i}`;
        suggestscontainer.appendChild(suggest);
    }
}

getPokemonData();