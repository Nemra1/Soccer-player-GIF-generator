// var for our players
var topics = ["Lionel Messi", "Cristiano Ronaldo", "Zlatan Ibrahimovic", "Miguel Almiron", "Pele", "Diego Maragona", "Neymar"];
// function to render buttons
function renderButtons() {
    // empty div before adding new buttons
    $("#giphy-buttons").empty();
    // for loop to creat buttons for our toics
    for (i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("player-button");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#giphy-buttons").append(newButton);
    }
}

renderButtons()

// click function to add new buttons to the topics array
$(".btn-primary").on("click", function (event) {
    event.preventDefault();
    // grab the input from textbox
    var newPlayerButton = $("#inlineFormInputName2").val().trim();
    // adding new player button to topics array
    topics.push(newPlayerButton);
    renderButtons();
})

// click function for our buttons
$(document).on("click", ".player-button", function (event) {

    event.preventDefault();

    // var to store data name attr for clicked player button
    var player = $(this).attr("data-name");
    // query url for ajax call
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ctCvEkxbAmDzRZG7zRbcjTkZQ39p0Rva&q=" + player + "&limit=25&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // append still image to the giphy buttons div
        console.log(response)
        // loop to display 10 GIFs each time a player button is clicked
        for (i = 0; i < 10; i++) {

            // store the gif path in a variable with an image tag
            var stillGIF = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            // add p tag to hold our rating
            var gifRating = $("<p>").text("Rating: " + response.data[i].rating)
            // append the still gif and rating to the giphy div
            $("#giphy-div").append(stillGIF, gifRating);
        }

    });

})


