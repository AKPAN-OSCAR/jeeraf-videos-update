const dateCardTimeout = 2 * 60 * 1000;
let activeDateCard = null;
let dateCardTimer = null;

const themeToggle = document.querySelector("[data-theme-toggle]");

if (!(themeToggle instanceof HTMLButtonElement)) {
  throw new Error("The theme toggle button is missing.");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem("jeeraf-theme", theme);
}

const savedTheme = localStorage.getItem("jeeraf-theme");
setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function closeDateCard(restoreFocus = false) {
  if (!activeDateCard) {
    return;
  }

  const { button, popup } = activeDateCard;
  const focusIsInsidePopup = popup.contains(document.activeElement);
  popup.hidden = true;
  button.setAttribute("aria-expanded", "false");
  window.clearTimeout(dateCardTimer);
  dateCardTimer = null;
  activeDateCard = null;

  if (restoreFocus || focusIsInsidePopup) {
    button.focus();
  }
}

document.querySelectorAll("[data-date-toggle]").forEach((button) => {
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error("Video date toggles must be buttons.");
  }

  const popupId = button.getAttribute("aria-controls");
  const popup = popupId ? document.getElementById(popupId) : null;
  const closeButton = popup?.querySelector("[data-date-close]");

  if (!(popup instanceof HTMLDivElement) || !(closeButton instanceof HTMLButtonElement)) {
    throw new Error(`Video date popup is missing for toggle: ${popupId ?? "unknown"}.`);
  }

  button.addEventListener("click", () => {
    if (activeDateCard?.popup === popup) {
      closeDateCard(true);
      return;
    }

    closeDateCard();
    popup.hidden = false;
    button.setAttribute("aria-expanded", "true");
    activeDateCard = { button, closeButton, popup };
    dateCardTimer = window.setTimeout(() => closeDateCard(), dateCardTimeout);
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => closeDateCard(true));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeDateCard) {
    closeDateCard(true);
  }
});
