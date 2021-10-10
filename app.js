let menuButton = document.getElementById("menuButton");
let menuContainer = document.getElementById("menuContainer");
let list = document.getElementsByTagName("li");
let anchors = document.querySelectorAll("li a");
let links = document.querySelectorAll("li a h5");
let cursor = document.querySelector(".cursor");
let menuBars = document.querySelectorAll(".menuButton div");
gsap.registerPlugin(CSSRulePlugin);
let menuCirc = CSSRulePlugin.getRule(".menuButton::before");
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

menuButton.addEventListener("click", () => {
  menuTween.progress() * 100 > 0 ? menuTween.reverse() : menuTween.play();
});

for (li of anchors) {
  li.addEventListener("mousemove", (e) => {
    let target = e.currentTarget;
    let child = target.childNodes[0].childNodes[0];
    // gsap.from(
    //   CSSRulePlugin.getRule("::after"),

    //   {
    //     cssRule: { skewY: 7 },
    //     duration: 2,
    //   }
    // );
    target.classList[0] === "smallRoll"
      ? gsap.effects.roll(child, { y: -130 })
      : gsap.effects.roll(child, { y: -105 });

    gsap.effects.zoom(".cursor", { scale: 6 });

    cursor.classList.add("filter2");
  });
  li.addEventListener("mouseleave", (e) => {
    let child = e.target.childNodes[0].childNodes[0];
    gsap.effects.zoom(".cursor", { scale: 1 });

    cursor.classList.remove("filter2");

    gsap.effects.roll(child, { y: 0 });
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

    for (bar of menuBars) {
      gsap.to(bar, 0.2, {
        x: -((Math.sin(angle) * hypotenuse) / 18),
        y: -((Math.cos(angle) * hypotenuse) / 18),
      });
    }
  } else {
    cursor.classList.remove("filter");
    gsap.to(cursor, 0.2, {
      left: cursorPosition.left,
      top: cursorPosition.top,
      height: "10px",
      width: "10px",
    });

    for (bar of menuBars) {
      gsap.to(bar, 0.2, {
        x: 0,
        y: 0,
      });
    }
  }

  // for lists

  for (li of links) {
    
    const listDistance = li.getBoundingClientRect().width/4;

    const listPosition = {
      left:
        li.getBoundingClientRect().left + li.getBoundingClientRect().width / 2,
      top:
        li.getBoundingClientRect().top + li.getBoundingClientRect().height /2
    };
    const distance = {
      x: listPosition.left - cursorPosition.left,
      y: listPosition.top - cursorPosition.top,
    };

    const angle = Math.atan2(distance.x, distance.y);
    const hypotenuse = Math.sqrt(
      distance.x * distance.x + distance.y * distance.y
    );

    if (hypotenuse < listDistance) {
      
      gsap.to(li, 0.2, {
        x: -((Math.sin(angle) * hypotenuse)/8),
        y: -((Math.cos(angle) * hypotenuse)/15),
      });
    } else {
      gsap.to(li, 0.2, {
        x: 0,
        y: 0,
      });
    }
  }
});

// window.addEventListener("mouseover", () => {
//   gsap.effects.zoom(".cursor", { scale: 1 });
// });

// window.addEventListener("mouseout", (e) => {
//   gsap.effects.zoom(".cursor", { scale: 0 });
// });
