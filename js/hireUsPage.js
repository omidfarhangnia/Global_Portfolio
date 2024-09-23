const checkboxes = document.querySelectorAll(".page5-checkbox");
const inputs = document.querySelectorAll(".page5-input");
const workStatus = {
  appDesign: false,
  uxDesign: false,
  graphicDesigh: false,
  webDesign: false,
  motionDesign: false,
  marketing: false,
};

checkboxes.forEach((member) => {
  member.addEventListener("click", () => {
    const selectStatus = member.getAttribute("status");
    const objLabel = member.getAttribute("objLabel");

    if (selectStatus === "selected") {
      member.setAttribute("status", "not-selected");
      workStatus[objLabel] = false;
    } else {
      member.setAttribute("status", "selected");
      workStatus[objLabel] = true;
    }
  });
});

inputs.forEach((member) => {
  member.addEventListener("focus", () => {
    const prevLabel = member.previousElementSibling;
    prevLabel.classList.add("focused-label");
  });
  member.addEventListener("focusout", () => {
    const prevLabel = member.previousElementSibling;
    if (member.value === "") {
      prevLabel.classList.remove("focused-label");
    }
  });
});
