const spinner = document.getElementById(`spinner`);
const spinner1 = document.getElementById(`spinner1`);
const spinner2 = document.getElementById(`spinner2`);
const spinner3 = document.getElementById(`spinner3`);
const spinner4 = document.getElementById(`spinner4`);
const spinner5 = document.getElementById(`spinner5`);
const sidelist = document.getElementById(`ulBox`);
// SEZIONE ALTRO DI CIO CHE TI PIACE
const moreYouLike = (genre, par) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      spinner1.classList.add(`d-none`);
      console.log(detail);
      const myRow = document.getElementById("myRow");
      myRow.classList.add("d-flex", "flex-row");
      // const arrayList = [];

      for (let i = 0; i < 10; i++) {
        // arrayList.push(detail.data[i].title);
        // const li = document.createElement(`li`);
        // li.classList.add(`mb-2`, `classGrey`, `select`, `fs-5`);

        // li.innerHTML = `<a class=" classGrey underline fw-bold"  href="../albumPage/album.html?album=${detail.data[i].album.id}">${arrayList[i]}</a>`;
        // sidelist.appendChild(li);

        const newDiv = document.createElement("div");
        newDiv.addEventListener(`mouseover`, function (e) {
          newDiv.classList.remove(`resize`);
          newDiv.classList.add(`scale`);

          console.log(newDiv);
        });
        newDiv.addEventListener(`mouseleave`, function (e) {
          newDiv.classList.add(`resize`);

          console.log(newDiv);
        });
        newDiv.classList.add("col-4", "col-lg-3");

        newDiv.innerHTML = `<a href="../albumPage/album.html?album=${detail.data[i].album.id}" class="fw-bold text-white link-underline link-underline-opacity-0">
              <div class="card h-100 p-0  text-white border-0 cardShadow " id="cardColor"   >
              <div position-relative class=" ps-2 pt-2 pe-2">
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top img shadow" alt="${detail.data[i].album.title}">
              </div>
              <div class=" card-body d-flex flex-column justify-content-center text-center">
              
              <p class="card-text">${detail.data[i].title}</p>
              </div>
              <i class="grey bi bi-spotify" id="spotify-logo"></i>
              </div>
        </div>
        </a>
     `;

        myRow.appendChild(newDiv);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
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
      const spinner = document.getElementById(`spinner`);
      spinner.classList.add(`d-none`);
      console.group(detail);
      // const arrayList = [];
      for (let i = 0; i < 6; i++) {
        // arrayList.push(detail.data[i].title);
        // const li = document.createElement(`li`);
        // li.classList.add(`mb-2`, `classGrey`, `select`, `fs-5`);
        // li.innerHTML = `<a class=" classGrey underline fw-bold"  href="../albumPage/album.html?album=${detail.data[i].album.id}">${arrayList[i]}</a>`;
        // sidelist.appendChild(li);
        // sidelist.appendChild(li);

        const col = document.createElement(`div`);
        col.classList.add(`col-12`, `col-xs-12`, `col-md-6`, `h-100`,`col-lg-4`,`col-xl-4`);

        col.innerHTML = `
        <a href="../albumPage/album.html?album=${detail.data[i].album.id}" class="text-white link-underline link-underline-opacity-0">
       <div class="d-flex align-items-center bg-fourth rounded-1 select-border">
         <img
           src="${detail.data[i].album.cover_medium}"
           class="rounded-start-1  p-1"
           width=60px 
           alt="${detail.data[i].album.title}"
         />
         
         <div class="d-flex align-items-center">
         <h6 class="ms-2 fs-7 fw-bold text-white link-underline link-underline-opacity-0 smaller">${detail.data[i].album.title}</h6>
         </div>
         
         </div>
         </a>
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
      spinner2.classList.add(`d-none`);
      console.group(detail);
      
      for (let i = 0; i < 1; i++) {
       

        const row = document.createElement(`div`);

        row.classList.add(
          `select-border2`,
          `row`,
          `mt-3`,
          `g-2`,
          `bg-fourth`,
          `rounded-2`,
          `p-2`,
          `d-md-none`
        );

        row.innerHTML = ` 
        <a href="../albumPage/album.html?album=${
          detail.data[i].album.id
        }" class="text-white link-underline link-underline-opacity-0">
          <div class="row">
          <div class="col-6">
          <div class="row px-3 pb-3">
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
          </div>
          <div class="col-6">
          <h6 class="classGrey">Playlist</h6>
          <p>${string}</p>
          </div>
          <div class="col-12 d-flex justify-content-between">
          <div>
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
          </div>

          </div>
          </div>
          </a>
             `;

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
      spinner3.classList.add(`d-none`);
      console.group(detail);

      for (let i = 0; i < 10; i++) {
        const col = document.createElement(`div`);

        col.innerHTML = `
        <div class="carousel-item  ">
                    <div class="row d-flex flex-nowrap" >
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
        <a href="../albumPage/album.html?album=${detail.data[i].album.id}"><button
            type="button"
            class="btn rounded-5 px-4 py-2 btn-outline-dark fw-bold bg-primary"
          >
            Play
          </button></a>
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

const rightCol = document.getElementById(`rightCol`);
const friendsActivity = (genre) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      spinner4.classList.add(`d-none`);
      console.log(detail);

      for (let i = 0; i < 6; i++) {
        const newDiv = document.createElement("div");

        newDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mt-4">
            <div>
              <div class="d-flex align-items-start mt-2 ms-2">
                <img
                  src="${detail.data[i].album.cover_medium}"
                  class="rounded-5 me-2"
                  alt=""
                  width="40"
                />
                <div class="fs-9">
                  <h6 class="m-0 fw-bold">${detail.data[i].artist.name}</h6>
                  <p class="m-0 fw-bold">${detail.data[i].album.title}</p>
                  <p class="m-0 fw-bold">${detail.data[i].title}</p>
                </div>
              </div>
            </div>
            <span class="mb-4 fs-8">5h</span>
          </div>
     `;

        rightCol.appendChild(newDiv);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

let s1 = "rock";
let s2 = "classica";
let s3 = "rap";
moreYouLike(s3);
moreYouLike(s2);
createPersonalSection(`punk-pop`);
// createPersonalSection(`pop`);
createPersonalPlaylist(`noyz narcos`, `best of Noyz Narcos`);
createPersonalPlaylist(`metal`, `Metal composition`);
createPersonalPlaylist(`gianna nannini`, `My playlist of Gianna Nannini`);

createCarousel(`pop`);

friendsActivity(`pop`);


const myCol = document.getElementById("rightCol");
const btnOut = document.getElementById("btnOut");
const btnIn = document.getElementById("showIcon");
console.log(myCol);
console.log(btnIn);
console.log(btnOut);

btnOut.addEventListener("click", () => {
  myCol.classList.add("swing-out-right-bck");
  myCol.classList.remove("swing-in-right-bck");
  btnOut.classList.add("d-none");
  btnIn.classList.remove(`d-none`);
  const disappear = () => {
    myCol.classList.remove("d-xxl-block");
  };
  setTimeout(disappear, 800);
});

btnIn.addEventListener("click", () => {
  myCol.classList.add("d-xxl-block");
  myCol.classList.remove("swing-out-right-bck");
  myCol.classList.add("swing-in-right-bck");
  btnIn.classList.add(`d-none`);
  btnOut.classList.remove("d-none");
});

const footerHeart2 = document.getElementById(`heart`);
const footerHeartFill2 = document.getElementById(`heart-fill`);
// console.log(footerHeart2)

footerHeart2.addEventListener(`click`, function (e) {
  e.target.classList.toggle("bi-heart-fill");
  e.target.classList.toggle("bi-heart");
  e.target.classList.toggle("text-primary");
  console.log(e.target);
});

const arrayList = [];
const arrayId = [];

const createLeftCol = (genre) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      spinner5.classList.add(`d-none`);
      for (let i = 0; i < 5; i++) {
        arrayList.push(detail.data[i].title);
        arrayId.push(detail.data[i].album.id);
        const li = document.createElement(`li`);
        li.classList.add(`mb-2`, `select`, `fs-5`);
        li.innerHTML = `<a class=" classGrey underline fw-bold"  href="../albumPage/album.html?album=${detail.data[i].album.id}">${detail.data[i].title}</a>`;
        sidelist.appendChild(li);
      } 
      sessionStorage.setItem(`list`,JSON.stringify(arrayList))
      sessionStorage.setItem(`Id`,JSON.stringify(arrayId))
      console.log(arrayList);
    });
};

createLeftCol(`gianni morandi`);
createLeftCol(`rock`);
createLeftCol(`rap`);
createLeftCol(`metal`);
createLeftCol(`baglioni`);
createLeftCol(`tenacious d`);
createLeftCol(`noyz narcos`);

