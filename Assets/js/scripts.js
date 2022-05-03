// start with an empty page with the two buttons to load the page 

//have javascript create the HTML 


//1. pop prompting the user to confirm that they are 21 and over
// if user selects yes they can be directed to the website
// if user selects no, direct them to a kids oriented website-> thought to build chid friend drink recipes 
// Need to use modals -> not prompt but would be good to start with prompt first 

// confirm("Are you over the age th 21?");

var modalEL = document.querySelector('#modal-buttons');
var drinkBodyEL = document.querySelector('#drink-Body');
// var confirmYes = document.querySelector('#modal-confirm-yes');
// var confirmNo = document.querySelector('#modal-confirm-no');

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


var getUserRepos = function(user) {
  // format the github api url
  var apiUrl ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita/";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function() {
          console.log();
          displayRepos();
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("No Drinks Today");
    });
};

var saveUserDrinks = function () {
    // get value of input box
    var userDrinkInput = drinkInputEL.value.trim();
    var userZipCodeInput = zipCodeInputEL.value.trim();

    if (userDrinkInput !== "" && userZipCodeInput !== "") {
        // get saved scores from local storage, or if not any, set to empty array
        var drinkResults =
            JSON.parse(window.localStorage.getItem("drinkResults")) || [];

        // format new score object for current user
        var userCustomDrink = {
            drink: userDrinkInput,
            zipCode: userZipCodeInput
        };

        // save to local storage
        drinkResults.push(userCustomDrink);
        window.localStorage.setItem("userCustomDrink", JSON.stringify(userCustomDrink));


    }


};


function displayDrinkResults() {


    // either get scores from local storage or set to empty array
    var drinkResults = JSON.parse(window.localStorage.getItem("userDrinkInput")) || [];

   

    drinkResults.forEach(function (drink, zipCode) {
        console.log(drink, zipCode); // ask about this in class 
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = drink.userDrinkInput + " & " + zipCode.userZipCodeInput;

        // display on page
        var olEl = document.getElementById("user-results");
        olEl.appendChild(liEl);

    });
}

// // run function
displayDrinkResults();






//2. submitting items to local storage returning them to the page and then displaying the info the user 

//3. api pull

//4. returning data from API 

//Need to link parameters
//run below code with onsen. We should be able to adjust onsen for linking to random button like last night.
console.info('cocktails.js loaded');
// loads cocktail on page opening instead of button call
document.addEventListener('prechange', function (event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});
// pulls random cocktail
function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        displayRandomCocktail(data);

      });
     }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  }

getRandomCocktail();
//displays cocktail
function displayRandomCocktail(cocktail) {
  console.log(cocktail[0]);

  let drinkSection = document.querySelector('#drink-section');

  let drinkName = document.createElement('h2');

  drinkName.innerHTML = cocktail.drinks[0].strDrink;

  drinkSection.appendChild(drinkName);

  let img = document.createElement('img');
  img.src = cocktail.drinks[0].strDrinkThumb;

  drinkSection.appendChild(img);

  for (let i = 1; i < 16; i++) {

    if (cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == '') {
      break;
    }

    let ingredient = document.createElement('ons-list-item');
    ingredient.innerHTML =
      cocktail.drinks[0][`strMeasure${i}`] +
      ": " +
      cocktail.drinks[0][`sstrIngredient${i}`];

    drinkSection.appendChild(ingredient);


  }
  let card = document.createElement('ons-card');
  card.innerHTML = cocktail.drinks[0].strInstructions;

  drinkSection.appendChild(card);
}
// End Random Cocktail Example

//Named Cocktail Query
 document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
        .innerHTML = event.tabItem.getAttribute('label');
});

function getNamedCocktail(){
    fetch("www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data);
          displayNamedCocktail (data);

        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
    }
    getNamedCocktail();

    function displaynamedCocktail(cocktail){
        console.log(cocktail[0]);

        let drinkSection = document.querySelector('#drink-section');

        let drinkName = document.createElement('h2');

        drinkName.innerHTML =cocktail.drinks[0].strDrink;

        drinkSection.appendChild(drinkName);

        let img = document.createElement('img');
        img.src = cocktail.drinks[0].strDrinkThumb;

        drinkSection.appendChild(img);

    for (let i = 1; i < 16; i++) {

        if (cocktail.drinks[0]['strIngedient${i}'] == null || cocktail.drinks[0]['strIngedient${i}'] == ''){
            break;
        }

        let ingredient  = document.createElement('ons-list-item');
        ingredient.innerHTML =  cocktail.drinks[0]['strMeasure${i}']+ ':' + cocktail.drinks[0]["strIngedient${i}"];

        drinkSection.appendChild(ingredient);


    }



    // location function
    let card = document.createElement ('ons-card');
    card.innerHTML = cocktail.drinks[0].strInstructions;
    
    drinkSection.appendChild(card3);

 document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
        .innerHTML = event.tabItem.getAttribute('label');
});

function getLiquorLocation(){
    fetch("www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data);
          displayNamedCocktail (data);

        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
    }
    getNamedCocktail();

    function displaynamedCocktail(cocktail){
        console.log(cocktail[0]);

        let drinkSection = document.querySelector('#drink-section');

        let drinkName = document.createElement('h2');

        drinkName.innerHTML =cocktail.drinks[0].strDrink;

        drinkSection.appendChild(drinkName);

        let img = document.createElement('img');
        img.src = cocktail.drinks[0].strDrinkThumb;

        drinkSection.appendChild(img);

    for (let i = 1; i < 16; i++) {

        if (cocktail.drinks[0]['strIngedient${i}'] == null || cocktail.drinks[0]['strIngedient${i}'] == ''){
            break;
        }

        let ingredient  = document.createElement('ons-list-item');
        ingredient.innerHTML =  cocktail.drinks[0]['strMeasure${i}']+ ':' + cocktail.drinks[0]["strIngedient${i}"];

        drinkSection.appendChild(ingredient);

    }
    let card = document.createElement ('ons-card');
    card.innerHTML = cocktail.drinks[0].strInstructions;
    
    drinkSection.appendChild(card2);





