import { renderGenres } from "./genres.js";

import { songs, renderSong, songSetUp } from "./songs.js";

import { renderPlaylists, addToPlaylist } from "./playlists.js";

const playlists = {
  Favorites: new Set(["1", "7", "10"]),
  Workout: new Set(["2", "6"]),
};

const themeColors = {
  primaryColor: {
    light: "#84DFFF",
    dark: "#352F44",
  },
  secondaryColor: {
    light: "#EDD2F3",
    dark: "#005B41",
  },
  tertiaryColor: {
    light: "#FFAF61",
    dark: "#A2678A",
  },
  quaternaryColor: {
    light: "#E5D4FF",
    dark: "#483d8b",
  },
  color5: {
    light: "#FFAFAF",
    dark: "#4E31AA",
  },
  ColorBackground: {
    light: "#f1f1f1",
    dark: "#635985",
  },
  fontColor: {
    light: "black",
    dark: "aliceblue",
  },
};

const activePlaylist = {};

const selectedGenre = {
  genre: "All Genres",
  genreSongs: songs,
};

let paused = false;

function changeTheme() {
  let theme = document.querySelector(".theme-div").getAttribute("data-theme");
  const themeImg = {
    light: "./Images/sun.svg",
    dark: "./Images/moon.svg",
  };
  theme = theme === "light" ? "dark" : "light";
  document.querySelector(".theme-div").setAttribute("data-theme", theme);
  document.querySelector(".theme-div img").setAttribute("src", themeImg[theme]);
  const root = document.querySelector(":root");
  root.style.setProperty("--primary-color", themeColors.primaryColor[theme]);
  root.style.setProperty(
    "--secondary-color",
    themeColors.secondaryColor[theme]
  );
  root.style.setProperty("--tertiary-color", themeColors.tertiaryColor[theme]);
  root.style.setProperty(
    "--quaternary-color",
    themeColors.quaternaryColor[theme]
  );
  root.style.setProperty("--color5", themeColors.color5[theme]);
  root.style.setProperty(
    "--color-background",
    themeColors.ColorBackground[theme]
  );
  root.style.setProperty("--font-color", themeColors.fontColor[theme]);
  const addToPlaylist = document.querySelector(
    ".playlist .add-to-playlists img"
  );
  addToPlaylist.setAttribute("src", `./Images/add-to-list-${theme}-theme.svg`);
  const controls = document.querySelectorAll(
    ".song-card .player .controls img"
  );
  controls.forEach((img) => {
    let src = img.getAttribute("src").split("-");
    src[1] = theme;
    src = src.join("-");
    src = img.setAttribute("src", src);
  });
}

document
  .querySelector(".theme-div .icon")
  .addEventListener("click", (event) => {
    changeTheme();
  });

renderGenres(songs, selectedGenre, activePlaylist, playlists);

renderSong("default");

renderPlaylists(playlists, activePlaylist);

document
  .querySelector(".playlist .add-to-playlists")
  .addEventListener("click", (event) => {
    const songID = document
      .querySelector(".song-card")
      .getAttribute("data-songID");
    addToPlaylist(songID, playlists, activePlaylist);
    renderPlaylists(playlists, activePlaylist);
    event.target.closest("button").classList.add("hidden");
  });

document
  .querySelector(".playlist .create .create-playlist")
  .addEventListener("click", (event) => {
    const inputBar = document.querySelector(".playlist .create .input-bar");
    event.target.classList.add("hidden");
    inputBar.classList.remove("hidden");
    const input = document.querySelector(".playlist .create .input-bar input");
    input.focus();
  });

function submitPlaylistName() {
  const input = document.querySelector(".playlist .create .input-bar input");
  if (input.value === "") {
    alert("Please enter a valid Playlist name");
  } else {
    playlists[input.value] = new Set();
    renderPlaylists(playlists, activePlaylist);
  }
  document
    .querySelector(".playlist .create .create-playlist")
    .classList.remove("hidden");
  document
    .querySelector(".playlist .create .input-bar")
    .classList.add("hidden");
  input.value = "";
}

document
  .querySelector(".playlist .create .input-bar .check")
  .addEventListener("mousedown", () => {
    submitPlaylistName();
  });

document
  .querySelector(".playlist .create .input-bar")
  .addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      submitPlaylistName();
    }
  });

document
  .querySelector(".playlist .create .input-bar input")
  .addEventListener("focusout", (event) => {
    document
      .querySelector(".playlist .create .input-bar")
      .classList.add("hidden");
    document
      .querySelector(".playlist .create .create-playlist")
      .classList.remove("hidden");
    event.target.value = "";
  });
