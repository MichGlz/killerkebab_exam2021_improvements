// window.addEventListener("load", function () {
//   const loader = document.querySelector(".loader");
//   console.log(loader);
//   loader.className += " hidden";
// });
const loader = document.querySelector(".loader");
function removeLoader() {
  loader.addEventListener("animationend", () => {
    loader.remove();
  });
  loader.classList.add("banish");
}

setTimeout(removeLoader, 2000);

let Y;
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

/*--------------height header and margin top---------*/
const marginTop = document.querySelector("header").offsetHeight;
document.documentElement.style.setProperty(
  "--headerHight",
  `${marginTop - 5}px`
);
/*---------------------------------------------------*/
/*---------------------active Section----------------*/
const sections = document.querySelectorAll(".activeSec");
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${marginTop}px 0px -${
    window.innerHeight - marginTop - 200
  }px 0px`,
};
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    let idSec = entry.target.id;
    if (idSec == "special") {
      idSec = "beer";
    }
    if (!entry.isIntersecting) {
      // console.log("aqui estuve");
      return;
    }
    activeLInk = document.querySelector(".boldActive");
    if (activeLInk) {
      activeLInk.classList.remove("boldActive");
    }
    if (idSec != "hero") {
      document.querySelector(`a[href="#${idSec}"]`).classList.add("boldActive");
    }
    // console.log(idSec);
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
  // console.log(section);
});

/*-------------------------------------------------------*/

document.querySelector(".modalWrapper .exit").addEventListener("click", hidden);
document.querySelectorAll(".takeaway").forEach((e) => {
  e.addEventListener("click", hidden);
});

function hidden() {
  document.querySelector(".optionsTakeaway").classList.toggle("hidden");
}

hamburger.addEventListener("click", mobileMenu);
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");

    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      this.querySelector("span").innerHTML = "&#10095;";
    } else {
      content.style.display = "block";
      this.querySelector("span").innerHTML = "&#10094;";
    }
  });
}
