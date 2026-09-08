async function getPokemonData() {
    if (!localStorage.getItem("globalpokedata")) {
        const rawdata = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`);
        const json = await rawdata.json();
        localStorage.setItem("globalpokedata", JSON.stringify(json));
    }
}

async function getsuggestions() {
    let suggestmax = 0;
    const suggestscontainer = document.getElementById("suggestions");
    const pokedata = JSON.parse(localStorage.getItem("globalpokedata"));

    suggestscontainer.innerHTML = "";

    for (let i = 0; i < 1025; i++) {
        if (pokedata.results[i].name.startsWith(document.getElementById("searchInput").value.toLowerCase()) && document.getElementById("searchInput").value.length > 0) {
            if (suggestmax >= 3) break;

            const speciesdata = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
            const speciesjson = await speciesdata.json();

            suggestmax++;
            const suggest = document.createElement("div");
            const suggestimage = document.createElement("img");
            const suggestname = document.createElement("p");
            const suggestdexnumber = document.createElement("p");

            suggest.id = `divsuggestion${i}`;
            suggestimage.id = `suggestionimage${i}`;
            suggestimage.src = speciesjson.sprites.other["official-artwork"].front_default;
            
            suggestname.id = `suggestionname${i}`;
            suggestname.textContent = pokedata.results[i].name.charAt(0).toUpperCase() + pokedata.results[i].name.slice(1);
            suggestdexnumber.id = `suggestiondexnumber${i}`;
            suggestdexnumber.textContent = `#${i + 1}`;

            suggestscontainer.appendChild(suggest);
            suggest.appendChild(suggestimage);
            suggest.appendChild(suggestname);
            suggest.appendChild(suggestdexnumber);

            console.log(speciesjson);
        }
    }


}

document.getElementById("searchInput").addEventListener("input", getsuggestions);
getPokemonData();