let menuButton = document.getElementById("menuButton");
let menuContainer = document.getElementById("menuContainer");

let anchors = document.querySelectorAll("li a");

let cursor = document.querySelector(".cursor");

let icons = document.querySelectorAll(".icon");

gsap.registerPlugin(CSSRulePlugin);

// let skews = CSSRulePlugin.getRule("::after");

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

let rollTime = gsap.timeline();

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

    // gsap.fromTo(   // causing lag
    //   CSSRulePlugin.getRule(".social li span::after"),
    //   { cssRule: { skewY: "7deg" } },
    //   { cssRule: { skewY: "0deg" } }
    // );

    gsap.effects.zoom(".cursor", { scale: 6 });

    cursor.classList.add("filter2");
  });
  link.addEventListener("mouseleave", (e) => {
    let child = e.currentTarget.children[0].children[0];
    gsap.effects.zoom(".cursor", { scale: 1 });

    cursor.classList.remove("filter2");

    // gsap.fromTo(
    //   CSSRulePlugin.getRule(".social li span::after"),
    //   { cssRule: { skewY: "0deg" } },
    //   { cssRule: { skewY: "7deg" } }
    // );
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
  let cursorPosition = {
    left: e.clientX,
    top: e.clientY,
  };

  let menuPosition = {
    left: menuButton.getBoundingClientRect().left,
    top: menuButton.getBoundingClientRect().top,
  };
  let menuSize = {
    width: menuButton.getBoundingClientRect().width,
    height: menuButton.getBoundingClientRect().height,
  };

  let relX = cursorPosition.left - menuPosition.left + window.scrollX;
  let relY = cursorPosition.top - menuPosition.top + window.scrollY;

  if (
    cursorPosition.left > menuPosition.left &&
    cursorPosition.left < menuPosition.left + menuSize.width &&
    cursorPosition.top > menuPosition.top &&
    cursorPosition.top < menuPosition.top + menuSize.height
  ) {
    cursor.classList.add("filter");
    gsap.to(cursor, 0.2, {
      x: ((relX - menuSize.width / 2) / menuSize.width) * 10,
      y: ((relY - menuSize.height / 2) / menuSize.height) * 10,
      left: menuPosition.left,
      top: menuPosition.top,
      height: menuButton.clientHeight,
      width: menuButton.clientWidth,
    });

    gsap.to(".menuButton>div", 0.2, {
      x: ((relX - menuSize.width / 2) / menuSize.width) * 3,
      y: ((relY - menuSize.height / 2) / menuSize.height) * 3,
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

window.addEventListener("mouseout", (e) => {
  if (e.toElement == null && e.relatedTarget == null) {
    gsap.to(cursor, 0.2, {
      height: "0px",
      width: "0px",
      duration: 1,
    });
  }
});
