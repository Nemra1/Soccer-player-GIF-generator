# Giphy-project
In this project we have a basic webpage displaying gifs for soccer players. click any name to see GIFs of your favorite player!
We start with project with a static array of player names. Using jquery and a for loop we loop through the array create buttons
for each player. Upon click of any individual players button, we use an ajax call to the giphy API to populate our page with 
10 GIFs relative to the correspdonding player. Using an input field and jquery the user can add another button for their personal 
favorite players. For this we use another on click listener for the "submit" button and dynimically add a new button for the player
entered into the input field by the user. The GIFs load on the page as static images, when clicked they will animate and play the ful
GIF. Using if/else statements upon click the image data state will change from still to animate and vice-versa.
