const moreYouLike = (genre) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
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
      myRow.classList.add("d-flex", "flex-row");
      for (let i = 0; i < 4; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-4");

        newDiv.innerHTML = `
              <div class="card h-100 p-0  text-white border-0" id="cardColor"   >
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top ps-2 pt-2 pe-2 img" alt="${detail.data[i].album.title}">
              <div class="card-body d-flex flex-column justify-content-center text-center">
              <h6 class="card-title">${detail.data[i].album.title}</h6>
              <p class="card-text">${detail.data[i].title}.</p>
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
// checkApi(s1);

// checkApi(s3);

const showIcon = document.getElementById(`showIcon`);
const rigthIcon = document.getElementById(`rightCol`);
const closeTab = function (e) {
  rightCol.classList.remove(`d-lg-block`);
  showIcon.classList.remove(`d-none`);
};

const riShow = function (e) {
  rightCol.classList.add(`d-lg-block`);
  showIcon.classList.add(`d-none`);
};

const personalPlaylist = document.getElementById(`personalPlaylist`);

const createPersonalSection = (genre) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.group(detail);
      for (let i = 0; i < 6; i++) {
        const col = document.createElement(`div`);
        col.classList.add(`col-6`, `col-sm-4`);
        col.innerHTML = `
       <div class="d-flex align-items-center">
         <img
           src="${detail.data[i].album.cover_medium}"
           class="rounded-start-2"
           width=60
           alt="${detail.data[i].album.title}"
         />
         <div>
           <h6 class="ms-3 fs-7 fw-bold">${detail.data[i].album.title}</h6>
         </div>
       </div>
     </div>
    `;
        personalPlaylist.appendChild(col);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

// createPeronalSection();

// createPeronalSection();

const mtPlaylistName = [
  `study and work`,
  `InThePanchine`,
  `Barbero`,
  `jogging`,
  `gaming`,
  `RapGods`,
];
const publicPlaylist = document.getElementById(`publicPlaylist`);
const createPersonalPlaylist = (genre, string) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.group(detail);
      for (let i = 0; i < 1; i++) {
        const row = document.createElement(`div`);
        row.classList.add(`row`, `mt-3`, `g-2`, `bg-third`, `rounded-2`, `p-2`);
        const col = document.createElement(`div`);
        const col2 = document.createElement(`div`);
        const col3 = document.createElement(`div`);
        col.classList.add(`col-6`);
        col2.classList.add(`col-6`);
        col3.classList.add(`col-12`, `d-flex`, `justify-content-between`);

        col.innerHTML = `<div class="row px-3 pb-3">
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i].album.cover_medium}"
            width="50px"
            alt=""
            class="w-100"
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 2].album.cover_medium}"
            width="50px"
            class="w-100"
            alt=""
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 4].album.cover_medium}"
            width="50px"
            class="w-100"
            alt=""
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 7].album.cover_medium}"
            width="50px"
            class="w-100"
            alt=""
          />
        </div>
      </div>
        `;
        col2.innerHTML = `<h6 class="classGrey">Playlist</h6>
        <p>${string}</p>`;
        col3.innerHTML = ` <div>
        <div class="display-5 ms-1 classGrey">
          <i class="bi bi-heart d-non display-5 heart " onclick="toggle(event)"></i>
          <i class="bi bi-three-dots-vertical classGrey"></i>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <span class="grey me-4">${detail.data.length} brani</span>
        <div class="display-6">
          <i class="bi bi-caret-right-fill arrow px-1"></i>
        </div>
      </div>`;

        row.appendChild(col);
        row.appendChild(col2);
        row.appendChild(col3);
        publicPlaylist.appendChild(row);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

let s1 = "rock";
let s2 = "pop";
let s3 = "rap";

createPersonalSection(s1);


moreYouLike(s2);
const toggle = function (e) {
  console.log(e.target);
  e.target.classList.toggle(`bi-heart-fill`);
  e.target.classList.toggle(`bi-heart`);
  e.target.classList.toggle(`text-primary`);
};
createPersonalPlaylist(`noyz narcos`, `best of Noyz Narcos`);
createPersonalPlaylist(`metal`, `Metal composition`);
createPersonalPlaylist(`gianna nannini`, `My playlist of Gianna Nannini`);
createPersonalPlaylist(`gianna nannini`, `My playlist of Gianna Nannini`);
