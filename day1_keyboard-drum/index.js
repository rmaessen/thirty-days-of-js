var play = function(key) {
  const audioSrc = key.getAttribute('data-audio-src');
  key.classList.add("drum-key--played");
  setTimeout(function() {
    key.classList.remove("drum-key--played");
  }, 200);
  var audio = new Audio(
    audioSrc
  );
  audio.play();
};

document.addEventListener("keypress", function(e) {
  console.log(e.keyCode);
  var key = document.querySelector(
    '.drum-key[data-keycode="' + e.keyCode + '"]'
  );
  if (key) {
    play(key);
  }
});

document.querySelectorAll(".drum-key").forEach(el =>
  el.addEventListener("click", function() {
    play(el);
  })
);
