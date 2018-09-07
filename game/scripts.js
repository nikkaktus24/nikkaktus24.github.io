const navHeight = 70;
const navBar = document.querySelector("#navBar");
const navList = document.querySelector("#navList");
const menuToggle = document.querySelector(".menuToggle");
const modalWindowWrapper = document.querySelector("#modalWindowWrapper");
const modalWindow = document.querySelector("#modalWindow");
const gallery = document.querySelector("#gallery");

window.addEventListener('scroll',(e) => {
  if(window.pageYOffset > navHeight) {
    navBar.classList.add("_fixed","_backgroundly");
  }
  if(window.pageYOffset < navHeight) {
    navBar.classList.remove("_fixed","_backgroundly");
  }
});

menuToggle.addEventListener('click',(e) => {
  navList.classList.toggle("_hidden");
});

gallery.addEventListener('click', (e) => {
  if(e.target.classList.contains("screenshot-bg")) {
    modalWindowWrapper.classList.toggle('_disable');
    modalWindow.innerHTML = `<img class="screenshot-big" src="./images/${e.target.id}.png" alt='Screenshot' >`;
  }
});

modalWindowWrapper.addEventListener('click', (e) => {
  modalWindowWrapper.classList.toggle('_disable');
});
