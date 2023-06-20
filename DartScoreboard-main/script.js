// Object to store the current image state for each list item
const imageStates = {};

function changeImage(element) {
  const img = element.querySelector('img');
  const alt = img.getAttribute('alt');
  
  // Check if the image state is already stored for this list item
  if (!imageStates[alt]) {
    // If it's not stored, set the first image as the current state
    imageStates[alt] = {
      currentImage: 0,
      images: ['/img/minus.png', '/img/1_points.png', '/img/2_points.png', '/img/3_points.png'], // Add the image URLs for different states
      value: parseInt(alt), // Set the initial value based on the alt attribute
      lastImageClicked: false, // Track if the last image is clicked
      scoreIncreased: false // Track if the score has been increased after clicking the last image
    };
  } else {
    // If the image state is already stored, increment the current image state
    const totalImages = imageStates[alt].images.length;
    let currentImage = imageStates[alt].currentImage;
    currentImage++;

    // Check if the current image state exceeds the number of images available
    if (currentImage >= totalImages) {
      // If it exceeds, set it to the last index
      
      // Check if the last image is already clicked
      if (!imageStates[alt].lastImageClicked) {
        // If it's the first click on the last image, update the score
        const scoreDiv = document.querySelector('.score');
        const score = parseInt(scoreDiv.textContent);
        const value = imageStates[alt].value;
        scoreDiv.textContent = score + value;
        
        // Set the flag to indicate that the last image is clicked
        imageStates[alt].lastImageClicked = true;
        imageStates[alt].scoreIncreased = true;
      } else {
        // If it's not the first click on the last image, and score is already increased
        if (imageStates[alt].scoreIncreased) {
          // Increment the score directly without updating the image state
          const scoreDiv = document.querySelector('.score');
          const score = parseInt(scoreDiv.textContent);
          const value = imageStates[alt].value;
          scoreDiv.textContent = score + value;
        }
      }
      
      // Set the current image state to the last index
      currentImage = totalImages - 1;
    }

    imageStates[alt].currentImage = currentImage;
  }

  // Set the new image URL based on the current image state
  const currentImage = imageStates[alt].currentImage;
  const imageURL = imageStates[alt].images[currentImage];
  img.src = imageURL;
}

// Clear imageStates object when the page is refreshed
window.addEventListener('beforeunload', function () {
  localStorage.clear();
});
