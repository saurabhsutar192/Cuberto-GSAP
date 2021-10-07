let menuButton = document.getElementById("menuButton");
let menuContainer = document.getElementById("menuContainer");
let list = document.getElementsByTagName("li");
let anchors = document.querySelectorAll("li a");

let menuTween = gsap.fromTo(
  ".menuContainer",
  {
    opacity: 0,
    
    xPercent: 100,
  },
  {
    opacity: 1,
    duration: 1,
    
    xPercent: 0,
    ease: "power3.out",
    paused: true,
  }
);

menuButton.addEventListener("click", () => {
  menuTween.progress() * 100 > 0 ? menuTween.reverse() : menuTween.play();

  // menuTween.progress() * 100 > 0 ? console.log("reverse") : console.log("play");
});

gsap.registerEffect({
  name: "roll",
  effect: (targets, config) => {
    return gsap.to(targets, {
      yPercent: config.y,
      skewY: 0,
      duration: 2,
      ease: "expo.out",
    });
  },
});



for (li of anchors) {
  
  li.addEventListener("mouseenter", (e) => {
    let child = e.target.childNodes[0].childNodes[0];

    gsap.effects.roll(child, { y: -100 });
  });
  li.addEventListener("mouseleave", (e) => {
    let child = e.target.childNodes[0].childNodes[0];

    gsap.effects.roll(child, { y: 0 });
  });
}

