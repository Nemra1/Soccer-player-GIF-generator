// var for our players
const topics = ["Lionel Messi", "Cristiano Ronaldo", "Wayne Rooney", "Miguel Almiron", "Pele", "Diego Maragona", "Neymar"];

// function to render buttons
 renderButtons = () => {
    // empty div before adding new buttons
    $("#giphy-buttons").empty();
    // for loop to creat buttons for our topics
    for (i = 0; i < topics.length; i++) {
        const newButton = $("<button>");
        newButton.addClass("player-button");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#giphy-buttons").append(newButton);
        newButton.css({
            "background-color": "#007bff",
            "color": "white",
            "margin": "10px",
            "font-weight": "400",
            "border": "1px solid transparent",
            "padding": ".375rem .75rem",
            "font-size": "1rem",
            "border-radius": ".25rem"
        })
    }
}

// call the renderButtons function to render our buttons to the page
renderButtons()

// click function to add new buttons to the topics array on click of the submit button 
$(".btn-primary").on("click", event => {
    event.preventDefault();
    // grab the input from textbox
    const newPlayerButton = $("#inlineFormInputName2").val().trim();
    // adding new player button to topics array
    topics.push(newPlayerButton);
    renderButtons();
})

// click function for our buttons
$(document).on("click", ".player-button", function (event) {

    event.preventDefault();
    // empty the gif div
    $("#giphy-div").empty();
    // var to store data name attr for clicked player button
    const player = $(this).attr("data-name");
    // query url for ajax call
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ctCvEkxbAmDzRZG7zRbcjTkZQ39p0Rva&q=" + player + "&limit=25&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // loop to display 10 GIFs each time a player button is clicked

        for (i = 0; i < 4; i++) {
            // create a new div for our chosen player
            const playerDiv = $("<div class='player-item'>")
            // store the gif path in a variable with an image tag
            const stillGIF = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            // give stillGIF a class of "gif"
            stillGIF.addClass("gif");
            // add attributes to stillGIF
            stillGIF.attr("data-state", "still");

            stillGIF.attr("data-animate", response.data[i].images.fixed_height.url)

            stillGIF.attr("data-still", response.data[i].images.fixed_height_still.url)
            // add p tag to hold our rating
            const gifRating = $("<p>").text("Rating: " + response.data[i].rating)
            // append gif and rating to gifdiv 
            // $(".gif-div").append(stillGIF, gifRating);
            playerDiv.append(stillGIF)
            // append the still gif and rating to the giphy div
            $("#giphy-div").append(playerDiv);
        }
    });
})

// click function to animate GIFs
$(document.body).on("click", ".gif", function (event) {
    event.preventDefault();

    const state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

