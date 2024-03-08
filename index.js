const audio = new Audio("./whitemonster.ogg");
audio.loop = true;
let playing = false;
const button = document.querySelector(".audio-container");
const mute = document.querySelector(".mute");
const unmute = document.querySelector(".unmute");
button.addEventListener("click", () => {
  if (playing) {
    audio.pause();
    unmute.style.display = "none";
    mute.style.display = "";
    playing = false;
  } else {
    audio.play();
    mute.style.display = "none";
    unmute.style.display = "";
    playing = true;
  }
});
