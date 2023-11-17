import dataJson from "./response.json" assert { type: "json" };
console.log(dataJson.photos[0].photographer); //Peng Louis
console.log(dataJson.photos[0].src.small);

const displayCard = document.getElementById("container");
displayCard.innerHTML = "";

const modalHtml = `
  <div class="modal">
    <span class="close">&times;</span>
    <img class="modal-content" id="img01" style="background-color: transparent; border-color: transparent">
    <div id="caption"></div>
  </div>
`;
displayCard.insertAdjacentHTML("beforeend", modalHtml);
// displayCard.insertAdjacentHTML("beforeend", html);
// function searchImages() {
if (Array.isArray(dataJson.photos)) {
  dataJson.photos.forEach((photo) => {
    const likeImage = photo.liked ? "/img/Love.png" : "/img/Love_Heart.png";
    const html = `
    <div class="card" style = "height:550px">
      <img class="card-img-top" id="image" src="${photo.src.original}" alt="${photo.alt}" />

          <button class="heart"    style="padding-right: 260px">

      <img src="${likeImage}" style="left: -170px; width: 40px; height: 40px;" />
      </button>
      <div class="card-body" style=" width: 65%;
      text-align: left;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif">   </div>
      <div>
        <h4 class="card-title" >${photo.photographer}</h4></div>
       <div> <p class="card-text" >
          <span>Description:</span> ${photo.alt}
        </p></div>

    </div>
  `;

    displayCard.insertAdjacentHTML("beforeend", html);
  });
  const images = document.querySelectorAll("#image");
  const modal = document.querySelector(".modal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeModalBtn = document.querySelector(".close");

  images.forEach((image) => {
    image.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  });

  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };
} else {
  console.error("dataJson.photos is not an array.");
}

//   let searchBox = document.getElementById("searchInput");
//   let searchBtn = document.getElementById("searchButton");
//   searchBtn.addEventListener("click", () => {
//     const searchTerm = searchBox.value.trim().toLowerCase();

//     if (searchTerm !== "") {
//       const filteredImages = dataJson.photos.filter((photo) =>
//         photo.photographer.toLowerCase().includes(searchTerm)
//       );

//       searchImages(filteredImages);
//       console.log("genta");
//     } else {
//       displayCard.innerHTML = "";
//       searchImages(dataJson.photos);
//     }
//   });
// }
// searchImages(dataJson.photos);
// script.js

/*
// Path to your JSON file
const jsonFilePath = "response.json";

// Fetch the JSON file
fetch(jsonFilePath)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Process the JSON data
    console.log(data);

    // Example: Accessing properties
    const image = jsonFilePath.photos.src.original;
    const photographer = jsonFilePath.photos.photographer;
    const description = jsonFilePath.photos.description;

    console.log(
      `Image: ${image}, photographer: ${photographer}, description: ${description}`
    );
  })
  .catch((error) => {
    console.error("Error reading JSON file:", error);
  });
*/
