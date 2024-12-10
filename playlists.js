import { songs, songSetUp } from "./songs.js";

function startPlaylist(event, playlists, activePlaylist, selectedGenre) {
  if (
    document.querySelector(".playlist").getAttribute("data-add-mode") === "true"
  ) {
    return;
  }
  const playlist = document.querySelector(".playlist .active-playlist");
  if (playlist.classList.contains("hidden")) {
    playlist.classList.remove("hidden");
  }
  const name = event.target.getAttribute("data-playlist");
  playlist.querySelector(".playlist-name").textContent = name;
  activePlaylist.name = name;
  activePlaylist.active = true;
  activePlaylist.queue = Array.from(playlists[name]);
  activePlaylist.songIndex = 0;
  const songsList = playlist.querySelector(".songs");
  songsList.innerHTML = "";
  activePlaylist.queue.forEach((idx) => {
    const song = document.createElement("li");
    song.textContent = songs.find((song) => song.id === idx).title;
    songsList.appendChild(song);
  });
  songSetUp(
    activePlaylist.queue[activePlaylist.songIndex],
    playlists,
    activePlaylist,
    selectedGenre
  );
}

function renderCurrentPlaylistRefreshed(playlists, activePlaylist) {
  if (activePlaylist.active === true) {
    const playlist = document.querySelector(".playlist .active-playlist");
    const songsList = playlist.querySelector(".songs");
    songsList.innerHTML = "";
    const name = activePlaylist.name;
    activePlaylist.queue = Array.from(playlists[name]);
    activePlaylist.queue.forEach((idx) => {
      const song = document.createElement("li");
      song.textContent = songs.find((song) => song.id === idx).title;
      songsList.appendChild(song);
    });
  }
}

function renderPlaylists(playlists, activePlaylist, selectedGenre) {
  const playlistList = document.querySelector(
    ".playlist .playlists .playlists-list"
  );
  playlistList.innerHTML = "";
  Object.keys(playlists).forEach((playlist) => {
    const li = document.createElement("li");
    li.setAttribute("data-playlist", playlist);
    li.innerHTML = `<span>${playlist}</span>`;
    li.addEventListener("click", (event) => {
      startPlaylist(event, playlists, activePlaylist, selectedGenre);
    });
    playlistList.appendChild(li);
  });
  document.querySelector(".playlist").setAttribute("data-add-mode", "false");
  document.querySelector(".playlist .add-to-playlists").classList.add("hidden");
}

function addToPlaylistSelect(playlists, activePlaylist) {
  document
    .querySelectorAll(".playlist .playlists .playlists-list li")
    .forEach((li) => {
      const checkBox = document.createElement("div");
      checkBox.classList.add("check-box");
      li.appendChild(checkBox);
      li.addEventListener("click", (event) => {
        if (li.getAttribute("data-selected") === "true") {
          li.setAttribute("data-selected", "false");
          checkBox.innerHTML = "";
        } else {
          li.setAttribute("data-selected", "true");
          const check = document.createElement("img");
          check.setAttribute("src", "./Images/check-mark.svg");
          li.querySelector(".check-box").appendChild(check);
        }
      });
    });
  const added = document.querySelector(".playlist .added");
  if (!added.classList.contains("hidden")) {
    added.classList.add("hidden");
    added.classList.remove("animate");
  }
}

function addToPlaylist(songID, playlists, activePlaylist) {
  let count = 0;
  console.log("Playlists before:");
  console.log(playlists);
  document
    .querySelectorAll(`.playlist .playlists .playlists-list li`)
    .forEach((li) => {
      if (li.getAttribute("data-selected") === "true") {
        count++;
        console.log(li.getAttribute("data-playlist"));
        playlists[li.getAttribute("data-playlist")].add(songID);
        const checkBox = li.querySelector(".check-box");
        li.removeChild(checkBox);
      }
    });
  console.log("Playlists after:");
  console.log(playlists);
  renderCurrentPlaylistRefreshed(playlists, activePlaylist);
  const added = document.querySelector(".playlist .added");
  added.textContent = `Added to ${count} playlists`;
  added.classList.remove("hidden");
  setTimeout(() => {
    added.classList.add("animate");
  }, 10);
}

export { startPlaylist, renderPlaylists, addToPlaylistSelect, addToPlaylist };
