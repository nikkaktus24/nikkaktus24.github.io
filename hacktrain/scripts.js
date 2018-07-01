const navHeight = 70;
const navBar = document.querySelector("#navBar");
const navList = document.querySelector("#navList");
const menuToggle = document.querySelector(".menuToggle");
const logo = document.querySelector("#logo");

window.addEventListener('scroll',(e) => {
  if(window.pageYOffset > navHeight) {
    navBar.classList.add("_fixed","_backgroundly");
    logo.classList.remove("logo");
    logo.classList.add("_logo");
  }
  if(window.pageYOffset < navHeight) {
    navBar.classList.remove("_fixed","_backgroundly");
    logo.classList.add("logo");
    logo.classList.remove("_logo");
  }
});

menuToggle.addEventListener('click',(e) => {
  navList.classList.toggle("_hidden");
});
