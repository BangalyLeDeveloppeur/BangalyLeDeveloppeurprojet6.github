//// recuperation dans api ///
const gallery = document.querySelector("main");
const filter = document.querySelector(".filter");
const gallerySection = document.querySelector(".gallery");

async function getworks() {
  const Response = await fetch(`http://localhost:5678/api/works/`);
  return await Response.json();
}
getworks();

//afficharge des travaux ///
async function affichageTravaux(element) {
  const arrayWorks = await getworks();
  arrayWorks.forEach((works) => {
    //la boucle forEch a chaque passage dans la base de donées
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = works.imageUrl;
    figcaption.textContent = works.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallerySection.appendChild(figure);
  });
}
affichageTravaux();

/// recuperation du tableau categorie dans la base //
async function getcategorie() {
  const Reponse = await fetch("http://localhost:5678/api/categories/");
  return await Reponse.json();
}
getcategorie();

async function categoriesButtons() {
  const categorys = await getcategorie();
  // console.log(categorys);
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    filter.appendChild(btn);
  });
}
categoriesButtons();

///affichage de filtre des contenus par categorie//
async function filtreCategory() {
  const appart = await getworks();
  console.log(appart);
  const buttons = document.querySelectorAll(".filter button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      gallerySection.innerHTML = "";
      btnId = e.target.id;
      if (btnId != "0") {
        const filtreParCategory = appart.filter((category) => {
          return category.categoryId == btnId;
        });
        filtreParCategory.forEach((category) => {
          affichageTravaux(category);
        });
      }
      console.log(btnId);
    });
  });
}
filtreCategory();

//modale  sur modifier///
const modifier = document.querySelector(".portfolio-projet-modifier p");
const containerModal = document.querySelector(".containerModal");
const xmark = document.querySelector(".containerModal .fa-xmark");
const galleriesModal = document.querySelector(".galleriesModal");

modifier.addEventListener("click", (e) => {
  containerModal.style.display = "inline";
});
xmark.addEventListener("click", (e) => {
  containerModal.style.display = "none";
});
containerModal.addEventListener("click", (e) => {
  if (e.target.className == "containerModal") {
    containerModal.style.display = "none";
  }
});

//afficharge image de la galerie
async function displayGallerie() {
  galleriesModal.innerHTML = "";
  const galerieTableaux = await getworks();
  galerieTableaux.forEach((element) => {

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    figure.classList.add("galleriesModal")
    img.src = element.imageUrl;
    const poubelle = document.createElement("i");
    poubelle.classList.add("fa-solid", "fa-trash-can");
    poubelle.id = element.id
    span.appendChild(poubelle);
    figure.appendChild(span);
    figure.appendChild(img);
    galleriesModal.appendChild (figure);

  });
  // console.log(galerieTableaux);
}
displayGallerie();

////4444

//const gallerySection = document.querySelector(".gallery");
//const categorySection = document.querySelector(".category");

//const getWork = async (category) => {
//const response = await fetch("http://localhost:5678/api/works");
//const data = await response.json();
//console.log(category);
//if (!category || category === 0) {
// return data;
//} else {
//return data.filter((element) => element.categoryId === category);
//}
//};

//const getCategory = async () => {
//const response = await fetch("http://localhost:5678/api/categories");
///const data = await response.json();
//return data;
//};

//const afficherlesTravaux = async (works) => {
// gallerySection.innerHTML = "";
//works.forEach((element) => {
// const workDOM = `
//<figure>
//  <img src="${element.imageUrl}" alt="${element.title}" width="150"/>
//   <figcaption>${element.title} ${element.categoryId}<figcaption>
// <figure>
// `;
// // gallerySection.innerHTML += workDOM;
//});
//};

//const filterWork = async (category) => {
// const works = await getWork(category);
// afficherlesTravaux(works);
//};

//categorySection.addEventListener("click", (event) => {
//const element = event.target;
//const button = element.tagName.toLowerCase();
//(button === "button") {
//const idCategory = element.getAttribute("id");
//filterWork(Number.parseInt(idCategory));
//}

//});

//const init = async () => {
//const works = await getWork();
//afficherlesTravaux(works);
//};
//init();
