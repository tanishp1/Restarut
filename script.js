const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

const reservationForm = document.querySelector("#reservation-form");
const reservationDate = reservationForm.elements.date;
const formStatus = document.querySelector("#form-status");

reservationDate.min = new Date().toISOString().slice(0, 10);
document.querySelector("#year").textContent = new Date().getFullYear();

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const details = new FormData(reservationForm);
  const subject = `Reservation request for ${details.get("name")}`;
  const body = [
    `Name: ${details.get("name")}`,
    `Email: ${details.get("email")}`,
    `Date: ${details.get("date")}`,
    `Time: ${details.get("time")}`,
    `Party size: ${details.get("guests")}`,
  ].join("\n");

  window.location.href = `mailto:hello@saffronandstone.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = "Your email app should open with your reservation request. Your table is confirmed only after we reply.";
});
