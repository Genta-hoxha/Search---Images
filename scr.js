const api = {
  url: "https://api.pexels.com/v1/search?query=cat",
  key: "563492ad6f9170000100000172e40c73ea194f8589f3de8585118b13",
};
function displayImage(apiUrl) {
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

      const displayCard = document.getElementById("container");
      // Clear existing content
      displayCard.innerHTML = "";

      if (Array.isArray(data.photos)) {
        data.photos.forEach((photo) => {
          const likeImage = photo.liked
            ? "/img/Love.png"
            : "/img/Love_Heart.png";

          const html = `
              <div class="card" style="height:550px">
                <img class="card-img-top" id="image" src="${photo.src.original}" alt="${photo.alt}" />
                <button class="heart" id="heartlike" style="padding-right: 260px">
                  <img src="${likeImage}" style="width: 40px; height: 40px;" />
                  <img id="heartfull" src="/img/Love.png" hidden>
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
      }
    })
    .catch((error) => {
      console.error("Error images:", error.message);
    });
}
