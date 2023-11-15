import dataJson from "./response.json" assert { type: "json" };
console.log(dataJson.photos[0].photographer); //Peng Louis
console.log(dataJson.photos[0].src.small);
/*
function checkData() {
  const jsonData = "response.json";
  let data =
    // Fetch the JSON file

    console.log(data);

  // Example: Accessing properties
  const photographer = data.photographer;
  const liked = data.liked;
  const description = data.alt;

  console.log(
    `Name: ${photographer}, Liked: ${liked}, Description: ${description}`
  );

  const html = `
      <div id="checkImages"> 
        <div class="card">
        <img class="card-img-top" ${src.original} alt="Card image" />
        <button class="heart" ><img src="/img/Love_Heart.png" style = "
            left: -170px;
               width: 40px;
               height: 40px;"
               >
           </button>
          
        <div class="card-body">
          <h4 class="card-title">John Doe</h4>
          <p class="card-text">
            John Doe is an architect and
            engineer
          </p>
        </div>
        </div>
`;

  const image = document.getElementById("checkImages");
  image.innerHTML = html;
}
*/

// const html = `
// <div id="checkImages">
//   <div class="card">
//   <img class="card-img-top" src = ${dataJson.photos[1].src.original} alt="cat"/>
//   <button class="heart" ><img src="/img/Love_Heart.png" style = "
//       left: -170px;
//          width: 40px;
//          height: 40px;"

//      </button>
//      <div class="card-body">
//     <h4 class="card-title">${dataJson.photos[1].photographer}</h4>
//     <p class="card-text">
//    <span>Description:</span> ${dataJson.photos[1].alt}
//     </p>
//   </div>
//   </div>
// `;

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

    // Append the HTML to the container
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

// let modal = document.getElementById("myModal");
// let img = document.getElementById("image");
// let modalImg = document.getElementById("img01");
// let captionText = document.getElementById("caption");
// img.onclick = function () {
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
// };
// let span = document.getElementsByClassName("close")[0];
// span.onclick = function () {
//   modal.style.display = "none";
// };
