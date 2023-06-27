const imageStates = {
  player1: {}, // Separate image states for player 1
  player2: {}  // Separate image states for player 2
};

function changeImage(element) {
  const img = element.querySelector('img');
  const alt = img.getAttribute('alt');
  
  // Extract the player and number from the alt attribute
  const [player, number] = alt.split('-');
  
  // Check if the image state is already stored for this player and number
  if (!imageStates[player][number]) {
    // If it's not stored, set the first image as the current state
    imageStates[player][number] = {
      currentImage: 0,
      images: ['/img/minus.png', '/img/1_points.png', '/img/2_points.png', '/img/3_points.png'],
      value: parseInt(number),
      lastImageClicked: false,
      scoreIncreased: false
    };
  } else {
    // If the image state is already stored, increment the current image state
    const totalImages = imageStates[player][number].images.length;
    let currentImage = imageStates[player][number].currentImage;
    currentImage++;

    // Check if the current image state exceeds the number of images available
    if (currentImage >= totalImages) {
      if (!imageStates[player][number].lastImageClicked) {
        // If it's the first click on the last image, update the score for the respective player
        const scoreDiv = document.querySelector(`#${player}Score`);
        const score = parseInt(scoreDiv.textContent);
        const value = imageStates[player][number].value;
        scoreDiv.textContent = score + value;

        imageStates[player][number].lastImageClicked = true;
        imageStates[player][number].scoreIncreased = true;
      } else {
        // If it's not the first click on the last image and the score is already increased
        if (imageStates[player][number].scoreIncreased) {
          // Increment the score directly without updating the image state
          const scoreDiv = document.querySelector(`#${player}Score`);
          const score = parseInt(scoreDiv.textContent);
          const value = imageStates[player][number].value;
          scoreDiv.textContent = score + value;
        }
      }

      currentImage = totalImages - 1;
    }

    imageStates[player][number].currentImage = currentImage;
  }

  const currentImage = imageStates[player][number].currentImage;
  const imageURL = imageStates[player][number].images[currentImage];
  img.src = imageURL;
}

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});
