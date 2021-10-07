let menuButton = document.getElementById("menuButton");
let menuContainer = document.getElementById("menuContainer");
let list = document.getElementsByTagName("li");
let menuTween = gsap.fromTo(
  ".menuContainer",
  {
    opacity: 0,
    scaleX: 0,
    xPercent: 100,
  },
  {
    opacity: 1,
    duration: 0.5,
    scaleX: 1,
    xPercent: 0,
    ease: "power2.out",
    paused: true,
  }
);

menuButton.addEventListener("click", () => {
  menuTween.progress() * 100 > 0 ? menuTween.reverse() : menuTween.play();

  menuTween.progress() * 100 > 0 ? console.log("reverse") : console.log("play");
});

gsap.registerEffect({
  name: "roll",
  effect: (targets, config) => {
    return gsap.to(targets, {
      yPercent: config.y,
      duration: 0.5,
      ease: "circ.out",
    });
  },
});

// for (li of list) {
//   li.addEventListener("mouseenter", (e) => {
//     for (child of e.target.childNodes) {
//       gsap.effects.roll(child, { y: -100 });
//     }
//   });
//   li.addEventListener("mouseleave", (e) => {
//     for (child of e.target.childNodes) {
//       gsap.effects.roll(child, { y: 0 });
//     }
//   });
// }
