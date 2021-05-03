const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

// music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seventh Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

// check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update DOM photo, artist, songName
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// on load - selct first song
loadSong(songs[songIndex]);

// update progress bar & time
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    // console.log(event);

    // update prog bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    // console.log(`minutes: ${durationMinutes}`);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // console.log(`seconds: ${durationSeconds}`);

    // delay switching duration el to aviod NAN NAN.
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log(`minutes: ${durationMinutes}`);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // console.log(`seconds: ${currentSeconds}`);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// set progress bar manually
function setProgressBar(event) {
  //   console.log(event);
  const width = this.clientWidth;
  //   console.log(`width: ${width}`);
  const clickX = event.offsetX;
  //   console.log(`clickX: ${clickX}`);
  const { duration } = music;
  //   console.log(clickX / width);
  //   console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
