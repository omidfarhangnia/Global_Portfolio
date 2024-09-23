const navLinks = document.querySelectorAll(".nav--links");
const isTouchSupported = "ontouchstart" in document.documentElement;
let isMovingAllowed = true;
let pageData = {
  prevPage: 5,
  currentPage: 1,
  nextPage: 2,
};

animateSideNav();

if (isTouchSupported) {
  Observer.create({
    target: window,
    type: "pointer",
    onUp: (e, a) => {
      if (!isMovingAllowed) return;
      goNextPage();
    },
    onDown: (e) => {
      if (!isMovingAllowed) return;
      goPreviousPage();
    },
  });
} else {
  Observer.create({
    target: window,
    type: "wheel",
    onUp: (e, a) => {
      if (!isMovingAllowed) return;
      goPreviousPage();
    },
    onDown: (e) => {
      if (!isMovingAllowed) return;
      goNextPage();
    },
  });
}

function goNextPage() {
  setStyle("next");
  updatePageNumbers("next");
  animateSideNav("next");
  updateActivePage();
}

function goPreviousPage() {
  setStyle("previous");
  updatePageNumbers("previous");
  animateSideNav("previous");
  updateActivePage();
}

function setStyle(status) {
  const tl = gsap.timeline();

  tl.to(`.page__num__${pageData.currentPage}`, {
    y: "-=50px",
    duration: 0.3,
    opacity: 0,
    ease: "circ.in",
    onStart: () => {
      isMovingAllowed = false;
    },
  })
    .set(`.page__num__${pageData.currentPage}`, {
      y: 0,
      zIndex: "-1",
      opacity: 1,
    })
    .set(
      `.page__num__${
        status === "next" ? pageData.nextPage : pageData.prevPage
      }`,
      {
        zIndex: "1",
        opacity: 0,
      }
    )
    .from(
      `.page__num__${
        status === "next" ? pageData.nextPage : pageData.prevPage
      }`,
      {
        y: "+=50px",
        duration: 0.3,
        opacity: "1",
        onComplete: () => {
          isMovingAllowed = true;
        },
      }
    );
}

function increaseNum(vairable) {
  if (pageData[vairable] === 5) {
    pageData[vairable] = 1;
  } else {
    pageData[vairable]++;
  }
}

function decreaseNum(vairable) {
  if (pageData[vairable] === 1) {
    pageData[vairable] = 5;
  } else {
    pageData[vairable]--;
  }
}

function updatePageNumbers(status) {
  if (status === "next") {
    // updating data in next status
    increaseNum("prevPage");
    increaseNum("currentPage");
    increaseNum("nextPage");
  } else if (status === "previous") {
    // updating data in previous status
    decreaseNum("prevPage");
    decreaseNum("currentPage");
    decreaseNum("nextPage");
  }
}

function animateSideNav(status) {
  const tl = gsap.timeline();

  tl.to(
    `.pageNav-num-${pageData.currentPage} .number`,
    {
      x: "-50",
      color: "#ffffff",
      duration: 0.5,
    },
    "startTogether"
  )
    .to(
      `.pageNav-num-${pageData.currentPage} .ball`,
      {
        scale: 5,
        duration: 0.5,
        delay: 0.3,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${pageData.currentPage} .label`,
      {
        opacity: 1,
        color: "#ffffff",
        delay: 0.3,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${
        status === "next" ? pageData.prevPage : pageData.nextPage
      } .number`,
      {
        x: "0",
        color: "#555555",
        duration: 0.5,
        delay: 0.3,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${
        status === "next" ? pageData.prevPage : pageData.nextPage
      } .ball`,
      {
        scale: 1,
        duration: 0.5,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${
        status === "next" ? pageData.prevPage : pageData.nextPage
      } .label`,
      {
        opacity: 0,
        color: "#555555",
      },
      "startTogether"
    );
}

function updateActivePage() {
  const currentActivePage = document.querySelector(".active--page");
  currentActivePage.classList.remove("active--page");
  navLinks[pageData.currentPage - 1].classList.add("active--page")
}

// perspective animation
let persIsActive = false;
const pageContainer = document.querySelector(".pageContainer");
const navToggle = document.querySelector(".nav--toggle");
const main = document.querySelector("main");
navToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  if (persIsActive) {
    pageContainer.classList.remove("perspectivePage");
    main.classList.remove("cursor-pointer");
    persIsActive = false;
  } else {
    pageContainer.classList.add("perspectivePage");
    main.classList.add("cursor-pointer");
    persIsActive = true;
  }
});

pageContainer.addEventListener("click", function (e) {
  e.stopPropagation();
  if (persIsActive) {
    pageContainer.classList.remove("perspectivePage");
    main.classList.remove("cursor-pointer");
    persIsActive = false;
  }
});
