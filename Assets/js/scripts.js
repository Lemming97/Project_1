// start with an empty page with the two buttons to load the page 

var modalEL = document.querySelector('#modal-buttons');
var drinkBodyEL = document.querySelector('#drink-Body');

//age confirmation screen and buttons
modalEL.addEventListener("click", function (event) {
    var target = event.target;
    console.log(event.target.matches("button")); // can filter the event  based on the ID of the event
    // make sure the thing we clicked is a button
    if (event.target.matches("button")) {
        console.log("is a button");

        if (target.id === "modal-confirm-yes") {
            console.log("yes");
            drinkBodyEL.removeAttribute("class");
            modalEL.setAttribute("class", "hide");




        } else if (target.id === "modal-confirm-no") {
            modalEL.textContent = "Sorry! You're too young!";
            modalEL.setAttribute("style", "font-size:35px; text-align:center;");
            setTimeout(function () {
                modalEL.setAttribute("class", "result hide");
            }, 1000);
            document.location.href = "https://www.randomkittengenerator.com/";

        }
    } else {
        event.preventDefault();

    }


});

var drinkInputEL = document.querySelector('#drink-name');
var zipCodeInputEL = document.querySelector('#zipcode');

var drinkResults =
    JSON.parse(window.localStorage.getItem("drinkResults")) || [];

//set this to an event listener to the button submit button 
var saveUserDrinks = function () {
    // get value of input box
    var userDrinkInput = drinkInputEL.value.trim();
    var userZipCodeInput = zipCodeInputEL.value.trim();

    if (userDrinkInput !== "" && userZipCodeInput !== "") {

        // format new score object for current user
        var userCustomDrink = {
            drink: userDrinkInput,
            zipCode: userZipCodeInput
        };

        // save to local storage
        drinkResults.push(userCustomDrink);
        window.localStorage.setItem("userCustomDrink", JSON.stringify(drinkResults));


    }
    displayDrinkResults();

};




function displayDrinkResults() {

    console.log(drinkResults);

    // display on page
    var olEl = document.getElementById("user-results");
    olEl.textContent = ""; //


    drinkResults.forEach(function ({
        zipCode,
        drink
    }) {
        console.log(zipCode); // ask about this in class 
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = drink + " & " + zipCode;
        olEl.appendChild(liEl);


    });

};

//drink name and zip code functions
var getNamedCocktail = function () {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.json())
        .then(data => console.log(data));

};

getNamedCocktail();




//get random drinks
var getRandomCocktail = function () {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => displayRandomCocktail(data));
};



function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0]);
    console.log(cocktail.drinks[0].strIngredient1 + cocktail.drinks[0].strMeasure1);
    console.log(cocktail.drinks[0].strIngredient2 + cocktail.drinks[0].strMeasure2);
    console.log(cocktail.drinks[0].strIngredient3 + cocktail.drinks[0].strMeasure3);

    // console.log(randomDrinkData.strInstructions);
    var randomDrinkData = cocktail.drinks[0];
    //section or title
    let drinkSection = document.querySelector('#drink-section');
    let drinkName = document.createElement('h2');
    drinkName.innerHTML = randomDrinkData.strDrink;
    drinkSection.appendChild(drinkName);
    // image 
    let img = document.createElement('img');
    img.src = randomDrinkData.strDrinkThumb;
    img.setAttribute("class", "randomDrinkImg");
    drinkSection.appendChild(img);

    // for (let i = 1; i < 16; i++) {
    //     // if (randomDrinkData['strIngredient'] == null || randomDrinkData['strIngredient'] == '') {
    //     //     break;
    //     // }


    // let ingredient = document.querySelector('#drink-ingredient');
    // let drinkIngredient = document.createElement('li');
    // ingredient.innerHTML = randomDrinkData.strIngredient1;
    // drinkSection.appendChild(drinkIngredient);


    // if (randomDrinkData.strIngredient1) {

    //     drinkSection.appendChild(randomDrinkData.strIngredient1);
    // // }
    // // if (randomDrinkData.strIngredient2 != null) {
    // //     drinkSection.appendChild(randomDrinkData.strIngredient2);
    // // }
    // // if (randomDrinkData.strIngredient3 != null) {
    // //     drinkSection.appendChild(randomDrinkData.strIngredient3);
    // // }
    // // if (randomDrinkData.strIngredient4 != null) {
    // //     drinkSection.appendChild(randomDrinkData.strIngredient4);
    // // }
    // // if (randomDrinkData.strIngredient5 != null) {
    // //     drinkSection.appendChild(randomDrinkData.strIngredient5);
    // // }

    // // //drink ingredient 
    // // let ingredient = document.querySelector('#drink-ingredient');
    // // let drinkIngredient = document.createElement('div');
    // ingredient.innerHTML = randomDrinkData['strMeasure{i}'] + ':' + randomDrinkData["strIngredient{i}"];

    // }

    //drink instructions 
    let instructions = document.querySelector('#drink-instructions');
    let drinkInstructions = document.createElement('div');
    instructions.innerHTML = randomDrinkData.strInstructions;
    console.log(randomDrinkData.strInstructions);
    drinkSection.appendChild(drinkInstructions);
};

displayRandomCocktail();