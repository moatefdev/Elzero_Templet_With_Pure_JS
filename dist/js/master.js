"use strict";var mainColors=localStorage.getItem("color_option");null!==mainColors&&(document.documentElement.style.setProperty("--main-color",mainColors),document.querySelectorAll(".colors-list li").forEach(function(e){e.classList.remove("active"),e.dataset.color===mainColors&&e.classList.add("active")}));var backgroundInterval,backgroundOption=!0,backgroundLocalItem=localStorage.getItem("background_option");null!==backgroundLocalItem&&(document.querySelectorAll(".random-backgrounds span").forEach(function(e){e.classList.remove("active")}),"true"===backgroundLocalItem?(backgroundOption=!0,document.querySelector(".random-backgrounds .yes").classList.add("active")):(backgroundOption=!1,document.querySelector(".random-backgrounds .no").classList.add("active"))),document.querySelector(".toggle-settings i").onclick=function(){this.classList.toggle("fa-spin"),document.querySelector(".settings-box").classList.toggle("open")};var colorsLi=document.querySelectorAll(".colors-list li");colorsLi.forEach(function(e){e.addEventListener("click",function(e){document.documentElement.style.setProperty("--main-color",e.target.dataset.color),localStorage.setItem("color_option",e.target.dataset.color),handleActive(e)})});var randomBGelements=document.querySelectorAll(".random-backgrounds span");randomBGelements.forEach(function(e){e.addEventListener("click",function(e){handleActive(e),"yes"===e.target.dataset.bg?(backgroundOption=!0,randomizeImgs(),localStorage.setItem("background_option",!0)):(backgroundOption=!1,clearInterval(backgroundInterval),localStorage.setItem("background_option",!1))})});var landingPage=document.querySelector(".landing-page"),imgsArray=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];function randomizeImgs(){!0===backgroundOption&&(backgroundInterval=setInterval(function(){var e=Math.floor(Math.random()*imgsArray.length);landingPage.style.backgroundImage="url('images/"+imgsArray[e]+"')"},1e3))}randomizeImgs();var ourSkills=document.querySelector(".skills");window.onscroll=function(){ourSkills.offsetTop+ourSkills.offsetHeight-this.innerHeight<this.pageYOffset&&document.querySelectorAll(".skill-box .skill-progress span").forEach(function(e){e.style.width=e.dataset.progress})};var ourGallery=document.querySelectorAll(".gallery img");ourGallery.forEach(function(n){n.addEventListener("click",function(e){var t=document.createElement("div");t.className="popup-overlay",document.body.appendChild(t);t=document.createElement("div");t.className="popup-box",null!==n.alt&&(l=document.createElement("h3"),o=document.createTextNode(n.alt),l.appendChild(o),t.appendChild(l));var o=document.createElement("img");o.src=n.src,t.appendChild(o),document.body.appendChild(t);var l=document.createElement("span"),o=document.createTextNode("X");l.appendChild(o),l.className="close-button",t.appendChild(l)})}),document.addEventListener("click",function(e){"close-button"==e.target.className&&(e.target.parentNode.remove(),document.querySelector(".popup-overlay").remove())});var allBullets=document.querySelectorAll(".nav-bullets .bullet"),allLinks=document.querySelectorAll(".links a");function scrollToSomewhere(e){e.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),document.querySelector(e.target.dataset.section).scrollIntoView({behavior:"smooth"})})})}function handleActive(e){e.target.parentElement.querySelectorAll(".active").forEach(function(e){e.classList.remove("active")}),e.target.classList.add("active")}scrollToSomewhere(allBullets),scrollToSomewhere(allLinks);var bulletsSpan=document.querySelectorAll(".bullets-option span"),bulletsContainer=document.querySelector(".nav-bullets"),bulletsLocalItem=localStorage.getItem("bullets_option");null!==bulletsLocalItem&&(bulletsSpan.forEach(function(e){e.classList.remove("active")}),"block"===bulletsLocalItem?(bulletsContainer.style.display="block",document.querySelector(".bullets-option .yes").classList.add("active")):(bulletsContainer.style.display="none",document.querySelector(".bullets-option .no").classList.add("active"))),bulletsSpan.forEach(function(t){t.addEventListener("click",function(e){"block"===t.dataset.display?bulletsContainer.style.display="block":bulletsContainer.style.display="none",localStorage.setItem("bullets_option",t.dataset.display),handleActive(e)})}),document.querySelector(".reset-options").onclick=function(){localStorage.removeItem("color_option"),localStorage.removeItem("background_option"),localStorage.removeItem("bullets_option"),window.location.reload()};var toggleBtn=document.querySelector(".toggle-menu"),tLinks=document.querySelector(".links");toggleBtn.onclick=function(e){e.stopPropagation(),this.classList.toggle("menu-active"),tLinks.classList.toggle("open")},document.addEventListener("click",function(e){e.target!==toggleBtn&&e.target!==tLinks&&tLinks.classList.contains("open")&&(toggleBtn.classList.toggle("menu-active"),tLinks.classList.toggle("open"))}),tLinks.onclick=function(e){e.stopPropagation()};
//# sourceMappingURL=master.js.map
