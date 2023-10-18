const sidelist = document.getElementById(`ulBox`);

// SEZIONE ALTRO DI CIO CHE TI PIACE
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
      const arrayList = [];

      for (let i = 0; i < 10; i++) {
        arrayList.push(detail.data[i].title);
        const li = document.createElement(`li`);
        li.classList.add(`mb-2`, `classGrey`);
        li.innerText = arrayList[i];
        sidelist.appendChild(li);

        const newDiv = document.createElement("div");
        newDiv.classList.add("w-20");

        newDiv.innerHTML = `
              <div class="card h-100 p-0  text-white border-0 " id="cardColor"   >
              <div position-relative class=" ps-2 pt-2 pe-2">
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top img shadow" alt="${detail.data[i].album.title}">
              </div>
              <div class=" card-body d-flex flex-column justify-content-center text-center">
              <h6 class="card-title">c</h6>
              <p class="card-text">${detail.data[i].title}.</p>
              </div>
              <i class="grey bi bi-spotify" id="spotify-logo"></i>
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

// SEZIONE BUONASERA
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
      const arrayList = [];
      for (let i = 0; i < 6; i++) {
        arrayList.push(detail.data[i].title);
        const li = document.createElement(`li`);
        li.classList.add(`mb-2`, `classGrey`);
        li.innerText = arrayList[i];
        sidelist.appendChild(li);

        const col = document.createElement(`div`);
        col.classList.add(`col-6`, `col-sm-4`);
        col.innerHTML = `
       <div class="d-flex align-items-center bg-fourth rounded-1 ">
         <img
           src="${detail.data[i].album.cover_medium}"
           class="rounded-start-1 shadow p-0"
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

// SEZIONE CARD MOBILE
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
      const arrayList = [];
      for (let i = 0; i < 1; i++) {
        arrayList.push(detail.data[i].title);
        const li = document.createElement(`li`);
        li.classList.add(`mb-2`, `classGrey`);
        li.innerText = arrayList[i];
        sidelist.appendChild(li);

        const row = document.createElement(`div`);
        row.classList.add(
          `row`,
          `mt-3`,
          `g-2`,
          `bg-fourth`,
          `rounded-2`,
          `p-2`,
          `d-md-none`
        );
        const col = document.createElement(`div`);
        const col2 = document.createElement(`div`);
        const col3 = document.createElement(`div`);
        col.classList.add(`col-6`);
        col2.classList.add(`col-6`);
        col3.classList.add(`col-12`, `d-flex`, `justify-content-between`);

        col.innerHTML = `<div class="row px-3 pb-3">
        <div class="col-6 m-0 p-0 ">
          <img
            src="${detail.data[i].album.cover_medium}"
            width="50px"
            alt=""
            class="w-100 shadow"
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 2].album.cover_medium}"
            width="50px"
            class="w-100 shadow"
            alt=""
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 4].album.cover_medium}"
            width="50px"
            class="w-100 shadow"
            alt=""
          />
        </div>
        <div class="col-6 m-0 p-0">
          <img
            src="${detail.data[i + 7].album.cover_medium}"
            width="50px"
            class="w-100 shadow"
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

const carouselRow = document.getElementById(`carouselRow`);
const createCarousel = function (par) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${par}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.group(detail);

      for (let i = 0; i < 10; i++) {
        const col = document.createElement(`div`);
        
        col.innerHTML = `
        <div class="carousel-item">
                    <div class="row d-flex" >
        <div class="col-3 d-flex align-items-center">
        <img
          src="${detail.data[i].album.cover_medium}"
          class="w-100 shadow"
          alt="..."
        />
      </div>
      <div class="col">
        <span>Album</span>
        <h1 class="display-4 fw-bold">${detail.data[i].title}</h1>
        <p>${detail.data[i].artist.name}</p>
        <p>ascolta il nuovo singolo dell'album ${detail.data[i].album.title}</p>
        <div class="align-items-center d-flex">
          <button
            type="button"
            class="btn rounded-5 px-4 py-2 btn-outline-dark fw-bold bg-primary"
          >
            Play
          </button>
          <button
            type="button"
            class="btn rounded-5 px-4  py-2 border hover-text-black  border-2 border-fourth text-white fw-bold mx-4"
          >
            Salva
          </button>
          <i class="bi bi-three-dots fs-2 ms-2 classGrey"></i>
        </div>
      </div>
      <div
        class="col-3 justify-content-end align-items-start me-4 d-flex"
      >
        <button
          type="button"
          class="btn  classGrey fw-bold border-0 rounded-5 hideButton"
       
        >
          <p class="fs-10 5 m-0">NASCONDI ANNUNCI</p>
        </button>
      </div>
      </div>
      </div>
    `;
        carouselRow.appendChild(col);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

const toggle = function (e) {
  console.log(e.target);
  e.target.classList.toggle(`bi-heart-fill`);
  e.target.classList.toggle(`bi-heart`);
  e.target.classList.toggle(`text-primary`);
};

let s1 = "rock";
let s2 = "pop";
let s3 = "rap";
moreYouLike(s2);
moreYouLike(s1);
createPersonalSection(s1);
createPersonalPlaylist(`noyz narcos`, `best of Noyz Narcos`);
createPersonalPlaylist(`metal`, `Metal composition`);
createPersonalPlaylist(`gianna nannini`, `My playlist of Gianna Nannini`);
createPersonalPlaylist(`gianna nannini`, `My playlist of Gianna Nannini`);
createCarousel(`trap`);
