let pic1 = "Images/01.png";
let pic2 = "Images/02.png";
let pic3 = "Images/03.png";
let pic4 = "Images/04.png";
let pic5 = "Images/05.png";
let pic6 = "Images/06.png";
let pic7 = "Images/07.png";
let pic8 = "Images/08.png";
let pic9 = "Images/09.png";
let pic10 = "Images/10.png";
let pic11 = "Images/11.png";
let pic12 = "Images/12.png";
let pic13 = "Images/13.png";
let pic14 = "Images/14.png";
let pic15 = "Images/15.png";
let allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15];

let clickedDivsTracker = [];


document.addEventListener("DOMContentLoaded", () => {
    let clickCounter = 0;
    let level = 2;
    let pairClick = 0;
    let pairSelection = {};

    fillGrid(level);

    let clicksSpan = document.querySelector("#clicks");
    clicksSpan.innerText = `Picks: ${clickCounter}`;
    let timeSpan = document.querySelector("#time");


    let gameGrid = document.querySelector("#gameTemplate");
    gameGrid.addEventListener("click", (event) => {       
        let clickedElement = event.target;
        let containerDiv = clickedElement.parentNode;
        
        if (containerDiv.parentNode === gameGrid 
            && !clickedDivsTracker.includes(clickedElement.src)) {
                clickCounter += 1;
                clicksSpan.innerText = `Picks: ${clickCounter}`;

                containerDiv.className = "front"
                let div1Id;
                let div2Id;
                if (pairClick === 0) {
                    div1Id = containerDiv.id;
                    pairSelection["firstDiv"] = containerDiv;
                    pairSelection[div1Id] = clickedElement.src;
                    pairClick += 1;
                    // console.log("1.\n", pairSelection)
                } else {
                    div2Id = containerDiv.id;
                    if (Object.keys(pairSelection)[1] !== div2Id) {
                        pairSelection["secondDiv"] = containerDiv;
                        pairSelection[div2Id] = clickedElement.src;
                        checkForValidPair(pairSelection)
                        pairClick = 0;
                        pairSelection = {};
                        checkForWin();
                    }
                }
        }
    }) // END OF THE EVENT LISTENER TO CLICKS ON THE GAME GRID
        
}) // END OF DOM CONTENT LOADED EVENT LISTENER

const getUniqueImagesArray = (stage) => {
    let lng = 15;
    switch (stage) {
        case 1:
            lng = 6;
            break;
        case 2:
            lng = 8;
            break;
        case 3:
            lng = 10;
            break;
        case 4:
            lng = 12;
            break;
    }

    let usedImageIndex = [];
    let uniqueImages = []

    for (let i = 0; i < lng; i++) {
        let index = getRandomIndex(usedImageIndex, allImages.length);
        uniqueImages[i] = allImages[index];
    }

    return uniqueImages;
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getRandomIndex = (arr, range) => {
    let randomIndex = Math.floor(Math.random()*range);

    if (!arr.includes(randomIndex)) {
        arr.push(randomIndex);
        return randomIndex;
    } 
    return getRandomIndex(arr, range)
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const getDoubleImagesArray = (array) => {
    let selectedIndexes = [];
    let doubleImages = [];

    for (let element of array) {
        let index1 = getRandomIndex(selectedIndexes, array.length*2);
        doubleImages[index1] = element;
        let index2 = getRandomIndex(selectedIndexes, array.length*2);
        doubleImages[index2] = element;
    }
    return doubleImages;
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const fillGrid = (stage) => {
    let imagesDivs = document.querySelector("#gameTemplate").querySelectorAll("div");
    let randomUniqueImages = getUniqueImagesArray(stage); 
    let randomDoubleImages = getDoubleImagesArray(randomUniqueImages);

    for (let i = 0; i < randomDoubleImages.length; i++) {
        let image = imagesDivs[i].querySelector("img");
        image.src = randomDoubleImages[i];
    }
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const checkForValidPair = (pairObject) => {
    setTimeout(() => {
        let array = Object.values(pairObject)
        if (array[1] === array[3]){
            clickedDivsTracker.push(array[1]);
        } else {
            array[0].className = "back";
            array[2].className = "back";
        }
        console.log(clickedDivsTracker);    
    }, 1000);
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const checkForWin = () => {
    
}//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
