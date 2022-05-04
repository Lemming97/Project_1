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

//display items entered from saveUserDrinks function
var displayDrinkResults = function () {

    console.log(drinkResults);

    // display on page
    var olEl = document.getElementById("user-results");
    olEl.textContent = "";


    drinkResults.forEach(function ({
        zipCode,
        drink
    }) {
        console.log(zipCode);
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = drink + " & " + zipCode;
        olEl.appendChild(liEl);


    });

};

//drink name inputted
var getNamedCocktail = function () {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink)
        .then(response => response.json())
        .then(data => data.drinks[0])
        .then(cocktail => {
            console.log(cocktail);
            // strIngredientN
            // strMeasureN
            var ingredients = [];
            for (var i = 1; i <= 15; i++) {
                var ingredientName = cocktail["strIngredient" + i];
                var ingredientMeasure = cocktail["strMeasure" + i];
                if (ingredientName !== null) {
                    ingredients.push({
                        name: ingredientName,
                        measure: ingredientMeasure,
                    })
                }
            }
            return {
                drinkName: cocktail.strDrink,
                thumbnailImage: cocktail.strDrinkThumb,
                instructions: cocktail.strInstructions,
                ingredients,
            }
        })
        .then(cocktail => displayNamedCocktail(cocktail));
};

//get random drinks API call
var getRandomCocktail = function () {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => data.drinks[0])
        .then(cocktail => {
            console.log(cocktail);
            // strIngredientN
            // strMeasureN
            var ingredients = [];
            for (var i = 1; i <= 15; i++) {
                var ingredientName = cocktail["strIngredient" + i];
                var ingredientMeasure = cocktail["strMeasure" + i];
                if (ingredientName !== null) {
                    ingredients.push({
                        name: ingredientName,
                        measure: ingredientMeasure,
                    })
                }
            }
            return {
                drinkName: cocktail.strDrink,
                thumbnailImage: cocktail.strDrinkThumb,
                instructions: cocktail.strInstructions,
                ingredients,
            }
        })
        .then(cocktail => displayRandomCocktail(cocktail));

};

//insult API

var getInsult = function () {
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json', {
            mode: 'no-cors'
        })
        .then(response => response.json())
        .then(data => data.insults[0])
        .then(insult => {
            console.log(insult);

        })


};
getInsult();



//Display results functions


var displayNamedCocktail = function () {
    //section or title
    let drinkSection2 = document.querySelector('#named-cocktail-section');
    drinkSection2.innerHTML = "";
    let drinkName2 = document.createElement('h2');
    drinkName2.className = "drink-name"
    drinkName2.innerHTML = cocktail.drinkName2;
    drinkSection2.appendChild(drinkName2);

    // image 
    let img = document.createElement('img');
    img.src = cocktail.thumbnailImage;
    img.setAttribute("class", "namedDrinkImg");
    drinkSection2.appendChild(img);

    //ingredients
    var ingredientsDiv2 = document.querySelector('#named-drink-ingredients');
    ingredientsDiv2.innerHTML = "";
    cocktail.ingredients.forEach(({
        name,
        measure
    }) => {
        //drink ingredient 
        var drinkIngredient2 = document.createElement('div');
        drinkIngredient2.innerHTML = measure + " - " + name;
        ingredientsDiv2.appendChild(drinkIngredient2);
    });

    //drink instructions 
    let instructions2 = document.querySelector('#named-drink-instructions');
    instructions2.innerHTML = "";
    let drinkInstructions2 = document.createElement('div');
    instructions2.innerHTML = cocktail.instructions;
    console.log(cocktail.instructions);
    drinkSection2.appendChild(drinkInstructions2);


};


var displayRandomCocktail = function (cocktail) {
    console.log(cocktail)

    //section or title
    let drinkSection = document.querySelector('#drink-section');
    drinkSection.innerHTML = "";
    let drinkName = document.createElement('h2');
    drinkName.className = "drink-name"
    drinkName.innerHTML = cocktail.drinkName;
    drinkSection.appendChild(drinkName);

    // image 
    let img = document.createElement('img');
    img.src = cocktail.thumbnailImage;
    img.setAttribute("class", "randomDrinkImg");
    drinkSection.appendChild(img);

    //ingredients
    var ingredientsDiv = document.querySelector('#drink-ingredients');
    ingredientsDiv.innerHTML = "";
    cocktail.ingredients.forEach(({
        name,
        measure
    }) => {
        //drink ingredient 
        var drinkIngredient = document.createElement('div');
        drinkIngredient.innerHTML = measure + " - " + name;
        ingredientsDiv.appendChild(drinkIngredient);
    });


    //drink instructions 
    let instructions = document.querySelector('#drink-instructions');
    instructions.innerHTML = "";
    let drinkInstructions = document.createElement('div');
    instructions.innerHTML = cocktail.instructions;
    console.log(cocktail.instructions);
    drinkSection.appendChild(drinkInstructions);
};