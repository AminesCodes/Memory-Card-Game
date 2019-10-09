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

let rightImagesTracker = [];
let clickCounter = 0;
let level = 1;


document.addEventListener("DOMContentLoaded", () => {
    let pairClick = 0;
    let pairSelection = {};

    let gameGrid = document.querySelector("#gameTemplate");
    gameGrid.style.visibility = "hidden";
    
    let progressDiv = document.querySelector("#progress");
    progressDiv.style.display = "none";

    let feedbackDiv = document.querySelector("#feedback");
    feedbackDiv.style.display = "none";

    let introDiv = document.querySelector("#intro");
    introDiv.querySelector("button").addEventListener("click", () => {
        progressDiv.style.display = "block";
        gameGrid.style.visibility = "visible";
        introDiv.style.display = "none";
    })

    fillGrid(level);

    let clicksSpan = document.querySelector("#clicks");
    clicksSpan.innerText = `Picks: ${clickCounter}`;
    // let timeSpan = document.querySelector("#time");

    gameGrid.addEventListener("click", (event) => {       
        let clickedElement = event.target;
        
        if (clickedElement.parentNode === gameGrid) {
            let imgTag = clickedElement.firstElementChild;
            if (!rightImagesTracker.includes(imgTag.src)) {
                clickCounter += 1;
                clicksSpan.innerText = `Picks: ${clickCounter}`;

                imgTag.style.visibility = "visible"
                let div1Id;
                let div2Id;
                if (pairClick === 0) {
                    div1Id = clickedElement.id;
                    pairSelection[div1Id] = imgTag;
                    pairClick += 1;
                } else {
                    div2Id = clickedElement.id;
                    if (Object.keys(pairSelection)[0] !== div2Id) {
                        pairSelection[div2Id] = imgTag;
                        checkForValidPair(pairSelection)
                        pairClick = 0;
                        pairSelection = {};
                        checkForWin(level);
                    }
                }
            }
        }
    }) // END OF THE EVENT LISTENER TO CLICKS ON THE GAME GRID
        
}) // END OF DOM CONTENT LOADED EVENT LISTENER

const getUniqueImagesArray = () => {
    let lng = 15;
    switch (level) {
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

const getRandomIndex = (usedIndexesTracker, range) => {
    let randomIndex = Math.floor(Math.random()*range);

    if (!usedIndexesTracker.includes(randomIndex)) {
        usedIndexesTracker.push(randomIndex);
        return randomIndex;
    } 
    return getRandomIndex(usedIndexesTracker, range)
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

const fillGrid = () => {
    let gameTemplate = document.querySelector("#gameTemplate");
    let gridHeight = gameTemplate.clientHeight;
    let gridWidth = gameTemplate.clientWidth;

    let imageHeight;
    let imageWidth
    console.log(gridHeight, gridWidth)
    switch (level) {
        case 1:
            gameTemplate.className = "ThreeByFour";
            imageHeight = gridHeight / 4;
            imageWidth = gridWidth / 3;
            break;
        case 2:
            gameTemplate.className = "FourByFour";
            imageHeight = gridHeight / 4;
            imageWidth = gridWidth / 4;
            break;
        case 3:
            gameTemplate.className = "FourByFive";
            imageHeight = gridHeight / 5;
            imageWidth = gridWidth / 4;
            break;
        case 4:
            gameTemplate.className = "FourBySix";
            imageHeight = gridHeight / 6;
            imageWidth = gridWidth / 4;
            break;
        case 5:
            gameTemplate.className = "FiveBySix";
            imageHeight = gridHeight / 6;
            imageWidth = gridWidth / 5;
            break;
    }
    imageHeight = Math.floor(imageHeight);
    imageWidth = Math.floor(imageWidth);
    console.log(imageHeight, imageWidth)
    if (imageHeight > imageWidth) {
        imageHeight = imageWidth;
    } else {
        imageWidth = imageHeight;
    }
    console.log(imageHeight, imageWidth)

    let allImageDiv = gameTemplate.querySelectorAll("div");
    let randomUniqueImages = getUniqueImagesArray(); 
    let randomDoubleImages = getDoubleImagesArray(randomUniqueImages);

    for (let i = 0; i < randomDoubleImages.length; i++) {
        allImageDiv[i].style.display = "block"
        let image = allImageDiv[i].querySelector("img");
        image.src = randomDoubleImages[i];
        image.style.height = `${Math.floor(imageHeight - 10)}px`;
        image.style.width = `${Math.floor(imageWidth - 10)}px`;
        image.style.visibility = "hidden";
    }

    for (let i = randomDoubleImages.length; i < 30; i++) {
        allImageDiv[i].style.display = "none"
    }
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const checkForValidPair = (pairObject) => {
    let array = Object.values(pairObject)
    if (array[0].src === array[1].src){
        rightImagesTracker.push(array[1].src);
    } else {
        setTimeout(() => {
            array[0].style.visibility = "hidden";
            array[1].style.visibility = "hidden";
        }, 1000);
    }  
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const checkForWin = () => {
    let lng;
    switch (level) {
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
        case 5:
            lng = 15;
            break;
    }

    if (rightImagesTracker.length === lng) {
        let feedbackDiv = document.querySelector("#feedback");
        feedbackDiv.style.display = "block";
    
        let nextLevelBtn = document.querySelector("#next");
        if (lng === 15) {
            resetBtn.style.display = "none";
        }
        nextLevelBtn.addEventListener("click", () => {
            level += 1;
            resetGameGrid();
            feedbackDiv.style.display = "none";
        }) 

        let restartLevelBtn = document.querySelector("#restart");
        restartLevelBtn.addEventListener("click", () => {
            resetGameGrid();
            feedbackDiv.style.display = "none";
        })

        let resetBtn = document.querySelector("#reset");
        resetBtn.addEventListener("click", () => {
            location.reload();
        })
    }
}//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const resetGameGrid = () => {
    rightImagesTracker = [];
    clickCounter = 0;
    let clicksSpan = document.querySelector("#clicks");
    clicksSpan.innerText = `Picks: ${clickCounter}`;
    
    fillGrid();   
} //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
