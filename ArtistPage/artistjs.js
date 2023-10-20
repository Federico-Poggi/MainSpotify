const addressBarContent = new URLSearchParams(location.search);
const myArtist = addressBarContent.get("artist");
const sectionPopular = document.getElementById("contentpopular");
const btnBar = document.getElementById("search");
const query = localStorage.getItem("query");
const artistSection = document.getElementById("section");
const divSmall = document.getElementsByClassName("scrollmenu")[0];
const artistName = document.getElementById("header");
const artistTitle = document.getElementById("nameArtist");
const listener = document.getElementById("listener");
const relatives = document.getElementById("relatives");
const relativeSmall = document.getElementById("relativScroll");
const searchName = query;
console.log(myArtist);

const createLi = () => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${myArtist}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((getData) => {
      console.log(getData);
      let counter = 0;
      for (let i = 0; i < 6; i++) {
        console.log(getData.data[i].album.title);
        counter = setInterval(() => {
          counter++;
        }, 1000);

        // DURATION IN MINUTI
        const toMinute = (duration) => {
          let milliseconds = Math.ceil(duration * 1000);
          let minuti = Math.floor(milliseconds / 60000);
          let secondi = Math.floor(milliseconds - minuti * 60000) / 1000;
          console.log(minuti);
          console.log(secondi);
          if (secondi < 10) {
            return minuti + ":" + "0" + secondi;
          } else {
            return minuti + ":" + secondi;
          }
        };

        const albumCover = getData.data[i].album.cover_small;
        const albumTitle = getData.data[i].album.title;
        console.log(albumTitle);
        const albumDuration = getData.data[i].duration;
        const albumRank = getData.data[i].rank;
        const art = document.createElement("li");
        art.className =
          "list-group, d-flex , align-items-center , bg-transparent , border-0 , text-white , mt-3 , px-0 ";
        art.innerHTML = `<div class=' d-flex align-items-center'>
          <h5  class="px-3 text-light counter  m-0">${counter}</h5>

          <img  class="w-50" src="${albumCover}" alt="img"/>
        </div>

        <p  class= "title m-0 text-light w-20 style="padding-left: 2%">${albumTitle}</p>

        <span class='px-2 m-0  w-20 rank'>${albumRank}</span>

        <p class='px-2 duration '>${toMinute(albumDuration)}</p>`;
        artistSection.appendChild(art);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
createLi();

const createPopulars = () => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${myArtist}`
  )
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new error("Error getting the datas");
      }
    })
    .then((dati) => {
      console.log(dati);
      const toMinute = (duration) => {
        let milliseconds = Math.ceil(duration * 1000);
        let minuti = Math.floor(milliseconds / 60000);
        let secondi = Math.floor(milliseconds - minuti * 60000) / 1000;
        console.log(minuti);
        console.log(secondi);
        if (secondi < 10) {
          return minuti + ":" + "0" + secondi;
        } else {
          return minuti + ":" + secondi;
        }
      };
      for (let k = 0; k < 12; k++) {
        const sectionDiv = document.createElement("div");

        sectionDiv.className =
          "d-none , d-sm-flex , col-12 col-lg-3 , card col-xl-3 , col-xxl-2 , mx-0 bg-transparent , border-0";

        sectionDiv.innerHTML = `<img class="card-img" src="${
          dati.data[k].album.cover_medium
        }" alt="" />

          <div class="card-body p-0 text-center">
            <h4 class="h4 text-light my-2 fs-7 sezione">${
              dati.data[k].title
            }</h4>
            <p class="h6 text-light fs-8">${toMinute(
              dati.data[k].duration
            )} - ${dati.data[k].type}</p>
          </div>`;
        sectionPopular.appendChild(sectionDiv);

        const imgRel = document.createElement("img");
        imgRel.className = "px-2 w-40";

        imgRel.setAttribute("src", dati.data[k].album.cover_medium);
        imgRel.setAttribute("alt", "img");

        divSmall.appendChild(imgRel);
      }
      createRelatives();
    })
    .catch((err) => {
      console.log(err);
    });
};
createPopulars();

const createRelatives = () => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${myArtist}`
  )
    .then((ris) => {
      if (ris.ok) {
        return ris.json();
      } else {
        throw new error("Error getting the datas");
      }
    })
    .then((dataid) => {
      console.log(dataid);
      artistName.style.background = `url(${dataid.data[0].artist.picture_xl})`;
      artistName.style.backgroundPosition = "";
      artistName.style.backgroundSize = "";
      artistName.style.height = "400px";
      artistName.classList.add("p-5");
      const newDiv = document.createElement("div");
      console.log(dataid.data[0].artist.name);
      newDiv.innerHTML = ` ${dataid.data[0].artist.name}`;
      artistTitle.prepend(newDiv);
      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${dataid.data[0].album.id}`
      )
        .then((res) => {
          if (res.ok) {
            return res.url;
          } else {
            throw new error("Error with IDS");
          }
        })
        .then((newFetch) => {
          fetch(newFetch)
            .then((res) => {
              if (res.ok) {
                console.log(res);
                return res.json();
              } else {
                throw new Error("rror");
              }
            })
            .then((response) => {
              const genreID = response.genres.data[0].name;
              fetch(
                `https://striveschool-api.herokuapp.com/api/deezer/search?q=${genreID}`
              )
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  } else {
                    throw new Error("error");
                  }
                })
                .then((datas) => {
                  /// RELATIVES CREATION /////
                  for (let j = 0; j < 12; j++) {
                    const sectionDiv = document.createElement("div");
                    sectionDiv.className =
                      "d-none , d-sm-flex , col-12 col-lg-3 , card col-xl-3 , col-xxl-2 , mx-0 bg-transparent , border-0";
                    sectionDiv.innerHTML = `<img class="card-img" src="${datas.data[j].album.cover_medium}" alt="" />
                        <div class="card-body p-0 text-center">
                          <h4 class="h4 text-light fs-7 sezione">${datas.data[j].album.title}</h4>
                          <p class="h6 text-light fs-8">${datas.data[j].release_date} - Album</p>
                        </div>`;
                    // relatives.appendChild(sectionDiv);
                    const imgRel = document.createElement("img");
                    imgRel.className = "px-2 w-40";
                    imgRel.setAttribute(
                      "src",
                      datas.data[j].album.cover_medium
                    );
                    imgRel.setAttribute("alt", "img");
                    console.log(imgRel);
                    relativeSmall.appendChild(imgRel);
                  }

                  /////
                  console.log(datas);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getHeader = () => {};
