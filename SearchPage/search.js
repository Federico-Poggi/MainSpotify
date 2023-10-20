const search = document.getElementById("searchBtn");
const search2 = document.getElementById("search");
const searchSongs = () => {
  const searchWrap = document.getElementById("search");
  const searchValue = searchWrap.value;
  localStorage.setItem("query", searchValue);
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchValue}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.log(detail);
      const myHead = document.getElementById("myHead");
      myHead.innerHTML = ``;
      const myTitle = document.createElement("div");
      myTitle.classList.add("hover");

      myTitle.innerHTML = `
      <div id="myTitle" class="col-12 d-flex">
      <div id="gray-bg" class=" col-12 col-lg-5 rounded bg-dark d-flex flex-lg-column select-border2 p-2">
        <div id="artistImgWrap" class="d-flex align-items-center p-2">
          <img id="artistImg" src="${detail.data[0].album.cover_medium}" class="shadow rounded-circle" alt="${detail.data[0].album.title}">
        </div>
        <div class="d-flex flex-column justify-content-center px-4 p-lg-2">
          <div class="fs-2 fw-bold text-light"> 
            ${detail.data[0].artist.name}
          </div>
          <div class="d-flex justify-content-start">
            <a href="../ArtistPage/artistPage.html?artist=${detail.data[0].artist.name}"><span class=" btn btn-secondary rounded-5 fs-6 py-1 mt-2">Artista</span></a>
          </div>
        </div>
      </div>
        <div class=" d-none d-lg-flex col offset-1 flex-column" id="listCol">
        </div>
    </div>

       `;
      myHead.appendChild(myTitle);
      const myh4 = document.getElementById("myH4Div");
      myh4.classList.remove("d-none");
      const myCol = document.getElementById("listCol");
      for (let i = 0; i < 4; i++) {
        const newCol = document.createElement("div");
        newCol.classList.add(`select-border`, `bg-fourth`, `mb-2`);
        newCol.innerHTML = `
        <div class="row">
          <div class="col d-flex my-2 ms-2 rounded">
            <img src="${detail.data[i].album.cover_medium}" class="shadow imgList me-2" alt="${detail.data[i].album.title}">
            <div class="col d-flex flex-column justify-content-center">
              <div class="small"><a href="../albumPage/album.html?album=${detail.data[i].album.id}" 
              class="link-underline link-underline-opacity-0 card-title fw-bold ">${detail.data[i].album.title}</a>
              </div>
              <div class="small"><a href="../ArtistPage/artistPage.html?artist=${detail.data[i].artist.name}" 
              class="link-underline link-underline-opacity-0 card-title gray ">${detail.data[i].artist.name}</a>
              </div>
            </div>
          </div>
        </div>
      `;
        myCol.appendChild(newCol);
      }
      // myTitle.classList.add("py-5", "display-1");
      // myHead.style.background = `url("${detail.data[5].album.cover_xl}")`;
      // myHead.style.backgroundSize = "cover";
      // myHead.style.backgroundPosition = "center";
      // myHead.style.backgroundRepeat = "no-repeat";

      const myRow = document.getElementById("myRow");
      myRow.classList.add("d-flex", "flex-row");
      myRow.innerText = ``;
      const myH = document.getElementById("myH4");
      myH.classList.add("py-4", "mt-5");
      myH.innerHTML = ``;
      myH.innerHTML = `Altro di ${detail.data[0].artist.name}`;
      for (let i = 0; i < 12; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(
          "mb-4",
          "hover",
          "col-6",
          "col-sm-4",
          "col-lg-3",
          "col-xxl-2"
        );
        newDiv.addEventListener(`mouseover`, function (e) {
          newDiv.classList.remove(`resize`);
          newDiv.classList.add(`scale`);

          console.log(newDiv);
        });
        newDiv.addEventListener(`mouseleave`, function (e) {
          newDiv.classList.add(`resize`);

          console.log(newDiv);
        });
        newDiv.innerHTML = `
              
              <div class="card h-100 p-0 text-white border-0 bg-fourth select-border" id="cardColor">
              <div class="w-100  ps-2 pt-2 pe-2">
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top shadow w-100  img" alt="${detail.data[i].album.title}">
              </div>
              <div class="card-body d-flex flex-column justify-content-center text-center">
              <a id="artist" href="../ArtistPage/artistPage.html?artist=${detail.data[i].artist.name}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].artist.name}</a>
              <a  href="../albumPage/album.html?album=${detail.data[i].album.id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].album.title}</a>
              </div>
              </div>
        </div>
     `;
        myRow.appendChild(newDiv);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
search.addEventListener("click", searchSongs);
search2.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

const footerHeart2 = document.getElementById(`heart`);
const footerHeartFill2 = document.getElementById(`heart-fill`);

footerHeart2.addEventListener(`click`, function (e) {
  e.target.classList.toggle("bi-heart-fill");
  e.target.classList.toggle("bi-heart");
  e.target.classList.toggle("text-primary");
  console.log(e.target);
});
