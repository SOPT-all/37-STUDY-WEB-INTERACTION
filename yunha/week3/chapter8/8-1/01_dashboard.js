import { get$, getAll$ } from "../utils.js";

document.addEventListener("DOMContentLoaded", () => {
  get$(".js-viewChange").addEventListener("click", viewChangeHandler);
});

const viewChangeHandler = (event) => {
  const $target = event.target.closest("button");

  if (!$target || $target.classList.contains("active")) {
    return;
  }

  setViewType($target.dataset.type);
};

const setViewType = (viewType = "thumbnail") => {
  get$(".js-viewChange .active")?.classList.remove("active");
  get$(`.js-viewChange [data-type="${viewType}"]`).classList.add("active");
  get$(".js-viewType").dataset.type = viewType;
};
