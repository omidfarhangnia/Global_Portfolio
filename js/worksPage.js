const worksContainer = document.querySelector(".worksContainer");
const prevBtn = document.querySelector("#page2__prevBtn");
const nextBtn = document.querySelector("#page2__nextBtn");

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const tl = gsap.timeline();
  tl.to(".worksContainer", {
    opacity: 0,
    duration: 0.3,
    ease: "linear",
    onComplete: () => {
      handleMove("prev");
    },
  }).to(".worksContainer", {
    opacity: 1,
    delay: 0.2,
    duration: 0.3,
    ease: "linear",
  });
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const tl = gsap.timeline();
  tl.to(".worksContainer", {
    opacity: 0,
    duration: 0.3,
    ease: "linear",
    onComplete: () => {
      handleMove("prev");
    },
  }).to(".worksContainer", {
    opacity: 1,
    delay: 0.2,
    duration: 0.3,
    ease: "linear",
  });
});

function handleMove(dir) {
  const firstChild = document.querySelector('[childnum="0"]');
  const LastChild = document.querySelector('[childnum="2"]');
  if (dir === "next") {
    worksContainer.removeChild(firstChild);
    worksContainer.appendChild(firstChild);
  } else {
    worksContainer.removeChild(LastChild);
    worksContainer.insertBefore(LastChild, firstChild);
  }
  addNewNum();
}

function addNewNum() {
  const works = document.querySelectorAll(".works");
  works.forEach((work, i) => {
    work.setAttribute("childnum", i);
    console.log(work);
  });
}
