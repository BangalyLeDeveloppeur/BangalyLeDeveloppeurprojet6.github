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

//modale  sur modifier//////////////////////////////////////////////////
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
  //imageSuprimer();
  // console.log(galerieTableaux);
}
//displayGallerieModale();
///// supprission de l'image
//function imageSuprimer() {
 // const supprimImage = document.querySelectorAll(".fa-trash-can");
  //supprimImage.forEach((trash) => {
    ///trash.addEventListener("click", (e) => {
     // const reId = trash.id;
      //console.log(reId)
      //const delet = {
       /// method: "DELETE",
        //Headers: {"Content-Type": "application/json"},
      //}
   //fetch("http://localhost:5678/api/works/" +reId,delet).then((Response) => {
    //if(!Response) {
      //console.log("la suppression n'a pas marchée");
    ///}
       // return Response.json();
      //})
      //.then((data) =>{
       // console.log("la suppression a marchée voici votre data:",data);
        ////displayGallerieModale();
        //init();
     // })
    //});
  //});
//}
