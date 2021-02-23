// Check if there's Local Storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log("Local Storage is not empty you can set it on root now");
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach(function (ele) {
    ele.classList.remove("active");

    // Add active class on element with data color === local storage item
    if (ele.dataset.color === mainColors) {
      // Add active class
      ele.classList.add("active");
    }
  });
}

// Random background option
let backgroundOption = true;

// Variable to control the background interval
let backgroundInterval;

// Check if there's local storage random background items
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random backgroud local storage is not empty
if (backgroundLocalItem !== null) {
  // console.log(backgroundLocalItem);
  // console.log(typeof(backgroundLocalItem));

  // Remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach(function (ele) {
    ele.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle spin class on icon
document.querySelector(".toggle-settings i").onclick = function () {
  "use strict";

  // Toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // Toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
  const eleBoxShadow = document.querySelector(".settings-box").style.boxShadow;
  if (eleBoxShadow == "") {
    document.querySelector(".settings-box").style.boxShadow =
      "2px 0 10px 0px #555";
  } else {
    document.querySelector(".settings-box").style.boxShadow = "";
  }
  console.log(eleBoxShadow);
};

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on all list items
colorsLi.forEach(function (li) {
  // Click on every list items
  li.addEventListener("click", function (e) {
    // Set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random Background Option
const randomBGelements = document.querySelectorAll(".random-backgrounds span");

// Loop on all spans
randomBGelements.forEach(function (li) {
  // Click on every span
  li.addEventListener("click", function (e) {
    handleActive(e);

    if (e.target.dataset.bg === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to randomize images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background image url
      landingPage.style.backgroundImage =
        "url('images/" + imgsArray[randomNumber] + "')";
    }, 1000);
  }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  // let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  // let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  // windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight
  if (windowScrollTop > skillsOffsetTop) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach(function (skill) {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(function (img) {
  img.addEventListener("click", function (e) {
    // Create overlay element
    let overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Create the popup box
    let popupBox = document.createElement("div");

    // Add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text for heading
      let imgText = document.createTextNode(img.alt);

      // Append the text to the heading
      imgHeading.appendChild(imgText);

      // Prepend the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // Create the image
    let popupImage = document.createElement("img");

    // Set image source
    popupImage.src = img.src;

    // Add image to popup box
    popupBox.appendChild(popupImage);

    // Append the popup box to body
    document.body.appendChild(popupBox);

    // Create the close span
    let closeBtn = document.createElement("span");

    // Create the close button text
    let closeBtnText = document.createTextNode("X");

    // Append text to close button
    closeBtn.appendChild(closeBtnText);

    // Add class to close button
    closeBtn.className = "close-button";

    // Add close button to the popup box
    popupBox.appendChild(closeBtn);
    // closeBtn.onclick = function (e) {

    //   if (e.target.className == 'close-button') {

    //     // Remove the current popup
    //     e.target.parentNode.remove();

    //     // Remove Overlay
    //     document.querySelector(".popup-overlay").remove();

    //   }

    // };
  });
});

// close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove the current popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach(function (ele) {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle active state
function handleActive(ev) {
  // Remove active class from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  // Add active class on self
  ev.target.classList.add("active");
}

const bulletsSpan = document.querySelectorAll(".bullets-option span"),
  bulletsContainer = document.querySelector(".nav-bullets"),
  bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach(function (span) {
    span.classList.remove("active");
  });

  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "block") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", span.dataset.display);
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", span.dataset.display);
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = () => {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
