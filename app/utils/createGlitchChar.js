export function createGlitchChar(char, fakeChars) {
  const charWrapper = document.createElement("div");
  charWrapper.className = "glitch__char";

  const fakeChar = document.createElement("span");
  fakeChar.className = "fake__char";
  fakeChar.textContent =
    fakeChars[Math.floor(Math.random() * fakeChars.length)];

  const real = document.createElement("span");
  real.className = "real__char";

  if (char === " ") {
    real.classList.add("space__char");
    real.innerHTML = "&nbsp;";
  } else {
    real.textContent = char;
  }

  charWrapper.appendChild(fakeChar);
  charWrapper.appendChild(real);

  return { charWrapper, fakeChar, real };
}

export function removeGlitchChar() {
  const glitchChars = document.querySelectorAll(".content .glitch__char");

  glitchChars.forEach((element) => {
    element.style.visibility = "hidden";
  });
}
