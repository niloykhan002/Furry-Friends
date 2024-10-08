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
          <p>${
            items.breed == null || undefined
              ? `Breed: Not Available`
              : `Breed: ${items.breed}`
          }</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-calendar-week"></i>
          <p>${
            items.date_of_birth == null || undefined
              ? `Birth: Not Available`
              : `Birth: ${items.date_of_birth}`
          }</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-mercury"></i>
          <p>${
            items.gender == null || undefined
              ? `Gender: Not Available`
              : `Gender: ${items.gender}`
          }</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-dollar-sign"></i>
          <p>${
            items.price == null || undefined
              ? `Price: Not Available`
              : `Price: ${items.price}$`
          }</p>
        </div>
        <hr class="my-4" />
        <div class="grid grid-cols-4 gap-5">
          <button onclick="loadPetsById(${
            items.petId
          })" class="btn text-lg text-dark2 bg-white border-primary2 hover:border-primary hover:bg-white">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <div class="col-span-3 grid grid-cols-2 gap-5">
            <button
              class="btn font-bold text-primary text-lg bg-white border-primary2 hover:text-white hover:bg-primary"
            >
              Adopt
            </button>
            <button
              onclick="loadDetails(${items.petId})"
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
  const petContainer = document.getElementById("all-pet-container");
  petContainer.classList.add("hidden");
  showSpin();
  removeActiveClass();
  const button = document.getElementById(category);
  button.classList.add("btn-active");
  setTimeout(() => {
    hideSpin();
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        petContainer.classList.remove("hidden");
        displayPets(data.data);
      });
  }, 2000);
};

const loadPetsById = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPetImage(data.petData.image);
    });
};

const displayPetImage = (image) => {
  const imageContainer = document.getElementById("image-container");
  const img = document.createElement("div");
  img.innerHTML = `
    <img class="rounded-lg h-36 w-full" object-cover" src=${image}/>
  `;
  imageContainer.appendChild(img);
};

const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayDetails(data.petData);
    });
};

const displayDetails = (details) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <img class="w-full object-cover rounded-xl" src=${details.image}/>
  <h1 class="font-bold text-2xl text-dar1 mt-4">${details.pet_name}</h1>
  <div class="flex gap-8 my-5">
    <div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-list"></i>
          <p>Breed: ${details.breed}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-mercury"></i>
          <p>Gender: ${details.gender}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-mercury"></i>
          <p>Vaccinated status: ${details.vaccinated_status}</p>
        </div>
    </div>
    <div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-calendar-week"></i>
          <p>Birth: ${details.date_of_birth}</p>
        </div>
        <div class="flex gap-3 items-center text-dark2">
          <i class="fa-solid fa-dollar-sign"></i>
          <p>Price: ${details.price}$</p>
        </div>
    </div>
  </div>
  <div>
    <h2 class="font-semibold text-dark1 mb-4">Details Information</h2>
    <p class="text-dar2">${details.pet_details}</p>
  </div>
  `;
  document.getElementById("my-modal").showModal();
};

const showSpin = () => {
  const spinContainer = document.getElementById("loading-spin");
  spinContainer.classList.remove("hidden");
  spinContainer.innerHTML = `
  <span class="loading loading-bars loading-md"></span>
  `;
};
showSpin();

const hideSpin = () => {
  const spinContainer = document.getElementById("loading-spin");
  spinContainer.classList.add("hidden");
};

setTimeout(hideSpin, 2000);

loadCategories();
setTimeout(loadPets, 2000);
