// bisogna salvare in Local Storage il valore della query
// e poi estrapolarlo e inserirlo come valore nella funzione
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
    for (let i = 0; i < content.data.length; i++) {
      console.log(content);

      const art = (artistSection.innerHTML = `<li
        class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
      >
        <div class='d-flex align-items-center'>
          <h5 class="px-3">1-</h5>

          <img src="${content.data[i].album.cover_small}" alt="img"/>
        </div>

        <div class='px-2'>${content.data[i].title}</div>

        <div></div>

        <div class='px-2'>${content.data[i].duration}</div>
      </li>
      <li
        class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
      >
        <div class='d-flex align-items-center'>
          <h5 class="px-3">2-</h5>

          <img src="${content.data[i + 3].album.cover_small}" alt="img"/>
        </div>

        <div class='px-2'>${content.data[i + 3].title}</div>

        <div></div>

        <div class='px-2'>${content.data[i + 3].duration}</div>
      </li>
      <li
        class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
      >
        <div class='d-flex align-items-center'>
          <h5 class="px-3">3-</h5>

          <img src="${content.data[i + 5].album.cover_small}" alt="img"/>
        </div>

        <div class='px-2'>${content.data[i + 5].title}</div>

        <div></div>

        <div class='px-2'>${content.data[i + 5].duration}</div>
      </li>
      <li
        class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
      >
        <div class='d-flex align-items-center'>
          <h5 class="px-3">4-</h5>

          <img src="${content.data[i + 7].album.cover_small}" alt="img"/>
        </div>

        <div class='px-2'>${content.data[i + 7].title}</div>

        <div></div>

        <div class='px-2'>${content.data[i + 7].duration}</div>
      </li>
      <li
        class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
      >
        <div class='d-flex align-items-center'>
          <h5 class="px-3">5-</h5>

          <img src="${content.data[i + 9].album.cover_small}" alt="img"/>
        </div>

        <div class='px-2'>${content.data[i + 9].title}</div>

        <div></div>

        <div class='px-2'>${content.data[i + 9].duration}</div>
      </li>`);

      // artistSection.appendChild(art);

      const duration = content.data[i].duration;
      const timeConvert = (duration) => {
        let milliseconds = Math.ceil(duration * 1000);
        let minuti = Math.floor(milliseconds / 60000);

        let secondi = Math.floor(milliseconds - minuti * 60000) / 1000;
        if (secondi < 10 && secondi != 0) {
          return minuti + ":" + secondi * 10;
        } else if ((secondi = 0)) {
          return minuti + ":" + secondi * 100;
        } else {
          return minuti + ":" + secondi;
        }
      };
      console.log(timeConvert(200));
    }
  })
  .catch((err) => {
    console.log("error", err);
  });
