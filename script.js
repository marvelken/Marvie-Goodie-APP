document.addEventListener("DOMContentLoaded", function () {
    // Show splash screen
    const splashScreen = document.getElementById("splashScreen");
    const mainContent = document.getElementById("mainContent");
  
    setTimeout(() => {
      splashScreen.style.display = "none";
      mainContent.style.display = "block";
    }, 7000);
  
    // Rest of the script...
    
  });
  document.addEventListener("DOMContentLoaded", function () {
    const numbers = document.querySelectorAll(".number");
    const shuffleButton = document.getElementById("shuffleButton");
  
    let shuffled = false;
    let selectedNumber = null;
    let shuffledGoodies;
  
    shuffleButton.addEventListener("click", function () {
      if (!shuffled) {
        shuffled = true;
  
        // Reset selectedNumber when shuffling
        selectedNumber = null;
  
        // Check if enough time has passed since the last pick
        const lastPickTime = localStorage.getItem("lastPickTime");
        const currentTime = new Date().getTime();
  
        if (lastPickTime && currentTime - lastPickTime < 100000) {
          showAlert("Please wait a minute before picking again.", "error");
          return;
        }
  
        // Array of goodies
        const goodies = ["1gb", "2gb", "3gb", "5gb", "10gb"];
  
        // Shuffle the goodies behind the scenes
        shuffledGoodies = shuffleArray(goodies);
  
        // Add animation to shuffle the numbers
        anime({
          targets: '.number',
          translateX: function() {
            return anime.random(-200, 200);
          },
          translateY: function() {
            return anime.random(-200, 200);
          },
          opacity: 0,
          easing: 'easeInOutQuad',
          duration: 1000,
          complete: function() {
            numbers.forEach((number, index) => {
              // Reset the number text to its original state
              number.innerText = index + 1;
              number.classList.remove("disabled");
            });
  
            // Reset styles after animation
            anime({
              targets: '.number',
              translateX: 0,
              translateY: 0,
              opacity: 1,
              easing: 'easeInOutQuad',
              duration: 300,
            });
  
            // Delay a bit to give the impression of shuffling behind the scenes
            setTimeout(() => {
              // Assign the shuffled goodies behind the scenes
              numbers.forEach((number, index) => {
                number.innerText = index + 1;
              });
            }, 200);
          }
        });
      }
    });
  
    // Event listener for clicking on a number
    numbers.forEach((number) => {
      number.addEventListener("click", function () {
        if (!shuffled) {
          showAlert("Please shuffle first!", "info");
          return;
        }
  
        // Check if the user has already picked a number
        if (selectedNumber !== null) {
          showAlert("You already picked a number!", "error");
          return;
        }
  
        // Set the selected number
        selectedNumber = number.innerText;
  
        // Save the current time to localStorage
        localStorage.setItem("lastPickTime", new Date().getTime());
  
        showAlert("You got: " + shuffledGoodies[selectedNumber - 1], "success");
        number.classList.add("disabled");
      });
    });
  
    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Custom function to show styled alerts using SweetAlert2
    function showAlert(message, icon) {
      Swal.fire({
        text: message,
        icon: icon,
        timer: 6000, // Automatically close the alert after 2 seconds
        showConfirmButton: false,
      });
    }
  });
  


  