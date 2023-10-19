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

const searchName = query;

const idAlbum = [];
// const searchWrap = document.getElementById("search");

// cosi ho ottenuto un htmlCollection
fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
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
  .catch((err) => {
    console.log("error", err);
  });

fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((datas) => {
    for (let k = 0; k < datas.data.length; k++) {
      let idalbum = datas.data[k].id;
      let idToStr = idalbum.toString();
      idAlbum.push(idToStr);
      console.log(idAlbum);
      for (let y = 0; y < idAlbum.length; y++) {
        const a = parseInt(idAlbum[y]);
        console.log(a);
      }
    }
  })
  .catch((errop) => {
    console.log("error", errop);
  })
  .then((idNa) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${a}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((ids) => {
        console.log(ids);
      });
  })

  .catch((error) => {
    console.log("error", error);
  });

//   fetch(
//     `https://striveschool-api.herokuapp.com/api/deezer/album/${dates[j].album.id}`
//   );
// };

// fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     } else {
//       throw new Error("Error", err);
//     }
//   })

//   .then((content) => {
//     console.log(content);
//     artistTitle.innerText = content.data[0].artist.name;
//     listener.innerText = content.data[0].rank;
//     console.log(listener);
//     artistSection.innerHTML = ``;
//     let counter = 0;
//     for (let i = 0; i < 5; i++) {
//       console.log(content);

//       counter = setInterval(() => {
//         counter++;
//       }, 1000);

//       let time = content.data[i].duration;
//       const toMinute = () => {
//         let milliseconds = Math.ceil(time * 1000);
//         let minuti = Math.floor(milliseconds / 60000);
//         let secondi = Math.floor(milliseconds - minuti * 60000) / 1000;
//         console.log(minuti);
//         console.log(secondi);
//         if (secondi < 10) {
//           return minuti + ":" + "0" + secondi;
//         } else {
//           return minuti + ":" + secondi;
//         }
//       };

//       const art = document.createElement("li");
//       art.className =
//         "list-group, d-flex , align-items-center , bg-transparent , border-0 , text-white , mt-3 , px-0 ";
//       art.innerHTML = `<div class=' d-flex align-items-center'>
//           <h5  class="px-3 text-light counter  m-0">${counter}</h5>

//           <img  class="w-50" src="${
//             content.data[i].album.cover_small
//           }" alt="img"/>
//         </div>

//         <p  class= "title m-0 text-light w-20 style="padding-left: 2%">${
//           content.data[i].album.title
//         }</p>

//         <span class='px-2 m-0  w-20 rank'>${content.data[i].rank}</span>

//         <p class='px-2 duration '>${toMinute(time)}</p>`;
//       artistSection.appendChild(art);
//     }
//     return content.data;
//   })

//   .then((dates) => {
//     for (let j = 0; j < 12; j++) {
//       fetch(
//         `https://striveschool-api.herokuapp.com/api/deezer/album/${dates[j].album.id}`
//       )
//         .then((res) => {
//           if (res.ok) {
//             console.log(res);
//             return res.json();
//           } else {
//             throw new Error("Errore getting the datas");
//           }
//         })
//         .then((dataAlbum) => {
//           console.log(dataAlbum);
//           const sectionDiv = document.createElement("div");

//           sectionDiv.className =
//             "d-none , d-sm-flex , col-12 col-lg-3 , card col-xl-3 , col-xxl-2 , mx-0 bg-transparent , border-0";

//           sectionDiv.innerHTML = `<img class="card-img" src="${dates[j].album.cover_medium}" alt="" />

//           <div class="card-body p-0 text-center">
//             <h4 class="h4 text-light fs-7 sezione">${dataAlbum.title}</h4>
//             <p class="h6 text-light fs-8">${dataAlbum.release_date} - Album</p>
//           </div>`;
//           sectionPopular.appendChild(sectionDiv);

//           const imgRel = document.createElement("img");
//           imgRel.className = "px-2 w-40";

//           imgRel.setAttribute("src", dates[j].album.cover_medium);
//           imgRel.setAttribute("alt", "img");
//           console.log(imgRel);
//           divSmall.appendChild(imgRel);
//           // return dataAlbum.genres;
//           fetch(
//             `https://striveschool-api.herokuapp.com/api/deezer/search?q=${dataAlbum.genres.data[0].name}`
//           )
//             .then((res) => {
//               if (res.ok) {
//                 return res.json();
//               }
//             })
//             .then((genyes) => {
//               console.log(genyes);
//             });
//         })

//         .catch((erro) => {
//           console.log("ciao", erro);
//         })
//         .catch((erros) => {
//           console.log("ciao", erros);
//         });
//     }
//   });
