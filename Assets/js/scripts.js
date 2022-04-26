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

var drinkResults =
JSON.parse(window.localStorage.getItem("drinkResults")) || [];

//set this to an event listener 
var saveUserDrinks = function () {
    // get value of input box
    var userDrinkInput = drinkInputEL.value.trim();
    var userZipCodeInput = zipCodeInputEL.value.trim();

    if (userDrinkInput !== "" && userZipCodeInput !== "") {
        // get saved scores from local storage, or if not any, set to empty array
        // var drinkResults =
        //     JSON.parse(window.localStorage.getItem("drinkResults")) || [];

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


    // either get scores from local storage or set to empty array
    // var drinkResults = JSON.parse(window.localStorage.getItem("userCustomDrink"));
    console.log(drinkResults);

// how we can not loop through the array each time we add something new ? 

    drinkResults.forEach(function ({zipCode, drink}) {
        console.log(zipCode); // ask about this in class 
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = drink + " & " + zipCode;

        // display on page
        var olEl = document.getElementById("user-results");
        olEl.appendChild(liEl);

    });
};







//2. submitting items to local storage returning them to the page and then displaying the info the user 

//3. api pull

//4. returning data from API 