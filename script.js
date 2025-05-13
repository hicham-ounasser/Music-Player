const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
let isPlaying = false;

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric chill",
    artist: "Somebody",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation",
    artist: "Somebody",
  },
  {
    name: "jacinto-3",
    displayName: "Hold on",
    artist: "Somebody",
  },
  {
    name: "metric-1",
    displayName: "What!!!",
    artist: "meta",
  },
];

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  music.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// next song
function nextSong() {
  songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// prev song
function prevSong() {
  songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}
// on load first song
loadSong(songs[songIndex]);

// update the bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;
  }
}

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
