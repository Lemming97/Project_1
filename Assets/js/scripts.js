// start with an empty page with the two buttons to load the page 

var modalEL = document.querySelector('#modal-buttons');
var drinkBodyEL = document.querySelector('#drink-Body');
var minorTextEl = document.querySelector('#minor-text');

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
                //api call for Random Kitten Generator 
                var imgEL = document.createElement('img');
                // imgEL.className = "random-kitten";
                var randomNumber = Math.floor(Math.random() * 450) + 200;
                // generate random number and then replace the 
                imgEL.src = "https://placekitten.com/" + randomNumber + "/300";
                document.body.appendChild(imgEL);
                document.body.appendChild(minorTextEl)
                minorTextEl.removeAttribute("class");
            }, 1000);
            // document.location.href = "https://www.randomkittengenerator.com/";

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
        // console.log(zipCode);
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = drink + " & " + zipCode;
        olEl.appendChild(liEl);


    });
    getNamedCocktail();

};

//drink name inputted
var getNamedCocktail = function () {
    var userDrinkInput = drinkInputEL.value.trim();
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + userDrinkInput)
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

// insult API
function myInsultFetch() {
<<<<<<< HEAD
  const target =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist";

  fetch(target)
    .then((blob) => blob.json())
    .then((data) => {
      console.log(data);
      if (data.setup !== undefined && data.delivery !== undefined ) {
        document.getElementById("setup").innerHTML = data.setup;
        document.getElementById("delivery").innerHTML = data.delivery;
      } 
      else  {
        myInsultFetch();
      }
    })
    .catch((e) => {
      console.log(e);
    });
=======
    const target = "https://v2.jokeapi.dev/joke/Any";

    fetch(target)
        .then((blob) => blob.json())
        .then((data) => {
            console.log(data);
            if (data.setup !== undefined && data.delivery !== undefined) {
                document.getElementById("setup").innerHTML = data.setup;
                document.getElementById("delivery").innerHTML = data.delivery;
            } else {
                myInsultFetch();
            }
        })
        .catch((e) => {
            console.log(e);
        });
>>>>>>> 6c76f1b8ccbd733fad53d48fbc1f28269f5daf8e
}

myInsultFetch();


//Display results functions


var displayNamedCocktail = function (cocktail) {
    //section or title
    console.log('Describe cocktail name', cocktail);
    var drinkSectionEL = document.querySelector('#named-cocktail-section');
    drinkSectionEL.innerHTML = "";
    var drinkNameEL = document.createElement('h2');
    drinkNameEL.className = "drink-name";
    drinkNameEL.innerHTML = cocktail.drinkName;
    drinkSectionEL.appendChild(drinkNameEL);

    // image 
    var img = document.createElement('img');
    img.src = cocktail.thumbnailImage;
    img.setAttribute("class", "namedDrinkImg");
    drinkSectionEL.appendChild(img);

    //ingredients
    var ingredientsDivEL = document.querySelector('#named-drink-ingredients');
    ingredientsDivEL.innerHTML = "";
    cocktail.ingredients.forEach(({
        name,
        measure
    }) => {
        //drink ingredient 
        var drinkIngredientEL = document.createElement('div');
        drinkIngredientEL.className = "dr-ingredient";
        drinkIngredientEL.innerHTML = measure + " - " + name;
        ingredientsDivEL.appendChild(drinkIngredientEL);
    });

    //drink instructions 
    var instructionsEL = document.querySelector('#named-drink-instructions');
    instructionsEL.innerHTML = "";
    instructionsEL.className = "dr-instructions";
    var drinkInstructionsEL = document.createElement('div');
    instructionsEL.innerHTML = cocktail.instructions;
    console.log(cocktail.instructions);
    drinkSectionEL.appendChild(drinkInstructionsEL);


};


var displayRandomCocktail = function (cocktail) {
    console.log(cocktail)

    //section or title
    let drinkSection = document.querySelector('#drink-section');
    drinkSection.innerHTML = "";
    let drinkName = document.createElement('h2');
    drinkName.className = "drink-name";
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
        drinkIngredient.className = "dr-ingredient";
        drinkIngredient.innerHTML = measure + " - " + name;
        ingredientsDiv.appendChild(drinkIngredient);
    });


    //drink instructions 
    let instructions = document.querySelector('#drink-instructions');
    instructions.innerHTML = "";
    instructions.className = "dr-instructions";
    let drinkInstructions = document.createElement('div');
    instructions.innerHTML = cocktail.instructions;
    console.log(cocktail.instructions);
    drinkSection.appendChild(drinkInstructions);
};


// //Date
// var date = function () {
//     var datToday = new Date();
//     var strDate = datToday.getMonth() + 1 + "/" + datToday.getDate() + "/" + datToday.getFullYear();
//     var currentDate = querySelector('#currentDay');
//     currentDate.textContent = "<br>The current date is: ", strDate;
// };

//clear local storage
document.getElementById("btnClear").onclick = function () {
    var drinkResultsEL = document.querySelector('#user-results');
    var drinkSectionEL = document.querySelector('#named-cocktail-section');
    var ingredientsDivEL = document.querySelector('#named-drink-ingredients');
    var instructionsEL = document.querySelector('#named-drink-instructions');
    drinkResultsEL.textContent = "";
    drinkSectionEL.textContent = "";
    ingredientsDivEL.textContent = "";
    instructionsEL.textContent = "";
    localStorage.removeItem("userCustomDrink");
    console.log("testing button click");
    drinkResultsEL.textContent = "Previous drinks entered have been Cleared!";



}