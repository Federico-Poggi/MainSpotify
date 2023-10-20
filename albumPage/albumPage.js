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

      newDiv.innerHTML = `
      <div id="mainCard" class="cardWrap px-5">
      <div id="head" class="">
        <div id="btn-wrap">
          <button id="backBtn" class="btn p-1">
            <i class="bi bi-arrow-left-circle p-2 my-2 fs-3"></i>
          </button>
          <button id="frwBtn" class="btn p-1 my-2">
            <i class="bi bi-arrow-right-circle p-2 fs-3"></i>
          </button>
        </div>
        <div></div>
      </div>
      <div class=" d-flex flex-row flex-wrap">
        <div class="d-flex align-items-end mb-1 me-3">
          <img id="mainImg" src="${detail.cover_big}" class="card-img " alt="${detail.title}" />
        </div>
        <div
          class="card-body d-flex flex-column justify-content-end"
        >
          <div class="my-0 small text-light d-flex pt-1">ALBUM</div>
          <h1 id="myH1" class="hover card-title pb-3 pt-1">${detail.tracks.data[0].album.title}</h1>
          <div class="card-text d-flex align-items-center justify-content-start">         
            <img id="smallImg" src="${detail.artist.picture_medium}" alt="/" class=" rounded-circle"  />
            <div class="d-flex">
            <span class="hover text-light smaller me-1">${detail.artist.name}</span>
            <span class="smaller hover d-none d-xl-block me-1"> - ${detail.release_date}</span>
            <span class="smaller hover d-none d-xl-block me-1"> - ${detail.tracks.data.length} Brani,</span>
            <span id="durationAlbum" class="smaller hover gray d-none d-xl-block"> ${detail.duration}</span>
            </div>
            </div>
        </div>
      </div>
      <div id="songList">
        <div class="d-flex py-4 display-flex align-items-center ">
          <i class="bi bi-play-circle-fill p-2 mx-1 display-5 text-primary" id="playmusic"></i>
          <i class="bi bi-stop-circle-fill p-2 mx-1 display-5 text-primary position-absolute" id="pausemusic"></i>
          <i class="bi bi-heart p-2 mx-1 fs-4 gray" onclick="toggle(event)"></i>
          <i class="bi bi-arrow-down-circle p-2 fs-4 mx-1 gray"></i>
          <i class="bi bi-three-dots p-2 fs-4 mx-1 gray"></i>
        
        </div>
        <div class="row gray border-bottom grayBorder">
          <div class="col d-flex">
            <div class="px-3">#</div>
            <div>TITOLO</div>
          </div>
          <div class="col-1 d-none d-sm-flex justify-content-end">RIPRODUZIONI</div>
          <div class="col-3 d-flex justify-content-end"><i class="bi bi-clock"></i></div>
        </div>
        <div id="myList" class="gray">
        </div>
      </div>
    </div>`;

      myRow.appendChild(newDiv);
      const back = document.getElementById("backBtn");
      const forward = document.getElementById("frwBtn");
      back.addEventListener("click", () => {
        history.back();
      });
      forward.addEventListener("click", () => {
        history.forward();
      });
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
        newListDiv.classList.add("row", "py-2", "select", "hover");
        newListDiv.innerHTML = `
        <div class="col d-flex ">
        <div class="px-3 d-flex align-items-center">${i + 1}</div>
        <div class="d-flex flex-column">
          <div class="prova d-flex justify-content-start" id="tracker">${
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
      const play = document.getElementById("playmusic");
      const pause = document.getElementById("pausemusic");
      pause.style.visibility = "hidden";

      //CLICK SU UNA CANZONE PER RIPRODURLA
      const songer = document.getElementsByClassName(
        "prova d-flex justify-content-start"
      );
      const songer2 = Array.from(songer);
      for (let i = 0; i < songer2.length; i++) {
        songer2[i].addEventListener("click", function () {
          console.log(songer2[i]);
          play.style.visibility = "hidden";
          pause.style.visibility = "visible";
          let song2 = new Audio(detail.tracks.data[i].preview);
          song2.pause();
          song2.currentTime = 0;
          song2.play();

          pause.addEventListener("click", function () {
            song2.pause();
            play.style.visibility = "visible";
            pause.style.visibility = "hidden";
          });
        });
      }
      //FINE CLICK SU UNA CANZONE PER RIPRODURLA

      //FUNZIONE RIPRODUZIONE DA BOTTONE

      play.addEventListener("click", function () {
        play.style.visibility = "hidden";
        pause.style.visibility = "visible";
        var seconds = 0;
        let i = 0;
        function incrementSeconds() {
          if (seconds === 30) {
            i++;
            song = new Audio(detail.tracks.data[i].preview);
            song.play();
            seconds = 0;
            if (i === detail.tracks.data.length) {
              i = 0;
            }
          } else {
            if (isPaused === false) {
              seconds += 1;
            }
          }
        }
        let cancel = setInterval(incrementSeconds, 1000);
        let song = new Audio(detail.tracks.data[i].preview);
        song.play();
        let isPaused = false;

        pause.addEventListener("click", function () {
          song.pause();
          isPaused = true;
          play.style.visibility = "visible";
          pause.style.visibility = "hidden";
        });
      });
      // FINE FUNZIONE RIPRODUZIONE DA BOTTONE
    })

    .catch((err) => {
      console.log("Error: ", err);
    });
};
albumFetch();

const toggle = (e) => {
  console.log(e.target);
  e.target.classList.toggle("bi-heart-fill");
  e.target.classList.toggle("bi-heart");
  e.target.classList.toggle("text-primary");
  console.log(e.target);
};
const footerHeart2 = document.getElementById(`heart`);
const footerHeartFill2 = document.getElementById(`heart-fill`);
// console.log(footerHeart2)

footerHeart2.addEventListener(`click`, function (e) {
  e.target.classList.toggle("bi-heart-fill");
  e.target.classList.toggle("bi-heart");
  e.target.classList.toggle("text-primary");
  console.log(e.target);
});
// footerHeartFill2.addEventListener(`click`, toggle(event));
