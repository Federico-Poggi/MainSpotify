// bisogna salvare in Local Storage il valore della query
// e poi estrapolarlo e inserirlo come valore nella funzione
const sectionPopular = document.getElementById("contentpopular");
const btnBar = document.getElementById("search");
const query = localStorage.getItem("query");
const artistSection = document.getElementById("section");

const searchName = query;
console.log(query);

// const searchWrap = document.getElementById("search");

// cosi ho ottenuto un htmlCollection
fetch(
  `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchName}`
)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error", err);
    }
  })

  .then((content) => {
    console.log(content);
    artistSection.innerHTML = ``;
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      console.log(content);

      counter = setInterval(() => {
        counter++;
      }, 1000);

      let time = content.data[i].duration;
      const toMinute = () => {
        let milliseconds = Math.ceil(time * 1000);
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

      const art = document.createElement("li");
      art.className =
        "list-group, d-flex , align-items-center , bg-transparent , border-0 , text-white , mt-3 , px-0 ";
      art.innerHTML = `<div class='d-flex align-items-center'>
          <h5 class="px-3 text-light">${counter}-</h5>

          <img  src="${content.data[i].album.cover_small}" alt="img"/>
        </div>

        <p class='px-2 title m-0 text-light w-20'>${
          content.data[i].title_short
        }</p>

        <span class='px-2 m-0 text-light w-20'>${content.data[i].rank}</span>

        <p class='px-2 duration text-light'>${toMinute(time)}</p>`;
      artistSection.appendChild(art);
    }
    return content.data;
  })

  .then((dates) => {
    // const addressBarContent = new URLSearchParams(location.search);
    // const myAlbum = addressBarContent.get(`album`);

    const addressBarContent = new URLSearchParams(location.search);
    const myAlbum = addressBarContent.get(`album`);
    console.log();
    for (let j = 0; j < 7; j++) {
      fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${dates[j].album.id}`
      )
        .then((res) => {
          if (res.ok) {
            console.log(res);
            return res.json();
          } else {
            throw new Error("Errore getting the datas");
          }
        })
        .then((dataAlbum) => {
          console.log(dataAlbum);
          const sectionDiv = document.createElement("div");
          sectionDiv.className = "card , mx-0 bg-transparent , border-0 , w-10";
          sectionDiv.innerHTML = `<img class="card-img" src="${dates[j].album.cover_medium}" alt="" />
    
          <div class="card-body p-0 text-center">
            <h4 class="h4 text-light fs-7">${dataAlbum.title}</h4>
            <p class="h6 text-light fs-8">${dataAlbum.release_date} - Album</p>
          </div>`;

          sectionPopular.appendChild(sectionDiv);
        })

        .catch((err) => {
          console.log("error", err);
        });
    }
  })

  .catch((err) => {
    console.log("error", err);
  });
