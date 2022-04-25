// start with an empty page with the two buttons to load the page 

//have javascript create the HTML 


//1. pop prompting the user to confirm that they are 21 and over
// if user selects yes they can be directed to the website
// if user selects no, direct them to a kids oriented website-> thought to build chid friend drink recipes 
// Need to use modals -> not prompt but would be good to start with prompt first 

// confirm("Are you over the age th 21?");

var modalEL = document.querySelector('#modal-buttons');
var drinkBodyEL = document.querySelector('#drink-Body');
var confirmYes = document.querySelector('#modal-confirm-yes');
var confirmNo = document.querySelector('#modal-confirm-no');


// confirmYes.addEventListener("click", function (event) {
//     var target = event.target;
//     drinkBodyEL.removeAttribute("class");
// });

// confirmNo.addEventListener("click", function (event) {
//     var target = event.target;

//     modalEL.textContent = "Sorry! You're too young!";

// });



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
            modalEL.setAttribute("class", "result");
            setTimeout(function () {
                modalEL.setAttribute("class", "result hide");
            }, 1000);
            document.location.href = "https://www.randomkittengenerator.com/";

        }
    } else {
        event.preventDefault();
        console.log("clicked the div");

    }


});



//2. submitting items to local storage returning them to the page and then displaying the info the user 

var itemsInput = document.querySelector('#drinkNames'); //input field for drinkName 
var itemSubmitBtn = document.querySelector('#getMyDrinkSubmit'); // save items button
//local storage
itemSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var items = {
        item: itemsInput.value.trim()
    };

    // set new submission to local storage 
    localStorage.setItem("items", JSON.stringify(items));
    var test = JSON.parse(localStorage.getItem('items'));
    console.log(test.itemsInput);

});

//3. api pull

//4. returning data from API 