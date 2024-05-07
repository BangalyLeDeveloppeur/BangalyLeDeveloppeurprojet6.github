//// ciblage des balise sur Dom ///
const gallery = document.querySelector("main");
const filter = document.querySelector(".filter");
const gallerySection = document.querySelector(".gallery");

async function init() {
  const listeWorks = await getworks();
  affichageTravaux(listeWorks);
  resetormWork();
  categoriesButtons();
  filtreCategory();
  displayGallerieModale();
  console.log(listeWorks);
}
async function getworks() {
  const Response = await fetch(`http://localhost:5678/api/works/`);
  return await Response.json();
}

init();

//afficharge des travaux ///
async function affichageTravaux(works) {
  let listeWork = works ? works : await getworks();
  //console.log(works)
  const arrayWorks = await getworks();
  // console.log(arrayWorks)
  gallerySection.innerHTML = "";
  //la boucle forEch a chaque passage dans la base de donées
  listeWork.forEach((works) => {
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

/// recuperation du tableau categorie dans la base //
async function getcategorie() {
  const Reponse = await fetch("http://localhost:5678/api/categories/");
  return await Reponse.json();
}

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
        affichageTravaux(appart);
      }
    });
  });
}

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
    figure.classList.add("gallerieModal");
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

//supprission de l'image sur le site/////////////
function imageSuprimer() {
  const supprimImage = document.querySelectorAll(".fa-trash-can");

  supprimImage.forEach((trash) => {
    const token = localStorage.getItem("authToken");
    trash.addEventListener("click", (e) => {
      e.preventDefault();
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
        })
        .then((data) => {
          console.log("la suppression a marchée voici votre data:", data);
          displayGallerieModale();
          affichageTravaux();
        });
    });
  });
  //return false;
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

console.log(selectGategorie);

//console.log(title)

//console.log(selectGategorie);

//console.log(arrowLeft);
//console.log(AjoutUnePhoto);
arrowLeft.addEventListener("click", (e) => {
  AjoutPhoto.style.display = "none";
});
button.addEventListener("click", (e) => {
  button.style.background = "#1d6154";
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
/// céaction de categorie dans le formulaire submit//
async function formSelectcategories() {
  const affichageCategorieSelect = await getcategorie();
  affichageCategorieSelect.forEach((category) => {
    const figOption = document.createElement("option");
    figOption.textContent = category.name;
    figOption.value = category.id;
    selectGategorie.appendChild(figOption);
  });
}
formSelectcategories();

// sit l'utilisateur est connecté sur la page de connexion //
const loged = window.sessionStorage.loged;
const logout = document.querySelector("header ul .logout");
const  projetSpan= document.querySelector(".portfolio-projet-modifier span");
const  projetModifier= document.querySelector(".portfolio-projet-modifier p");
console.log(projetModifier);
console.log(loged);
if (loged == "true") {
  logout.textContent = "logout";
  projetModifier.style.display = "inline"
  projetSpan.style.display = "inline"
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

// fonction pour vidé le formulaire ajout image///
function resetormWork() {
  title.value = "";
  selectGategorie.value = 0;
  profilePic.src = "./assets/images/picture-svgrepo-com 1.png";
}

//ajoutre l'image dans le works, prémière methode ///
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const addWorks = () => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectGategorie.value);

    console.log(formData);
    fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).catch((error) => console.log(error));

    displayGallerieModale();
    affichageTravaux();
    resetormWork();
  };
  addWorks();
});

//////////////////
