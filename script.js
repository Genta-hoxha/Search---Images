const api = {
  url: "https://api.pexels.com/v1/search?query=nature&size=medium",
  key: "563492ad6f9170000100000172e40c73ea194f8589f3de8585118b13",
};

function displayImage(apiUrl) {
  const displayCard = document.getElementById("container");
  displayCard.innerHTML = "";
  // Display skeleton loading effect
  for (let i = 0; i < 10; i++) {
    const skeletonHtml = `
     <a class="card" target="_blank" >
   <div class="card__body">
   <img class="skeleton" alt="" id="cover-img" />
      <h4 class="card-title">

      </div>
    </div>

    <div class="card__footer" id="card-footer">
      <div class="skeleton skeleton-footer skeleton-footer"></div>
    </div>

    <div class="card__text" id="card-footer">
    <div class="skeleton skeleton-text"></div>
  </div>
  </a>
  `;

    displayCard.innerHTML += skeletonHtml;
  }
  fetch(apiUrl, {
    headers: {
      Authorization: api.key,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Image not found 😏");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // Remove skeleton
      displayCard.innerHTML = "";

      const modalHtml = `
        <div class="modal">
          <span class="close">&times;</span>
          <img class="modal-content" id="img01" style="background-color: transparent; border-color: transparent" >
          <div id="caption"></div>
        </div>
      `;
      displayCard.insertAdjacentHTML("beforeend", modalHtml);

      if (Array.isArray(data.photos)) {
        data.photos.forEach((photo) => {
          const likeImage = photo.liked
            ? "/img/Love.png"
            : "/img/Love_Heart.png";
          const html = `
                  <div class="card" style="height:550px">
                    <img class="card-img-top" id="image" src="${photo.src.original}" alt="${photo.alt}" />
                    <button class="heart" id="heartlike" src="/img/Love_Heart.png" style="padding-right: 260px">
                      <img src="${likeImage}" style="width: 40px; height: 40px;" />
                      <img id="heartfull" src = "/img/Love.png" hidden>

                   </style>
                    </button>
                    <div class="card-body" style="width: 65%; text-align: left; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">
                      <h4 class="card-title">${photo.photographer}</h4>
                      <p class="card-text">
                        <span>Description:</span> ${photo.alt}
                      </p>
                    </div>
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

        //CLOSE BUTTON
        closeModalBtn.onclick = function () {
          modal.style.display = "none";
        };
        //ESC FUNCTION
        document.addEventListener("keyup", function (event) {
          if (event.key === "Escape") {
            modal.style.display = "none";
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error images:", error.message);
    });
}

const searchBox = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButton");

displayImage(api.url);

searchBtn.addEventListener("click", function () {
  const query = searchBox.value;
  if (query) {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}`;
    displayImage(apiUrl);
  }
});

//FUNKSIONI PER ENTER
searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const query = searchBox.value;
    if (query) {
      const apiUrl = `https://api.pexels.com/v1/search?query=${query}`;
      displayImage(apiUrl);
    }
  }
});
