import { get$, getAll$ } from "../utils.js";

const setTheme = (theme = "light") => {
  document.documentElement.setAttribute("class", theme);
};

const themeChangeHandler = (event) => {
  const theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  const $theme = event.target
    .closest("button")
    .querySelector(`[data-theme="${theme}"]`);

  if ($theme) {
    setTheme($theme.dataset.theme);
  }
};

const openCommunity = () => {
  get$(".js-community").classList.add("active");
};

const closeCommunity = () => {
  get$(".js-community").classList.remove("active");
};

document.addEventListener("DOMContentLoaded", () => {
  setViewType(localStorage.getItem("viewType"));

  setActiveFavorite(JSON.parse(localStorage.getItem("favorites")));

  get$(".js-viewChange").addEventListener("click", viewChangeHandler);
  get$(".js-openCommunity").addEventListener("click", openCommunity);
  get$(".js-closeCommunity").addEventListener("click", closeCommunity);
  get$(".js-theme").addEventListener("click", themeChangeHandler);
  get$(".js-favorite").addEventListener("click", toggleFavorite);
  get$("body").style.visibility = "visible";
  setTheme(localStorage.getItem("theme"));
});

const viewChangeHandler = (event) => {
  const $target = event.target.closest("button");

  if (!$target || $target.classList.contains("active")) {
    return;
  }

  setViewType($target.dataset.type);
  localStorage.setItem("viewType", $target.dataset.type); //로컬 저장
};

const setViewType = (viewType = "thumbnail") => {
  get$(".js-viewChange .active")?.classList.remove("active");
  get$(`.js-viewChange [data-type="${viewType}"]`).classList.add("active");
  get$(".js-viewType").dataset.type = viewType;
};

const toggleFavorite = (event) => {
  if (!event.target.closest("button")) {
    return;
  }
  event.target.closest(".list").classList.toggle("active");
};

window.addEventListener("beforeunload", () => {
  localStorage.setItem("viewType", get$(".js-viewType").dataset.type);
  localStorage.setItem("theme", document.documentElement.getAttribute("class"));
  localStorage.setItem(
    "favorites",
    getActiveFavorite([...getAll$(".js-favorite .list")])
  );
});

const getActiveFavorite = ([...$favorites]) => {
  const result = $favorites.map(($element) =>
    $element.classList.contains("active")
  );
  return JSON.stringify(result);
};

const setActiveFavorite = ([...favorites]) => {
  [...getAll$(".js-favorite .list")].forEach((list, index) => {
    list.classList.toggle("active", favorites[index]);
  });
};
