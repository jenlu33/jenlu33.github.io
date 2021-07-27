const body = document.querySelector("body");

// ---------- querySelectors for intro/hello section
const helloSection = document.querySelector("#hello");
const typingSelfTags = document.querySelectorAll(".typing-container")[1];
const descStrings = [
  "software engineer", 
  "knitting fiend", 
  "web developer", 
  "boba connoisseur", 
  "nap lover"
];

// ---------- querySelectors for stars
const starIcon = document.querySelector(".star");
const actualStarIcon = document.querySelector(".star > i");
const smallStarIcon = document.querySelector(".small-star");

// ---------- querySelectors for regular main icons + arrow
const icons = document.querySelectorAll(".main-icon");
const techIcons = document.querySelectorAll(".tech-icon-container");
const arrow = document.querySelector(".arrow");

// ---------- querySelectors for projects section
const projects = document.querySelectorAll(".project-item");

// ---------- querySelectors for theme icons
const angry = document.querySelector(".fa-angry");
const fireContainer = document.querySelector(".fire-container");
const sun = document.querySelector(".fa-sun");
const fish = document.querySelector(".fa-fish");


// creates the element for self tags
const createTagsEle = () => {
  let selfTags = document.createElement("h3");
  typingSelfTags.appendChild(selfTags);
  selfTags.classList.add("self-tags");
  return selfTags;
}

// randomizes which self tag is shown. setTimeOut is working in conjuction with CSS animations
const shuffle = (strings) => {
  let rand = Math.floor(Math.random() * strings.length);
  const selfTags = createTagsEle();
  selfTags.innerText = strings[rand];

  setTimeout(() => {
    shuffle(strings);
    typingSelfTags.removeChild(selfTags);
  }, 4000);
}

shuffle(descStrings);


// Place random stars!
// creates a star and places it randomly on page
// Creates star element with random size and adds to document
let starsActive = false;

const createStar = (size) => {
  hello.style.height = "100vh";
  const star = document.createElement("i");
  let randomX = Math.floor(Math.random() * 95);
  let randomY = Math.floor(Math.random() * 95);
  let randomOpacity = Math.random() * 0.8;
  let randomSize = size === "small" ? Math.floor(Math.random() * 3) : 3;


  star.classList.add("new-star");
  star.classList.add("fas");
  star.classList.add("fa-star");
  star.classList.add(`fa-${randomSize}x`);
  star.style.top = `${randomY}vh`;
  star.style.left = `${randomX}vw`;
  star.style.position = "fixed";
  star.style.opacity = `${randomOpacity}`;

  hello.appendChild(star);
  
}

const randomStars = () => {
  //Creates 65 small stars and 5 medium stars
  for (let i = 0; i < 65; i++) {
    createStar("small");
  }

  for (let i = 0; i < 5; i++) {
    createStar("medium");
  }
}

const removeStars = () => {
  const stars = document.querySelectorAll(".new-star");
  stars.forEach(star => star.remove())
}

// small star icon for small screens
const actualSmallStarIcon = smallStarIcon.firstElementChild;

const starsActivated = (status) => {
  if (status) {
    actualStarIcon.className = "fas fa-star fa-5x";
    actualSmallStarIcon.className = "fas fa-star fa-2x";
    randomStars();
  } else {
    actualStarIcon.className = "far fa-star fa-5x";
    actualSmallStarIcon.className = "far fa-star fa-2x";
    removeStars();
  }
}

starIcon.addEventListener("click", () => {
  starsActive = !starsActive;
  starsActivated(starsActive);
});


smallStarIcon.addEventListener("click", () => {
  starsActive = !starsActive;
  starsActivated(starsActive);
})


//Animations for when hovering/mouseout of an icon (medium and large screens only)

const iconHoverEffect = (element) => {
  let iconPic = element.firstElementChild;
  let iconName = element.lastElementChild;

  element.addEventListener("mouseover", () => {
    iconPic.style.animation = "scaleIconDown 1.5s forwards"
    iconName.style.animation = "scaleIconUp 1s forwards"
    
    iconPic.style.opacity = "0.3";
    iconPic.style.filter = "blur(2px)"
    iconPic.style.transitionDuration = "0.3s"
    
    iconName.style.opacity = "1";
    iconName.style.transitionDuration = "0.3s";
    iconName.style.zIndex = "1";
    
  });
  
  element.addEventListener("mouseout", () => {
    iconPic.style.animation = "scaleIconUp 1s forwards"
    iconName.style.animation = "scaleIconDown 1s forwards"
    
    iconPic.style.opacity = "1";
    iconPic.style.filter = "blur(0)"
    iconPic.style.transitionDuration = "0.3s"
    
    iconName.style.opacity = "0";
    iconName.style.transitionDuration = "0.2s";
  })
}

icons.forEach(icon => {
  iconHoverEffect(icon);
});

techIcons.forEach(icon => {
  iconHoverEffect(icon);
})

// Change the star icon position to top right when scrolled past (medium and large screens only)
let intViewportHeight = window.innerHeight

let starHeight = starIcon.offsetTop + starIcon.offsetHeight;
window.addEventListener("scroll", () => {
  let pageY = window.scrollY;

  if (pageY > starHeight) {
    starIcon.className = "main-icon move-star"
  } else {
    starIcon.className = "main-icon star"
  }
})

// Change arrow when scrolled past first page (all screens)
window.addEventListener("scroll", () => {
  let pageY = window.scrollY;

  if (pageY > window.innerHeight * 0.8) {
    arrow.classList.add("arrow-up");
    arrow.classList.remove("arrow");
  } else {
    arrow.classList.add("arrow");
    arrow.classList.remove("arrow-up");
  }
})

// Scroll projects into view on scroll

//Debounce prevents browser from calling slideProject too many times which crashes site or causes unecessary slowdown
const debounce = (func, wait = 10, immediate = true) => {
  let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

const projectImgs = document.querySelectorAll(".project-item > img");

const slideProject = () => {
  projects.forEach(img => {
    const slideInAt = img.offsetParent.offsetTop + img.offsetTop + (img.offsetHeight / 2);

    //leaves a bit on the bottom so the user can see it sliding away
    const imageBottom = img.offsetParent.offsetTop + img.offsetTop + (img.offsetHeight * 0.8);

    //slide in when image is scrolled halfway
    const isHalfShown = slideInAt < window.scrollY + window.innerHeight;
    //makes sure image is still in view while scrolling
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      img.classList.add('project-active');
    } else {
      img.classList.remove('project-active');
    }
    
  })
}

window.addEventListener('scroll', debounce(slideProject));

let isSkullActive = false;
let isSunActive = false;
let isFishActive = false;

const createFire = () => {
  fireContainer.style.display = "flex";

  for (let i = 0; i < 5; i++) {
    const fireGif = document.createElement("img");
    fireGif.src = "./images/flame4b.gif"
    fireGif.classList.add("fire-gif");
    fireContainer.appendChild(fireGif);
  }
}

const removeFire = () => {
  const fires = document.querySelectorAll(".fire-gif");
  fires.forEach(fire => fire.remove());

  fireContainer.style.display = "none";
}

const createBackgroundElement = (el, faType, elName) => {
  const newEl = document.createElement("i");
  let randomX = Math.floor(Math.random() * 95);
  let randomY = Math.floor(Math.random() * 85);
  let randomOpacity = Math.random() * 0.6;
  let randomSize = Math.floor(Math.random() * 4);


  newEl.classList.add(`new-${el}`);
  newEl.classList.add(faType);
  newEl.classList.add(elName);
  newEl.classList.add(`fa-${randomSize}x`);
  newEl.style.top = `${randomY}vh`;
  newEl.style.left = `${randomX}vw`;
  newEl.style.position = "fixed";
  newEl.style.opacity = `${randomOpacity}`;

  hello.appendChild(newEl);
}

const removeBackgroundElement = (query) => {
  const elements = document.querySelectorAll(`.${query}`);
  elements.forEach(el => el.remove());
}

deactivateStar = () => {
  // makes sure stars are turned off before deactivating
  starsActive = false;
  starsActivated(starsActive);

  // changes the way the star icon looks so that you can't press it
  starIcon.style.opacity = "0.1";
  starIcon.style.pointerEvents = "none";
  smallStarIcon.style.opacity = "0.1";
  smallStarIcon.style.pointerEvents = "none";
}

reactivateStar = () => {
  starIcon.style.opacity = "1";
  starIcon.style.pointerEvents = "auto";
  smallStarIcon.style.opacity = "1";
  smallStarIcon.style.pointerEvents = "auto";
}

const skullActived = (status) => {
  if (status) {
    isSunActive = false;
    isFishActive = false;
    sunActivated(isSunActive);
    fishActivated(isFishActive);

    body.classList.add("skull-style");
    angry.classList.add("style-icon-active");
    createFire();
    for (let i = 0; i < 40; i++) {
      createBackgroundElement("skull", "fas", "fa-skull");
    }
    
    deactivateStar();
  } else {
    document.querySelector("body").classList.remove("skull-style");
    angry.classList.remove("style-icon-active");
    removeFire();
    removeBackgroundElement("new-skull");

    reactivateStar();
  }
}

angry.addEventListener("click", () => {
  isSkullActive = !isSkullActive;
  skullActived(isSkullActive);
})

const sunActivated = (status) => {
  if (status) {
    isSkullActive = false;
    isFishActive = false;
    skullActived(isSkullActive);
    fishActivated(isFishActive);

    body.classList.add("cloud-style");
    sun.classList.add("style-icon-active");
    for (let i = 0; i < 40; i++) {
      createBackgroundElement("cloud", "fas", "fa-cloud");
    }
    deactivateStar();
  } else {
    body.classList.remove("cloud-style");
    sun.classList.remove("style-icon-active");
    removeBackgroundElement("new-cloud");
    reactivateStar();
  }
}

sun.addEventListener("click", () => {
  isSunActive = !isSunActive;
  sunActivated(isSunActive);
})

const fishActivated = (status) => {
  if (status) {
    isSkullActive = false;
    isSunActive = false;
    skullActived(isSkullActive);
    sunActivated(isSunActive);

    body.classList.add("fish-style");
    fish.classList.add("style-icon-active");
    for (let i = 0; i < 20; i++) {
      createBackgroundElement("fish", "fas", "fa-fish");
    }
    for (let i = 0; i < 30; i++) {
      createBackgroundElement("circle", "far", "fa-circle");
    }
    deactivateStar();
  } else {
    body.classList.remove("fish-style");
    fish.classList.remove("style-icon-active");
    removeBackgroundElement("new-fish");
    removeBackgroundElement("new-circle");
    reactivateStar();
  }
}

fish.addEventListener("click", () => {
  isFishActive = !isFishActive;
  fishActivated(isFishActive);
})
