

var itemsInput = document.querySelector('#items'); //input field for initials 
var itemSubmitBtn = document.querySelector('#submitBtn'); // save high scores
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