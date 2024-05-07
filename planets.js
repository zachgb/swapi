

// my code

const baseUrl = `https://swapi2.azurewebsites.net/api`;
const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
let planet = {};
let planetCharacters = [];
let planetFilms = [];

async function fetchPlanet(id){
    planet = await fetch(`${baseUrl}/planets/${id}`).then(res =>res.json())
    .then(response =>{if (response.length=== 0) {throw new Error('no more planets to display')}
        else{
            console.log(response)
        }}
    )
    .catch(error => console.log(error))
}

async function fetchCharacters(id){
    planetCharacters = await fetch(`${baseUrl}/planets/${id}/characters`).then(res =>res.json())
    .then(response =>{if (response.length=== 0) {throw new Error('no more characters to display')}
        else{
            console.log(response)
        }}
    )
    .catch(error => console.log(error))
}

async function fetchFilms(id){
    planetFilms = await fetch(`${baseUrl}/planets/${id}/films`).then(res =>res.json())
    .then(response =>{if (response.length=== 0) {throw new Error('no more films to display')}
        else{
            console.log(response)
        }}
    )
    .catch(error => console.log(error))
}

fetchFilms(1)