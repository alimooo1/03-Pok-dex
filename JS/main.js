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
    pages.innerHTML = ""
    const searchedArray = myPokemons.filter((checkedItem)=>{
        return (checkedItem.name.toLowerCase()).startsWith(search.value)
    })
    if(searchedArray.length === myPokemons.length){
        pagesNumberHandler(searchedArray)
        showItems(myPokemons.slice(0 ,itemNumbers ))
    }else {
        showItems(searchedArray)
    }
}

function pagesNumberHandler (items) {
    for (let i = 0; i < Math.ceil(items.length / itemNumbers);i++) {
        const page = document.createElement("div")
        page.innerHTML = i+1
        page.classList.add("page")
        pages.appendChild(page)
        page.addEventListener("click", pageHandler)
    }
}

function pageHandler(event) {
    cards.innerHTML = ""
    const showedArray = myPokemons.slice((event.srcElement.innerHTML - 1)*itemNumbers ,(event.srcElement.innerHTML)*itemNumbers )
    showItems(showedArray)
}


const myPokemons = getPokemons()
const cards = document.querySelector(".cards")
const search = document.querySelector("input")
const pages = document.querySelector(".pages")
let itemNumbers = 20

pagesNumberHandler(myPokemons)
showItems(myPokemons.slice(0 ,itemNumbers ))
search.addEventListener("keyup",searchHandler)




