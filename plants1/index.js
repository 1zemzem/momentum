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
const cards = document.querySelectorAll(".card");
const accordion = document.querySelectorAll(".prices-column__list-item");
const content = document.querySelectorAll(".prices-column__list-paper");

const pricesPaperHeader = document.querySelectorAll(
  ".prices-column__list-paper-open_header"
);
const selectWrapper = document.querySelector(".section-contacts__wrapper");
const selectHeader = document.querySelectorAll(".select__header");
const selectBody = document.querySelectorAll(".select__body");
const selectItem = document.querySelectorAll(".select__item");
const selectInfo = document.querySelectorAll(".select__contacts-info");

console.log(selectWrapper);

window.onload = function () {
  addServiceButtonsClickHandler();
};

//burger
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

//section-service
const addServiceButtonsClickHandler = () => {
  ServiceButtons.addEventListener("click", (e) => {
    let selectedButton = e.target;
    if (
      selectedButton.classList.contains("section-service__heading-buttons-item")
    ) {
      removeClickedButton();
      selectClickedButton(selectedButton);
      filterByClickedButton(selectedButton.innerText);
    }
  });
};

const removeClickedButton = () => {
  buttons.forEach((button) => {
    button.classList.remove("section-service__heading-buttons-item-selected");
    button.classList.add("section-service__heading-buttons-item");
  });
};

const selectClickedButton = (selectedButton) => {
  console.log(selectedButton);
  selectedButton.classList.add(
    "section-service__heading-buttons-item-selected"
  );
};

const filterByClickedButton = (selectedButton) => {
  cards.forEach((card) => {
    card.classList.add("card-blur");
    cards.forEach((card) => {
      if (card.classList.contains(selectedButton)) {
        card.classList.remove("card-blur");
        card.classList.add("card");
      }
    });
  });
};

//section-prices
accordion.forEach((el) => {
  el.addEventListener("click", () => {
    accordion.forEach((el) => {
      let contEl = el.nextElementSibling;
      el.classList.remove("prices-column__list-item-hidden");
      contEl.classList.remove("prices-column__list-paper-open");
    });
    let contEl = el.nextElementSibling;
    el.classList.add("prices-column__list-item-hidden");
    contEl.classList.add("prices-column__list-paper-open");
  });
});

pricesPaperHeader.forEach((el) => {
  el.addEventListener("click", () => {
    content.forEach((el) => {
      el.classList.remove("prices-column__list-paper-open");
    });
    accordion.forEach((el) => {
      el.classList.remove("prices-column__list-item-hidden");
    });
  });
});

//section-contacts
selectHeader.forEach((item) => {
  item.addEventListener("click", selectToggle);
});

selectItem.forEach((item) => {
  item.addEventListener("click", selectChoosen);
});

function selectToggle() {
  this.parentElement.classList.toggle("select-active");
  this.nextElementSibling.classList.toggle("select__body-active");
  selectInfo.forEach((el) => {
    el.classList.remove("select__contacts-info-active");
    el.classList.add("select__contacts-info");
  });
}

function selectChoosen() {
  let text = this.innerText,
    select = this.closest(".select");
  currentText = select.querySelector(".select__header-title");
  currentText.innerText = text;
  select.classList.remove("select-active");
  select.classList.add("select-green");
  selectWrapper.classList.add("section-contacts__wrapper-active");
  selectBody.forEach((el) => {
    el.classList.remove("select__body-active");
  });
  selectInfo.forEach((el) => {
    console.log(el.id);
    if (el.id == text) {
      el.classList.remove("select__contacts-info");
      el.classList.add("select__contacts-info-active");
    }
  });
}
