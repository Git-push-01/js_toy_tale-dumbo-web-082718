document.addEventListener("DOMContentLoaded", () => {
  const toyURL = "http://localhost:3000/toys";

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const allToys = document.querySelector("#toy-collection");
  const toyName = document.querySelector("#toy-name");
  const toyImage = document.querySelector("#toy-image");

  let addToy = false;

  fetchToys();

  function fetchToys() {
    fetch(toyURL)
      .then(res => res.json())
      .then(toys => toys.forEach(addToysToPage));
  }

  function addToysToPage(toy) {
    const newDiv = document.createElement("div");
    let toyLikes = toy.likes;
    let toyId = toy.id;

    newDiv.className = "card";
    newDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src= "${toy.image}" class="toy-avatar">
  <p id= "toy-likes">${toyLikes} Likes<p>
  <button class="like-btn">Like <3</button>`;
    allToys.append(newDiv);
    const likeButton = newDiv.querySelector(".like-btn");
    const likeDiv = newDiv.querySelector("#toy-likes");

    likeButton.addEventListener("click", addLikes);

    function addLikes() {

      let newLike = toyLikes + 1;
      toyLikes = newLike;
      likeDiv.innerText = `${toyLikes} Likes`;
      fetch(`${toyURL}/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          likes: toyLikes
        })
      });
    }
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      // submit listener here
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", addToys);

  function addToys(event) {
    event.preventDefault();
    let name = toyName.value;
    let image = toyImage.value;
    let likes = 0;
    let data = {
      name: name,
      image: image,
      likes: likes
    };
    fetch(toyURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(addToysToPage);
  }
});
