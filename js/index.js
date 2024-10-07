const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
  const categoryButtons = document.getElementById("category-button");
  categories.forEach((items) => {
    const button = document.createElement("div");
    button.innerHTML = `
    <button onclick="loadPetsByCategory('${items.category}')" id="${items.category}" class="btn category-btn w-full text-2xl font-bold h-24 border-primary2 bg-white hover:bg-primary2"><img class="pr-2" src=${items.category_icon}/>${items.category}</button>
    `;
    categoryButtons.appendChild(button);
  });
};

const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets));
};

const displayPets = (pets) => {
  const petContainer = document.getElementById("pets-container");
  petContainer.innerHTML = "";
  if (pets.length == 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
    <div class="bg-gray-100 rounded-3xl p-24">
      <img class="w-64 mx-auto" src="./images/error.webp"/>
      <h1 class="text-center font-bold text-3xl">No Information Available</h1>
      <p class="text-center text-dark2 mt-3">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at <br />
            its layout. The point of using Lorem Ipsum is that it has a.
      </p>
    </div>
    `;
  } else {
    petContainer.classList.add("grid");
  }
  pets.forEach((items) => {
    const petCard = document.createElement("div");
    petCard.innerHTML = `
    <div class="card card-compact border">
      <figure class="px-4 pt-4">
        <img
          class="rounded-lg w-full h-56"
          src=${items.image}
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title font-bold text-xl">${items.pet_name}</h2>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-list"></i>
          <p>Breed: ${items.breed}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-calendar-week"></i>
          <p>Birth: ${items.date_of_birth}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-mercury"></i>
          <p>Gender: ${items.gender}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-dollar-sign"></i>
          <p>Price: ${items.price}$</p>
        </div>
        <hr class="my-4" />
        <div class="grid grid-cols-4 gap-5">
          <button onclick="loadPetsById(${items.petId})" class="btn text-lg text-dark2 bg-white border-primary2 hover:border-primary hover:bg-white">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <div class="col-span-3 grid grid-cols-2 gap-5">
            <button
              class="btn font-bold text-primary text-lg bg-white border-primary2 hover:text-white hover:bg-primary"
            >
              Adopt
            </button>
            <button
              class="btn font-bold text-primary text-lg bg-white border-primary2 hover:bg-primary hover:text-white"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    petContainer.appendChild(petCard);
  });
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("btn-active");
  }
};

const loadPetsByCategory = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const button = document.getElementById(category);
      button.classList.add("btn-active");
      displayPets(data.data);
    });
};

const loadPetsById = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => displayPetImage(data.petData.image));
};

const displayPetImage = (image) => {
  const imageContainer = document.getElementById("image-container");
  const img = document.createElement("div");
  img.innerHTML = `
    <img class="rounded-lg h-36 w-full" object-cover" src=${image}/>
  `;
  imageContainer.appendChild(img);
};

loadCategories();
loadPets();
