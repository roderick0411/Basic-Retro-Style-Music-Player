import { songs, songSetUp } from "./songs.js";

function renderGenres(songsList, selectedGenre, activePlaylist, playlists) {
  const genresList = [...new Set(songsList.map((song) => song.genre))];
  const genres = genresList.toSpliced(0, 0, "All Genres");
  let genreFilter = document.querySelector(".all-songs .genre-filter");
  genreFilter.innerHTML = `
    <span>Filter By Genre</span>
    <button class="dropdown-btn">All Genres</button>`;
  let genreUl = document.createElement("ul");
  genreUl.classList.add("genres-list");
  genres.forEach((genre) => {
    let li = document.createElement("li");
    li.textContent = genre;
    genreUl.appendChild(li);
  });
  genreFilter.appendChild(genreUl);
  genreUl.classList.add("genres-list");
  const songsDiv = document.querySelector(".all-songs");
  let songs = document.createElement("div");
  songs.classList.add("songs");
  songs.innerHTML = `
    <div class="genre-name">${selectedGenre.genre}</div>
    <ul class="songs-list"></ul>`;
  songsDiv.appendChild(songs);
  document
    .querySelectorAll(".all-songs .genre-filter .genres-list li")
    .forEach((li) => {
      li.addEventListener("click", (event) => {
        document.querySelector(
          ".all-songs .genre-filter .dropdown-btn"
        ).textContent = event.target.textContent;
        selectedGenre.genre = event.target.textContent;
        selectedGenre.genreSongs =
          selectedGenre.genre === "All Genres"
            ? songsList
            : songsList.filter((song) => song.genre === selectedGenre.genre);
        console.log(selectedGenre);
        renderSongs(
          songsList,
          selectedGenre.genre,
          selectedGenre,
          activePlaylist,
          playlists
        );
      });
    });

  renderSongs(
    songsList,
    selectedGenre.genre,
    selectedGenre,
    activePlaylist,
    playlists
  );
}

function renderSongs(
  songs,
  selected,
  selectedGenre,
  activePlaylist,
  playlists
) {
  const filteredSongs =
    selected === "All Genres"
      ? songs
      : songs.filter((song) => song.genre === selected);
  const songsList = document.querySelector(".all-songs .songs .songs-list");
  songsList.innerHTML = "";
  filteredSongs.forEach((song) => {
    const title =
      song.title.length > 30 ? song.title.substr(0, 27) + "..." : song.title;
    const li = document.createElement("li");
    li.setAttribute("data-id", song.id);
    li.innerHTML = title;
    songsList.appendChild(li);
  });
  document.querySelectorAll(".all-songs .songs li").forEach((li) => {
    li.addEventListener("click", (event) => {
      const songID = event.target.getAttribute("data-id");
      const playlist = document.querySelector(".playlist .active-playlist");
      if (!playlist.classList.contains("hidden")) {
        playlist.classList.add("hidden");
      }
      selectedGenre.songIndex = selectedGenre.genreSongs.findIndex(
        (song) => song.id === songID
      );
      songSetUp(songID, playlists, activePlaylist, selectedGenre);
      activePlaylist.active = false;
    });
  });
}

export { renderGenres, renderSongs };
