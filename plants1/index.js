const body = document.body;
const burger = document.getElementById("burger");
const burgerField = document.getElementById("burgerfield");
const line = document.querySelectorAll(".burger__field_line");
const navList = document.getElementById("nav-list").cloneNode(1);
const navMobile = document.getElementById("nav-mobile");
const navLinks = Array.from(navList.children);

burger.addEventListener("click", burgerHandler);

function burgerHandler(e) {
  e.preventDefault();
  burgerField.classList.toggle("burger__field-active");
  line.forEach((element) => {
    element.classList.toggle("burger__field_line-active");
  });
  body.classList.toggle("noscroll");
  navMobile.classList.toggle("nav-mobile_open");
  renderNav();
}

function renderNav() {
  navMobile.appendChild(navList);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  burgerField.classList.remove("burger__field-active");
  line.forEach((element) => {
    element.classList.remove("burger__field_line-active");
  });
  body.classList.remove("noscroll");
  navMobile.classList.remove("nav-mobile_open");
  body.classList.remove("noscroll");
}
