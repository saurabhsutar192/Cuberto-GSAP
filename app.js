let menuButton = document.getElementById("menuButton");
let menuContainer = document.getElementById("menuContainer");
let list = document.getElementsByTagName("li");
let anchors = document.querySelectorAll("li a");

let cursor = document.querySelector(".cursor");
let menuBars = document.querySelectorAll(" .ham div");
let crossBars = document.querySelectorAll(" .cross div");
gsap.registerPlugin(CSSRulePlugin);

let skews = CSSRulePlugin.getRule("::after");

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

let menuAnim = gsap.timeline();

menuAnim
  .to(".ham div", {
    scaleX: 0,
  })
  .fromTo(
    ".cross div:nth-child(1)",
    0.2,
    {
      scaleX: 0,
      rotate: "45deg",
    },
    {
      scaleX: 1,
      rotate: "45deg",
    }
  )
  .fromTo(
    ".cross div:nth-child(2)",
    0.2,
    {
      scaleX: 0,
      rotate: "-45deg",
    },
    {
      scaleX: 1,
      rotate: "-45deg",
    }
  );

menuAnim.pause();

gsap.to(".ham div", {
  margin: "3px 0",
});

gsap.registerEffect({
  name: "roll",
  effect: (targets, config) => {
    return gsap.to(targets, {
      yPercent: config.y,

      duration: 2,
      ease: "expo.out",
    });
  },
});

gsap.registerEffect({
  name: "move",
  effect: (target, config) => {
    return gsap.to(target, {
      top: config.top,
      left: config.left,
    });
  },
});

gsap.registerEffect({
  name: "zoom",
  effect: (target, config) => {
    return gsap.to(target, {
      duration: 0.2,

      scale: config.scale,
    });
  },
  defaults: { scale: 0 },
});
function parallaxIt(e, target, movement) {
  let cont = target;

  let relX = e.clientX - cont.getBoundingClientRect().left + window.scrollX;
  let relY = e.clientY - cont.getBoundingClientRect().top + window.scrollY;

  gsap.to(target, 0.3, {
    x: ((relX - cont.offsetWidth / 2) / cont.offsetWidth) * movement,
    y:
      (((relY - cont.offsetHeight / 2) / cont.offsetHeight) * movement * 50) /
      100,
    ease: Power2.easeOut,
  });
}

menuButton.addEventListener("click", () => {
  if (menuTween.progress() * 100 > 0) {
    menuTween.timeScale(3).reverse();
    menuAnim.reverse();
  } else {
    menuTween.timeScale(1).play();
    menuAnim.play();
  }
});

for (link of anchors) {
  link.addEventListener("mouseenter", (e) => {
    let target = e.currentTarget.parentNode.parentNode;
    let child = e.currentTarget.children[0].children[0];

    if (target.classList[0] === "small") {
      gsap.effects.roll(child, { y: -130 });
    } else {
      gsap.effects.roll(child, { y: -105 });
    }
    for (skew of skews) {
      gsap.fromTo(
        skew,
        { cssRule: { skewY: "7deg" } },
        { cssRule: { skewY: 0 } }
      );
    }
    gsap.effects.zoom(".cursor", { scale: 6 });

    cursor.classList.add("filter2");
  });
  link.addEventListener("mouseleave", (e) => {
    let child = e.currentTarget.children[0].children[0];
    gsap.effects.zoom(".cursor", { scale: 1 });

    cursor.classList.remove("filter2");

    gsap.effects.roll(child, { y: 0 });
    gsap.to(e.currentTarget, 0.3, { x: 0, y: 0 });
  });
  link.addEventListener("mousemove", (e) => {
    let target = e.currentTarget.parentNode.parentNode;
    target.classList[0] === "big"
      ? parallaxIt(e, e.currentTarget, 25)
      : parallaxIt(e, e.currentTarget, 15);
  });
}

window.addEventListener("mousemove", (e) => {
  // gsap.effects.move(".cursor", { top: e.pageY, left: e.pageX });
  const cursorPosition = {
    left: e.clientX,
    top: e.clientY,
  };
  const menuDistance = menuButton.getBoundingClientRect().width;

  const menuPosition = {
    left:
      menuButton.getBoundingClientRect().left +
      menuButton.getBoundingClientRect().width / 2,
    top:
      menuButton.getBoundingClientRect().top +
      menuButton.getBoundingClientRect().height / 2,
  };
  const distance = {
    x: menuPosition.left - cursorPosition.left,
    y: menuPosition.top - cursorPosition.top,
  };

  const angle = Math.atan2(distance.x, distance.y);
  const hypotenuse = Math.sqrt(
    distance.x * distance.x + distance.y * distance.y
  );

  if (hypotenuse < menuDistance) {
    cursor.classList.add("filter");
    gsap.to(cursor, 0.2, {
      left: menuPosition.left - (Math.sin(angle) * hypotenuse) / 5 - 35,
      top: menuPosition.top - (Math.cos(angle) * hypotenuse) / 5 - 35,
      height: menuButton.clientHeight,
      width: menuButton.clientWidth,
    });

    gsap.to(".menuButton>div", 0.2, {
      x: -((Math.sin(angle) * hypotenuse) / 18),
      y: -((Math.cos(angle) * hypotenuse) / 18),
    });
  } else {
    cursor.classList.remove("filter");
    gsap.to(cursor, 0.2, {
      left: cursorPosition.left,
      top: cursorPosition.top,
      height: "10px",
      width: "10px",
    });

    gsap.to(".menuButton>div", 0.2, {
      x: 0,
      y: 0,
    });
  }
});
