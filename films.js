let titleH1;
let charactersDiv;
let planetsDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul')
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getFilm(id);
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(film)
        film.planets = await fetchPlanets(film)
    }
    catch (ex) {
        console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
}

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
  }

async function fetchCharacters(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    return characters;
}

async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
        .then(res => res.json())
    return planets;
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;
    titleH1.textContent = film?.title;
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
    const planetsLis = film?.planets?.map(planet => `<li><a href="/planets.html?id=${film.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsLis.join("");
}