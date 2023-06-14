const cards = document.querySelectorAll('.card')  

function shuffleCards(){
    cards.forEach(card => {
        const randomPosition = Math.trunc(Math.random() *12 ) 
        card.style.order = randomPosition
    })
}

shuffleCards()

cards.forEach(card => card.addEventListener('click', flipACard))

let locked = false
let cardsPicked = []
function flipACard(e){

    if(locked) return
    
    saveCard(e.target.children[0], e.target.getAttribute("data-attr")); // Ici en premier on selectionne le premier enfant de l'élément html "card". Dans ce cas la c'est "double-face".
                                                                           // En deuxieme on séléctionne l'attribut 'data-attr' qu'on a mis de base sur l'élément html en question
    if(cardsPicked.length === 2) result()
}

function saveCard(el, value){
    if(el === cardsPicked[0]?.el) return

    el.classList.add("active");
    cardsPicked.push({el, value})
    console.log(cardsPicked);
}

function result(){
    numberTry()
    if(cardsPicked[0].value === cardsPicked[1].value){
        cardsPicked[0].el.parentElement.removeEventListener("click", flipACard)
        cardsPicked[1].el.parentElement.removeEventListener("click", flipACard)
        cardsPicked = [];
        return
    }
    locked = true
    setTimeout(() => {
        cardsPicked[0].el.classList.remove("active")
        cardsPicked[1].el.classList.remove("active")
        cardsPicked = [];
        locked = false
    }, 1000)
}

const innerCards = [...document.querySelectorAll('.double-face')] // On selectionne tout les doucle face a partir d'un tableau
const advice = document.querySelector('.advice')
const score = document.querySelector(".score")
let numberOfTry = 0
function numberTry(){
    numberOfTry++

    const checkForEnd = innerCards.filter(card => !card.classList.contains("active"))
    console.log(checkForEnd);
    if(!checkForEnd.length){
        advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`
        score.textContent = `Votre score final : ${numberOfTry}`
        return
    }
    score.textContent = `Nombre de coups : ${numberOfTry}`
}

window.addEventListener("keydown", handleRestart)

let shuffleLock = false
function handleRestart(e){
    e.preventDefault()
    if(e.keyCode === 32){
        innerCards.forEach(card => card.classList.remove("active"))
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
        score.textContent = `Nombres de coups : 0`
        numberOfTry = 0
        cards.forEach(card => card.addEventListener("click", flipACard))

        if(shuffleLock) return
        shuffleLock = true
        setTimeout(() => {
            shuffleCards()
            shuffleLock = false
        }, 600);
    }
}