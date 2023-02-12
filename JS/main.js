const showItems = (items) => {
    items.forEach((pokemon) => {
        const newPokemon = document.createElement("div")
        newPokemon.classList.add("card")
        const image = document.createElement("img")
        image.src = pokemon.image
        const name = document.createElement("div")
        name.classList.add("pokemon-name")
        name.innerText= pokemon.name
        const type = document.createElement("div")
        type.classList.add("pokemon-type")
        type.innerText = pokemon.type
        newPokemon.style.backgroundColor = "var(--"+pokemon.type+")"
        newPokemon.appendChild(image)
        newPokemon.appendChild(name)
        newPokemon.appendChild(type) 
        cards.appendChild(newPokemon)
    })
}

function getPokemons(){
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "../pokemons.json", false);
    xhReq.send(null)
    return JSON.parse(xhReq.responseText);
}

function searchHandler() {
    cards.innerHTML = ""
    const searchedArray = myPokemons.filter((checkedItem)=>{
        return (checkedItem.name.toLowerCase()).startsWith(search.value)
    })
    showItems(searchedArray)
}

const myPokemons = getPokemons()
const cards = document.querySelector(".cards")
const search = document.querySelector("input")
showItems(myPokemons)

search.addEventListener("keyup",searchHandler)


