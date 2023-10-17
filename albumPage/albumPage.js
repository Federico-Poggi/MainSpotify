const addressBarContent = new URLSearchParams(location.search);
const myAlbum = addressBarContent.get(`album`);
console.log(myAlbum);

const albumFetch = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${myAlbum}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.log(detail);
      const myRow = document.getElementById("myRow");
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `<div id="mainCard" class="cardWrap px-5">
      <div id="head" class="">
        <div id="btn-wrap">
          <button class="btn p-3">
            <i class="bi bi-arrow-left-circle p-2 fs-5"></i>
          </button>
          <button class="btn p-3">
            <i class="bi bi-arrow-right-circle p-2 fs-5"></i>
          </button>
        </div>
        <div></div>
      </div>
      <div class=" d-flex flex-row">
        <div class="d-flex align-items-end mb-1 me-3">
          <img id="mainImg" src="${detail.cover_big}" class="card-img " alt="${detail.title}" />
        </div>
        <div
          class="card-body d-flex flex-column justify-content-between"
        >
          <p class="my-0">ALBUM</p>
          <h1 id="myH1" class="card-title">${detail.tracks.data[0].album.title}</h1>
          <div class="card-text d-flex align-items-center justify-content-start">         
            <img id="smallImg" src="${detail.artist.picture_medium}" alt="/" class=" rounded-circle"  />
            <div class="d-flex">
            <span class="smaller fw-bold me-1">${detail.artist.name}</span>
            <span class="smaller d-none d-xl-block me-1"> - ${detail.release_date}</span>
            <span class="smaller d-none d-xl-block me-1"> - ${detail.tracks.data.length} Brani - </span>
            <span id="durationAlbum" class="smaller d-none d-xl-block"> ${detail.duration}</span>
            </div>
            </div>
        </div>
      </div>
      <div id="songList">
        <div class="d-flex">
          <i class="bi bi-play-circle-fill p-2"></i>
          <i class="bi bi-heart p-2"></i>
          <i class="bi bi-heart-fill d-none p-2"></i>
          <i class="bi bi-arrow-down-circle p-2"></i>
          <i class="bi bi-three-dots p-2"></i>
        </div>
        <div class="row">
          <div class="col d-flex">
            <div class="px-3">#</div>
            <div>Titolo</div>
          </div>
          <div class="col-1 d-flex justify-content-end">Riproduzioni</div>
          <div class="col-3 d-flex justify-content-end"><i class="bi bi-clock"></i></div>
        </div>
        <div id="myList" class="">
        </div>
      </div>
                </div>`;
      myRow.appendChild(newDiv);
      const durationAlbum = document.getElementById("durationAlbum");
      const durationNumberAlbum = parseInt(durationAlbum.innerText);
      if (durationNumberAlbum > 60) {
        let hours = Math.floor(durationNumberAlbum / 3600);
        let min = Math.floor((durationNumberAlbum / 60) % 60);
        let sec = durationNumberAlbum % 60;
        durationAlbum.innerText = `${hours}h ${min}m ${sec}s`;
      }
      const mySongsList = document.getElementById("myList");
      for (let i = 0; i < detail.tracks.data.length; i++) {
        const newListDiv = document.createElement("div");
        newListDiv.classList.add("row", "py-2");
        newListDiv.innerHTML = `
        <div class="col d-flex">
        <div class="px-3 d-flex align-items-center">${i + 1}</div>
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-start">${
            detail.tracks.data[i].title
          }</div>
          <div>${detail.tracks.data[i].artist.name}</div>
        </div>
      </div>
      <div class="col-1 d-flex justify-content-end">${
        detail.tracks.data[i].rank
      }</div>
      <div class="col-3 duration d-flex justify-content-end">${
        detail.tracks.data[i].duration
      }</div>`;
        mySongsList.appendChild(newListDiv);
        const convert = () => {
          const duration = document.querySelectorAll(".duration");

          for (let y = 0; y < duration.length; y++) {
            const durationNumber = parseInt(duration[y].innerText);

            if (durationNumber > 60) {
              let hours = Math.floor(durationNumber / 60);
              let mins = durationNumber % 60;
              duration[y].innerText = `${hours}m ${mins}s`;
            }
          }
        };
        convert();
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
albumFetch();
