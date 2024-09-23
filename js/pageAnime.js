addEventListener("DOMContentLoaded", function () {
  const main = this.document.querySelector(".main");
  const outerNav = this.document.querySelector(".outer--nav");
  gsap.to(".main", {
    opacity: 1,
    duration: 0.5,
    ease: "expo.out",
    onComplete: function () {
      main.classList.remove("opacity-0");
      outerNav.classList.remove("opacity-0");
    },
  });
});

const navLinks = document.querySelectorAll(".nav--links");
const pageHandlerLinks = document.querySelectorAll(
  ".side--nav button, .outer--nav li"
);
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

pageHandlerLinks.forEach((member) => {
  member.addEventListener("click", function (e) {
    const btnNum = Number(member.getAttribute("btnNum"));
    const lastPage = pageData.currentPage;
    if(btnNum === lastPage) return
    setStyle("jump", btnNum);
    updatePageNumbers("jump", btnNum);
    animateSideNav("jump", lastPage);
    updateActivePage();
  });
});

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

function setStyle(status, btnNum) {
  const tl = gsap.timeline();
  const newPage = status === "next" ? pageData.nextPage : pageData.prevPage;

  tl.to(`.page__num__${pageData.currentPage}`, {
    y: "-=50px",
    duration: 0.3,
    opacity: 0,
    ease: "circ.in",
    onStart: () => {
      isMovingAllowed = false;
    },
    onComplete: () => {
      pageContainer.classList.remove("perspectivePage");
    },
  })
    .set(`.page__num__${pageData.currentPage}`, {
      y: 0,
      zIndex: "-1",
      opacity: 1,
    })
    .set(`.page__num__${status === "jump" ? btnNum : newPage}`, {
      zIndex: "1",
      opacity: 0,
    })
    .from(`.page__num__${status === "jump" ? btnNum : newPage}`, {
      y: "+=50px",
      duration: 0.3,
      opacity: "1",
      onComplete: () => {
        isMovingAllowed = true;
      },
    });
}

function increaseNum(vairable, sendValue = false, btnNum) {
  if (!sendValue) {
    if (pageData[vairable] === 5) {
      pageData[vairable] = 1;
    } else {
      pageData[vairable]++;
    }
  } else {
    if (btnNum === 5) {
      return 1;
    } else {
      return btnNum + 1;
    }
  }
}

function decreaseNum(vairable, sendValue = false, btnNum) {
  if (!sendValue) {
    if (pageData[vairable] === 1) {
      pageData[vairable] = 5;
    } else {
      pageData[vairable]--;
    }
  } else {
    if (btnNum === 1) {
      return 5;
    } else {
      return btnNum - 1;
    }
  }
}

function updatePageNumbers(status, btnNum) {
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
  } else if (status === "jump") {
    pageData.prevPage = decreaseNum(null, true, btnNum);
    pageData.currentPage = btnNum;
    pageData.nextPage = increaseNum(null, true, btnNum);
  }
}

function animateSideNav(status, lastJumpedPage) {
  const tl = gsap.timeline();
  const lastPage = status === "next" ? pageData.prevPage : pageData.nextPage;

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
      `.pageNav-num-${status === "jump" ? lastJumpedPage : lastPage} .number`,
      {
        x: "0",
        color: "#555555",
        duration: 0.5,
        delay: 0.3,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${status === "jump" ? lastJumpedPage : lastPage} .ball`,
      {
        scale: 1,
        duration: 0.5,
      },
      "startTogether"
    )
    .to(
      `.pageNav-num-${status === "jump" ? lastJumpedPage : lastPage} .label`,
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
  navLinks[pageData.currentPage - 1].classList.add("active--page");
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
