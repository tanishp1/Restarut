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
const reservationDialog = document.querySelector("#reservation-dialog");
const dialogDetails = document.querySelector("#dialog-details");
const reservationEmailLink = document.querySelector("#reservation-email-link");

reservationDate.min = new Date().toISOString().slice(0, 10);
document.querySelector("#year").textContent = new Date().getFullYear();

reservationDialog.querySelector(".dialog-close").addEventListener("click", () => {
  reservationDialog.close();
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const details = new FormData(reservationForm);
  const date = new Date(`${details.get("date")}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  dialogDetails.textContent = `${details.get("guests")} · ${date} · ${details.get("time")}`;
  const subject = `Reservation request for ${details.get("name")}`;
  const body = [
    `Name: ${details.get("name")}`,
    `Email: ${details.get("email")}`,
    `Date: ${details.get("date")}`,
    `Time: ${details.get("time")}`,
    `Party size: ${details.get("guests")}`,
  ].join("\n");

  reservationEmailLink.href = `mailto:hello@saffronandstone.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  reservationDialog.showModal();
});
