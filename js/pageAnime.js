const pages = gsap.utils.toArray(".pages");
const sideNavBtns = document.querySelectorAll(".side-nav button");
const isTouchSupported = "ontouchstart" in document.documentElement;
let isMovingAllowed = true;
let pageData = {
  prevPage: 5,
  currentPage: 1,
  nextPage: 2,
};

sideNavBtns.forEach((member, index) => {
  const pageNum = index + 1;
  member.addEventListener("click", function () {});
});

animateSideNav();

Observer.create({
  target: window,
  type: "wheel,pointer",
  onUp: (e, a) => {
    if (!isMovingAllowed) return;
    if (isTouchSupported) {
      goNextPage();
    } else {
      goPreviousPage();
    }
  },
  onDown: (e) => {
    if (!isMovingAllowed) return;
    if (isTouchSupported) {
      goPreviousPage();
    } else {
      goNextPage();
    }
  },
});

function goNextPage() {
  setStyle("next");
  updatePageNumbers("next");
  animateSideNav("next");
}

function goPreviousPage() {
  setStyle("previous");
  updatePageNumbers("previous");
  animateSideNav("previous");
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
