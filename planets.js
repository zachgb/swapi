

// my code

const baseUrl = `https://swapi2.azurewebsites.net/api`;
// let planet = {};
let planetCharacters = [];
let characters =''
let planetFilms = []
let films = []
let planetName = ''
let climate = ''
let population = ''
let terrain = ''

// from character file
addEventListener('DOMContentLoaded', () => {

    climate = document.querySelector('#climate')
    planetName = document.querySelector('#name')
    population = document.querySelector('#population')
    terrain = document.querySelector('#terrain')
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getPlanet(id)
    fetchCharacters(id)
    fetchFilms(id)
    
  });

  async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
    //   character.homeworld = await fetchHomeworld(character)
    //   character.films = await fetchFilms(character)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
}

// async function fetchPlanet(id){
//     planet = await fetch(`${baseUrl}/planets/${id}`).then(res =>res.json())
//     .then(response =>{if (response.length=== 0) {throw new Error('no more planets to display')}
//         else{
//             console.log(response)
//         }}
//     )
//     .catch(error => console.log(error))
// }
async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/planets/${id}`;
    return await fetch(planetUrl)
      .then(res => res.json())
  }

async function fetchCharacters(id){
    planetCharacters = await fetch(`${baseUrl}/planets/${id}/characters`)
    .then(res =>res.json())
    .catch(error => console.log(error))
}

async function fetchFilms(id){
    planetFilms = await fetch(`${baseUrl}/planets/${id}/films`)
    .then(res =>res.json())
    .catch(error => console.log(error))

}

const renderPlanet = planet => {

    characters = document.querySelector('#characters')
    characters.innerHTML = planetCharacters.map(character=>`<li><a href="/character.html?id=${character.id}">${character.name}</li>` ).join('')
    films = document.querySelector('#films')
    films.innerHTML = planetFilms.map(film=>`<li><a href="/films.html?id=${film.id}">${film.title}</li>` ).join('')
    planetName.innerHTML = planet.name
    climate.innerHTML = planet.climate
    population.innerHTML = planet.population
    terrain.innerHTML = planet.terrain







    // const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    // charactersUl.innerHTML = charactersLis.join("");
    // const planetsLis = film?.planets?.map(planet => `<li><a href="/planets.html?id=${film.id}">${planet.name}</li>`)
    // planetsUl.innerHTML = planetsLis.join("");






    // document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
    // nameH1.textContent = character?.name;
    // heightSpan.textContent = character?.height;
    // massSpan.textContent = character?.mass;
    // birthYearSpan.textContent = character?.birth_year;
    // homeworldSpan.innerHTML = `<a href="/planets.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    // const filmsLis = character?.films?.map(film => `<li><a href="/films.html?id=${film.id}">${film.title}</li>`)
    // filmsUl.innerHTML = filmsLis.join("");
  }
