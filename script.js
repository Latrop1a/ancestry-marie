const data = {
  doms: {
    toggleSwitch: document.querySelector("input[type=checkbox]"),
    nav: document.getElementById("nav"),
    toggleIcon: document.getElementById("toggle-icon"),
    image1: document.getElementById("image1"),
    image2: document.getElementById("image2"),
    image3: document.getElementById("image3"),
    textBox: document.getElementById("text-box"),
  },
};

//switches UI around depending what mode is selected
function switcher(isLight) {
  isLight ? (mode = "light") : (mode = "dark");
  colorWhite = "rgb(0 0 0 / 50%)";
  colorBlack = "rgb(255 255 255 / 50%)";
  document.documentElement.setAttribute("data-theme", mode);
  data.doms.image1.src = `img/undraw_proud_coder_${mode}.svg`;
  data.doms.image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  data.doms.image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
  data.doms.nav.style.backgroundColor = isLight ? colorBlack : colorWhite;
  data.doms.textBox.style.backgroundColor = isLight ? colorWhite : colorBlack;
  data.doms.toggleIcon.children[0].innerHTML = isLight
    ? "Light Mode"
    : "Dark Mode";
  isLight
    ? data.doms.toggleIcon.children[1].classList.replace("fa-moon", "fa-sun")
    : data.doms.toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  if (!isLight) {
    data.doms.toggleSwitch.checked = true;
  }
  localStorage.setItem("themeSave", mode);
}

// switch theme toggle
function switchTheme(event) {
  if (event.target.checked) {
    //switch to dark mode if toggle is checked
    switcher(false);
  } else {
    //switch to light mode
    switcher(true);
  }
}

//chooses theme on load
//checks for local storage first else uses local time
function modeOnLoad() {
  const themeUser = localStorage.getItem("themeSave");
  //checks for saved theme key
  if (themeUser === "dark") {
    switcher(false);
  } else if (themeUser === "light") {
    switcher(true);
  } else {
    //no saved theme so determines via current time
    const now = new Date();
    console.log(now.getHours());
    if (now.getHours() > 18 || now.getHours < 8) {
      switcher(false);
      data.doms.toggleSwitch.checked = true;
    } else {
      switcher(true);
    }
  }
}

//event listeners
data.doms.toggleSwitch.addEventListener("change", switchTheme);
modeOnLoad();
