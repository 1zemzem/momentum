const body = document.body;
const burger = document.getElementById("burger");
const burgerField = document.getElementById("burgerfield");
const line = document.querySelectorAll(".burger__field_line");
const navList = document.getElementById("nav-list").cloneNode(1);
const navMobile = document.getElementById("nav-mobile");
const navLinks = Array.from(navList.children);
const ServiceButtons = document.querySelector(
  ".section-service__heading-buttons"
);
const buttons = document.querySelectorAll(
  ".section-service__heading-buttons-item"
);
const cards = document.querySelectorAll(".card")

console.log(cards);

window.onload = function () {
  addServiceButtonsClickHandler();
};

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

const addServiceButtonsClickHandler = () => {
  ServiceButtons.addEventListener("click", (e) => {
    let selectedButton = e.target;  
    removeClickedButton();
    selectClickedButton(selectedButton);
    filterByClickedButton(selectedButton.innerText);
  });
};

const removeClickedButton = () => {
  buttons.forEach((button) => {
    button.classList.remove("section-service__heading-buttons-item-selected");
    button.classList.add("section-service__heading-buttons-item");
  });
};

const selectClickedButton = (selectedButton) => {
  selectedButton.classList.toggle(
    "section-service__heading-buttons-item-selected"
  );
  selectedButton.classList.remove("section-service__heading-buttons-item");
};

const filterByClickedButton = (selectedButton) => {
  
  cards.forEach(card => {
      card.classList.add('card-blur');
           
      cards.forEach(card => {
        console.log(selectedButton);
        // console.log(card.classList.contains(selectClickedButton))
        
          if (card.classList.contains(selectedButton)) {
              card.classList.remove('card-blur');
              card.classList.add('card')
              console.log(card)
          }
      })
  })
}