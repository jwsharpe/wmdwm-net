const audio = new Audio("./whitemonster.ogg");
audio.loop = true;
audio.currentTime = 0.5;

const button = document.querySelector(".audio-container");
const mute = document.querySelector(".mute");
const unmute = document.querySelector(".unmute");

button.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0.5;
    unmute.style.display = "none";
    mute.style.display = "";
  } else {
    audio.play();
    mute.style.display = "none";
    unmute.style.display = "";
  }
});
