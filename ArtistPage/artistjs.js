// bisogna salvare in Local Storage il valore della query
// e poi estrapolarlo e inserirlo come valore nella funzione
const btnBar = document.getElementById("search");
const query = localStorage.getItem("query");
const artistSection = document.getElementById("section");
// const artistSong = () => {
//   // const searchWrap = document.getElementById("search");

//   // cosi ho ottenuto un htmlCollection
//   fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }

//       console.log(res);
//     })

//     .then((content) => {
//       console.log(content);
//       artistSection.innerText = ``;
//       for (let i = 0; i < content.data.length; i++) {
//         console.log(content.data);

//         artistSection.innerHTML = `<li
//         class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
//       >
//         <div class='d-flex align-items-center'>
//           <h5></h5>

//           <img src="${content.data[i].album.cover_small}" alt="img"/>
//         </div>

//         <div class='px-2'></div>

//         <div></div>

//         <div class='px-2'>4:35</div>
//       </li>`;

//         artistSection.appendChild(art);
//         console.log(artistSection);
//       }
//     })
//     .catch((err) => {
//       console.log("error", err);
//     });
// };
const artistPage = (query) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((content) => {
      for (let i = 0; content[5]; i++) {
        const album = content[i].data;
        console.log(album);
      }
    });
};

// const searchWrap = document.getElementById("search");
// const searchValue = searchWrap.value;
// console.log(artistCard);
// console.log(searchWrap);
// // cosi ho ottenuto un htmlCollection

// fetch(
//   `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchValue}`
// ).then((res) => {
//   if (res.ok) {
//     return res.json();
//   }
// });

// const insetrLi = () => {
//   artistCard.innerHTML = `<li
//   class = 'list-group-item d-flex align-items-center bg-transparent border-0 text-white px-0'
// >
//   <div class='d-flex align-items-center'>
//     <h5>1</h5>

//     <img src='' alt= />
//   </div>

//   <div class='px-2'></div>

//   <div></div>

//   <div class='px-2'>4:35</div>
// </li>`;

//   console.log(artistCard);
// };

// insetrLi();
