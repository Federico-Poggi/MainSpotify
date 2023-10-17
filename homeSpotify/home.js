let s1 = "rock";
let s2 = "pop";
let s3 = "rap";
const checkApi = (genre) => {
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
              <a href="../artistPage/artist.html?artist=${detail.data[i].id}" class="fs-5 link-underline link-underline-opacity-0 card-title">${detail.data[i].artist.name}</a>
              <a href="../albumPage/album.html?album=${detail.data[i].id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].album.title}</a>

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
checkApi(s1);
checkApi(s2);
checkApi(s3);
