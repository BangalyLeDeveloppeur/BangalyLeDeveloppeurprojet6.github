//// ciblage des balise sur Dom ///
const gallery = document.querySelector("main");
const filter = document.querySelector(".filter");
const gallerySection = document.querySelector(".gallery");

async function init() {
  const listeWorks = await getworks();
  affichageTravaux(listeWorks);
}
async function getworks() {
  const Response = await fetch(`http://localhost:5678/api/works/`);
  return await Response.json();
}

init();

//afficharge des travaux ///
async function affichageTravaux(works) {
  const arrayWorks = await getworks();
  // console.log(arrayWorks)
  gallerySection.innerHTML = "";
  //la boucle forEch a chaque passage dans la base de donées
  works.forEach((works) => {
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

console.log();

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
  //console.log(appart);
  const buttons = document.querySelectorAll(".filter button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.getAttribute("id");
      if (btnId != "0") {
        const filtreParCategory = appart.filter((category) => {
          return category.categoryId == btnId;
        });
        affichageTravaux(filtreParCategory);
      } else {
        init();
      }
    });
  });
}
filtreCategory();

//le code sur la partie modale  sur modifier//////////////////////////////////////////////////
//// ciblage des balise sur Dom ///
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

//afficharge image de la galerie modalev/////
async function displayGallerieModale() {
  galleriesModal.innerHTML = "";
  const galerieTableaux = await getworks();
  galerieTableaux.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    figure.classList.add("galleriesModal");
    img.src = element.imageUrl;
    const poubelle = document.createElement("i");
    poubelle.classList.add("fa-solid", "fa-trash-can");
    poubelle.id = element.id;
    span.appendChild(poubelle);
    figure.appendChild(span);
    figure.appendChild(img);
    galleriesModal.appendChild(figure);
  });
  imageSuprimer();
  //console.log(galerieTableaux);
}
displayGallerieModale();

//supprission de l'image sur le site/////////////
function imageSuprimer() {
  const supprimImage = document.querySelectorAll(".fa-trash-can");

  supprimImage.forEach((trash) => {
    const token = localStorage.getItem("authToken");
    trash.addEventListener("click", (e) => {
      const reId = trash.id;
      //console.log(reId)
      const headerRequest = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      fetch("http://localhost:5678/api/works/" + reId, headerRequest)
        .then((Response) => {
          if (!Response.ok) {
            console.log("la suppression n'a pas marchée");
          }
          return Response.json();
        })
        .then((data) => {
          console.log("la suppression a marchée voici votre data:", data);
          displayGallerieModale();
          init();
        });
    });
  });
}

//le code sur la partie ajout de photo////////////////////////////
const AjoutUnePhoto = document.querySelector(".modalGallerie button");
const AjoutPhoto = document.querySelector(".ajouterphoto");
let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-file");
const xmarkk = document.querySelector(".ajouterphotoflèche .fa-xmark");
const arrowLeft = document.querySelector(".ajouterphotoflèche .fa-arrow-left");
const button = document.querySelector("form button");
const selectGategorie = document.querySelector("form .select");
const title = document.querySelector("form .title-image");
const form = document.querySelector("form");
//console.log(title)

//console.log(selectGategorie);

//console.log(arrowLeft);
//console.log(AjoutUnePhoto);
arrowLeft.addEventListener("click", (e) => {
  AjoutPhoto.style.display = "none";
});
button.addEventListener("click", (e) => {
  button.style.background = "green";
});
AjoutUnePhoto.addEventListener("click", (e) => {
  AjoutPhoto.style.display = "inline";
});
xmarkk.addEventListener("click", (e) => {
  AjoutPhoto.style.display = "none";
});

inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
};

async function formSelectcategories() {
  const affichageCategorieSelect = await getcategorie();
  affichageCategorieSelect.forEach((category) => {
    const figOption = document.createElement("option");
    figOption.textContent = category.name;
    selectGategorie.appendChild(figOption);
  });
}
formSelectcategories();

// la mise en jours du works//
const addWorks = () => {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  formData.append("image", inputFile.files[0]);
  formData.append("title", "titreImg");
  formData.append("category", "titreCategorie");
  const responseWorks = fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  console.log(responseWorks);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titreImg = title.value;
    const titreCategorie = selectGategorie.value;
    console.log(titreImg, titreCategorie);
  });
};
addWorks();
