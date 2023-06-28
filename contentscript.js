// contentScript.js

// Function to remove or hide popup ads
function removePopupAds() {
    // Get all elements on the page
    const elements = document.getElementsByTagName("*");
  
    // Loop through all elements and check for popup ad characteristics
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
  
      // Check if the element is a popup ad based on its attributes, class names, or other characteristics
      if (
        element.getAttribute("data-popup-ad") === "true" ||
        element.classList.contains("popup-ad") ||
        element.style.getPropertyValue("position") === "fixed"
        // Add more conditions as needed to identify popup ads
      ) {
        // Remove the element from the DOM
        element.remove();
  
        // Alternatively, you can hide the element by setting its CSS display property to "none"
        // element.style.display = "none";
      }
    }
  }
  
  // Run the function when the DOM is ready
  document.addEventListener("DOMContentLoaded", removePopupAds);
  