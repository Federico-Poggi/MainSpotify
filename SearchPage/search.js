const search = document.getElementById("searchBtn");
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

      myTitle.innerHTML = `
      <div class="col-12 d-flex">
        <div id="gray-bg" class="col-6 pt-2 ps-2 rounded bg-dark">
          <div>
            <img src="${detail.data[0].album.cover_medium}" class="card-img-top ps-2 pt-2 pe-2 w-30 rounded-circle" alt="${detail.data[0].album.title}">
          </div>
          <div class=" ps-2 pt-3 pb-2 display-6 text-light"> ${detail.data[0].artist.name}
        </div>
        <span class=" ms-2 btn btn-secondary mb-2 rounded-5 fs-6 py-1">Artista</span>
        </div>
        <div class="col-5 offset-1" id="listCol">
        </div>
      </div>
       `;
      myHead.appendChild(myTitle);
      const myCol = document.getElementById("listCol");
      for (let i = 0; i < 4; i++) {
        const newCol = document.createElement("div");
        newCol.innerHTML = `
        <div class="row">
          <div class="col-3">
          <img src="${detail.data[i].album.cover_medium}" class="ps-2 pt-2 pe-2 w-100" alt="${detail.data[i].album.title}">
          </div>
          <div class="col d-flex flex-column">
          <div class="small"><a href="../artistPage/artist.html?album=${detail.data[i].album.id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].album.title}</a></div>
          <div class="small"><a href="../artistPage/artist.html?artist=${detail.data[i].artist.id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].artist.name}</a></div>
          </div>
        </div>
      `;
        myCol.appendChild(newCol);
      }

      const myRow = document.getElementById("myRow");
      myRow.classList.add("d-flex", "flex-row");
      myRow.innerText = ``;
      const myH4 = document.getElementById("myH4");
      myH4.classList.add("my-4");
      myH4.innerHTML = ``;
      myH4.innerHTML = `Altro di ${detail.data[0].artist.name}`;
      for (let i = 0; i < 8; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-4", "col-md-3", "col-xl-2");

        newDiv.innerHTML = `
              
              <div class="card h-100 p-0 text-white border-0" id="cardColor"   >
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top ps-2 pt-2 pe-2 img" alt="${detail.data[i].album.title}">
              <div class="card-body d-flex flex-column justify-content-center text-center">
              <a id="artist" href="../artistPage/artist.html?artist=${detail.data[i].artist.id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].artist.name}</a>
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
