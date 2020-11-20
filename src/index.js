let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toy => renderAllToys(toy))
}

fetchToys()

function renderAllToys(toyArray){
  toyArray.forEach(renderToy)
}

const divCollection = document.querySelector("#toy-collection")

function renderToy(toy){
  const divCard = document.createElement("div")
  divCard.className = "card"
  divCard.dataset.id = toy.id
  divCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button>
  `
  divCollection.append(divCard)
}


// ADD A NEW TOY

const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", function(event){
  event.preventDefault()
  const name = event.target.name.value
  const image =  event.target.image.value
  // const likes = event.target.likes.value

  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': "application/json",
  },
  body: JSON.stringify({
    "name": name,
    "image": image,
    "likes": 0
  }) 
})
  .then(response => response.json())
  .then(data => {
    renderToy(data)
  })
})

// Add Likes


divCollection.addEventListener("click", function(event){

if (event.target.className === "like-btn"){
  const likes = event.target.closest(".card")
  const pLikes = likes.querySelector("p")
  const totalLikes = parseInt(pLikes.textContent) + 1
  pLikes.textContent = totalLikes
  const id = likes.dataset.id
  
  return fetch(`http://localhost:3000/toys/${likes.dataset.id}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },  
    body: JSON.stringify({
      "likes": totalLikes,
      "id": id
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
}
})
