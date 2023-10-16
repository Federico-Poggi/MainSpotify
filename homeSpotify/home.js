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
              <div class="card">
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top" alt="${detail.data[i].album.title}">
              <div class="card-body">
              <h5 class="card-title">${detail.data[i].album.title}</h5>
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
checkApi(s1);
checkApi(s2);
checkApi(s3);
