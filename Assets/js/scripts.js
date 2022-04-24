
//1. pop prompting the user to confirm that they are 21 and over
// if user selects yes they can be directed to the website
// if user selects no, direct them to a kids oriented website-> thought to build chid friend drink recipes 
// Need to use modals -> not prompt but would be good to start with prompt first 


//2. submitting items to local storage returning them to the page and then displaying the, 

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

