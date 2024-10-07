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
    <button class="btn w-full text-2xl font-bold h-24 border-primary2 bg-white hover:bg-primary2"><img class="pr-2" src=${items.category_icon}/>${items.category}</button>
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
  pets.forEach((items) => {
    const petCard = document.createElement("div");
    petCard.innerHTML = `
    <div class="card card-compact border">
      <figure class="px-4 pt-4">
        <img
          class="rounded-lg"
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
          <button class="btn text-lg text-dark2 bg-white border-primary2">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <div class="col-span-3 grid grid-cols-2 gap-5">
            <button
              class="btn font-bold text-primary text-lg bg-white border-primary2"
            >
              Adopt
            </button>
            <button
              class="btn font-bold text-primary text-lg bg-white border-primary2"
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

loadCategories();
loadPets();
