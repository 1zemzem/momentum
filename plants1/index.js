const body = document.body;
const burger = document.getElementById("burger");
const line = document.querySelectorAll(".burger__field_line");
burger.addEventListener("click", burgerHandler);

function burgerHandler(e) {
  e.preventDefault();
  burger.classList.toggle("burger__field-active");
  line.forEach((element) => {
    element.classList.toggle("burger__field_line-active");
  });
  body.classList.toggle("noscroll");  
}
