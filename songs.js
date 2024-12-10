import { renderPlaylists } from "./playlists.js";
import { addToPlaylist, addToPlaylistSelect } from "./playlists.js";

const songs = [
  {
    id: "1",
    image: "https://i.scdn.co/image/ab67616d00001e02d5f4378b1ffc9119fdc7306d",
    title: "Sajni",
    artist: "Ram, Sampath, Arijit Singh, Prashant Pandey",
    duration: 10,
    genre: "Bollywood Romantic",
  },
  {
    id: "2",
    image: "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    duration: 15,
    genre: "Rock",
  },
  {
    id: "3",
    image: "https://i.scdn.co/image/ab67616d00001e02c8a11e48c91a982d086afc69",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: 10,
    genre: "Rock",
  },
  {
    id: "4",
    image: "https://i.scdn.co/image/ab67616d00001e0276ffb5b5ab045d22c81235c1",
    title: "Valerie",
    artist: "Amy Winehouse ",
    duration: 10,
    genre: "R n' B",
  },
  {
    id: "5",
    image:
      "https://m.media-amazon.com/images/I/61zFYsbDABL._SX472_SY472_BL0_QL100_.jpg",
    title: "A Thousand Miles",
    artist: "Vanessa Carlton",
    duration: 10,
    genre: "Pop",
  },
  {
    id: "6",
    image: "https://i.scdn.co/image/ab67616d00001e025076e4160d018e378f488c33",
    title: "Fortnight",
    artist: "Taylor Swift (feat. Post Malone)",
    duration: 10,
    genre: "Pop",
  },
  {
    id: "7",
    image:
      "https://m.media-amazon.com/images/I/51fq1OUPrVL._SX284_SY160_BL0_QL100_.jpg",
    title: "Layla",
    artist: "Eric Clapton",
    duration: 10,
    genre: "R n' B",
  },
  {
    id: "8",
    image: "https://i.scdn.co/image/ab67616d00001e02e44963b8bb127552ac761873",
    title: "Don't Cry",
    artist: "Guns N' Roses",
    duration: 10,
    genre: "Rock",
  },
  {
    id: "9",
    image:
      "https://m.media-amazon.com/images/I/51QVTaj8JNL._SX472_SY472_BL0_QL100_.jpg",
    title: "Pehle Bhi Main",
    artist: "Vishal Mishra & Raj Shekhar",
    duration: 10,
    genre: "Bollywood Romantic",
  },
  {
    id: "10",
    image:
      "https://m.media-amazon.com/images/I/61pId5QmuDL._SX472_SY472_BL0_QL100_.jpg",
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik, Arijit Singh, A. R. Rahman & Irshad Kamil",
    duration: 10,
    genre: "Bollywood Romantic",
  },
  {
    id: "11",
    image:
      "https://m.media-amazon.com/images/I/51Jci+B0jAL._SX472_SY472_BL0_QL100_.jpg",
    title: "Satranga",
    artist: "Shreyas Puranik, Arijit Singh & Siddharth-Garima",
    duration: 10,
    genre: "Bollywood Romantic",
  },
  {
    id: "12",
    image: "https://i.scdn.co/image/ab67616d00001e027a231174875d7930de9dad58",
    title: "It's My Life",
    artist: "Bon Jovi",
    duration: 10,
    genre: "Bollywood Romantic",
  },
];

function renderSong(songID, playlists, activePlaylist) {
  const theme = document.querySelector(".theme-div").getAttribute("data-theme");
  let song;
  if (songID === "default") {
    song = {
      id: "default",
      image: "../Images/music-notes.svg",
      title: "",
      artist: "",
      duration: 0,
      genre: "",
    };
  } else if (songID === undefined) {
    song = {
      id: "default",
      image: "../Images/music-notes.svg",
      title: "No songs added yet",
      artist: "",
      duration: 0,
      genre: "",
    };
  } else {
    song = songs.find((song) => song.id === songID);
  }
  const artist =
    song.artist.length >= 30
      ? song.artist.substring(0, 28) + "..."
      : song.artist;
  const songCard = document.querySelector(".song-card");
  songCard.setAttribute("data-songID", songID);
  songCard.innerHTML = `
  <figure class="thumbnail">
  <img
    src="${song.image}"
    alt=""
  />
  <figcaption>
    <div class="title">${song.title}</div>
    <div class="artist">${artist}</div>
  </figcaption>
</figure>
<div class="player">
  <div class="controls">
    <div class="previous">
      <img src="./Images/previous-${theme}-theme.svg" alt="" />
    </div>
    <div class="play-pause">
      <img src="./Images/pause-${theme}-theme.svg" alt="" />
    </div>
    <div class="next">
      <img src="./Images/next-${theme}-theme.svg" alt="" />
    </div>
  </div>
  <div class="progress-bar">
    <div class="progress"></div>
  </div>
</div>
<button class="add-to-playlist">Add to Playlist</button>
  `;
  const addToPlaylistBtn = document.querySelector(
    ".song-card .add-to-playlist"
  );
  if (songID === "default") {
    addToPlaylistBtn.style.display = "none";
  }
  const playPause = document.querySelector(
    ".song-card .player .controls .play-pause"
  );
  const playPauseImg = document.querySelector(
    ".song-card .player .controls .play-pause img"
  );
  playPauseImg.addEventListener("click", (event) => {
    if (playPause.getAttribute("data-state") === "playing") {
      playPause.setAttribute("data-state", "paused");
      window.cancelAnimationFrame(requestID);
      playPauseImg.setAttribute("src", `./Images/play-${theme}-theme.svg`);
    } else if (playPause.getAttribute("data-state") === "paused") {
      activePlayer.start = undefined;
      activePlayer.durationPassed = activePlayer.durationPassedBuffer;
      requestID = window.requestAnimationFrame(play);
    }
  });
}

let requestID;

function play(timeStamp) {
  const theme = document.querySelector(".theme-div").getAttribute("data-theme");
  const playPause = document.querySelector(
    ".song-card .player .controls .play-pause"
  );
  playPause.setAttribute("data-state", "playing");
  playPause
    .querySelector("img")
    .setAttribute("src", `./Images/pause-${theme}-theme.svg`);
  if (!activePlayer.start) {
    activePlayer.start = timeStamp;
  }
  const elapsed = timeStamp - activePlayer.start;
  const durationPassed = elapsed + activePlayer.durationPassed;
  activePlayer.durationPassedBuffer = durationPassed;

  if (durationPassed <= activePlayer.duration) {
    activePlayer.playing = true;
    let progress = document.querySelector(
      ".song-card .player .progress-bar .progress"
    );
    progress.style.width =
      Math.round(
        (durationPassed / activePlayer.duration) * activePlayer.fullWidth
      ) + "px";
    requestID = window.requestAnimationFrame(play);
  } else if (durationPassed > activePlayer.duration) {
    playPause.setAttribute("data-state", "end");
    activePlayer.finished = true;
    activePlayer.playing = false;
    playPause
      .querySelector("img")
      .setAttribute("src", `./Images/play-${theme}-theme.svg`);
  }
}

let activePlayer = {};

function setActivePlayer(songID) {
  let song;
  if (songID === "default" || songID === undefined) {
    song = {
      duration: 0,
    };
  } else {
    song = songs.find((song) => song.id === songID);
  }
  activePlayer.fullWidth = document.querySelector(
    ".song-card .player .progress-bar"
  ).offsetWidth;
  activePlayer.duration = song.duration * 1000;
  activePlayer.playing = true;
  activePlayer.durationPassed = 0;
  activePlayer.finished = false;
  activePlayer.start = undefined;
}

function playNext(activePlaylist, playlists, selectedGenre) {
  if (activePlaylist.active === true) {
    console.log("Playlist active");
    console.log(activePlaylist);
    const { name, active, queue, songIndex } = activePlaylist;
    const nextIndex = (songIndex + 1) % queue.length;
    activePlaylist.songIndex = nextIndex;
    songSetUp(queue[nextIndex], playlists, activePlaylist, selectedGenre);
  } else {
    let songID;
    selectedGenre.songIndex =
      (selectedGenre.songIndex + 1) % selectedGenre.genreSongs.length;
    songID = selectedGenre.genreSongs[selectedGenre.songIndex].id;
    songSetUp(songID, playlists, activePlaylist, selectedGenre);
  }
}

function playPrevious(activePlaylist, playlists, selectedGenre) {
  if (activePlaylist.active === true) {
    const { name, active, queue, songIndex } = activePlaylist;
    const nextIndex = (songIndex - 1 + queue.length) % queue.length;
    activePlaylist.songIndex = nextIndex;
    songSetUp(queue[nextIndex], playlists, activePlaylist, selectedGenre);
  } else {
    let songID;
    selectedGenre.songIndex =
      (selectedGenre.songIndex - 1 + selectedGenre.genreSongs.length) %
      selectedGenre.genreSongs.length;
    songID = selectedGenre.genreSongs[selectedGenre.songIndex].id;
    songSetUp(songID, playlists, activePlaylist, selectedGenre);
  }
}

function songSetUp(songID, playlists, activePlaylist, selectedGenre) {
  renderSong(songID, playlists, activePlaylist);
  setActivePlayer(songID);
  renderPlaylists(playlists, activePlaylist);
  const addToPlaylist = document.querySelector(".song-card .add-to-playlist");
  addToPlaylist.addEventListener("click", () => {
    if (
      document.querySelector(".playlist").getAttribute("data-add-mode") ===
      "true"
    ) {
    } else {
      addToPlaylistSelect(playlists, activePlaylist);
      document.querySelector(".playlist").setAttribute("data-add-mode", "true");
      document
        .querySelector(".playlist .add-to-playlists")
        .classList.remove("hidden");
    }
  });
  const nextSong = document.querySelector(".song-card .player .controls .next");
  nextSong.addEventListener("click", () => {
    playNext(activePlaylist, playlists, selectedGenre);
  });
  const previousSong = document.querySelector(
    ".song-card .player .controls .previous"
  );
  previousSong.addEventListener("click", () => {
    playPrevious(activePlaylist, playlists, selectedGenre);
  });
  requestID = window.requestAnimationFrame(play);
}

export { songs, renderSong, play, activePlayer, setActivePlayer, songSetUp };
