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
      for (let i = 0; i < detail.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-6", "col-sm-4");
        newDiv.innerHTML = `  
        <div class="d-flex align-items-center">
        <img src="${detail[i].data.album.cover_medium}" alt="" />
        <div>
          <h2>playlist 1</h2>
          <p>di daidfa</p>
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
const allTheGenre = [s1, s2, s3];
for (let i = 0; i < allTheGenre.length; i++) {
  checkApi(allTheGenre[i]);
}
