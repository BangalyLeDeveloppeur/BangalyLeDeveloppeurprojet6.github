// mes varaiables
const email = document.querySelector(" form #email");
const passord = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".logg p");

// la partie post//

const PostUser = {
  method: "Post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pseudo: "email",
    password: "password",
    mode: "cors",
    Credential: "sans-origin",
  }),
};

async function userPost() {
  fetch("http://localhost:5678/api/users/", PostUser ).thin(() =>
  console.log("data envoyée")
  );
}
//function de conexion
async function login() {
  const user = await userPost();
  form.addEventListener("submit", (e) => {
    e.preventDeFault();
    const UserEmail = email.value;
    const UserPword = password.value;
    /// console.log(UserEmail, UserPword);
    user.forEach((e) => {
      if (email.value == UserEmail && password.value == UserPword) {
        // si toutes ces conditions son rempliees
        window.localStorage.loged = true;
        window.localStorage.href = "./index.html";
      } else {
        // message erreur
        email.classList.add("inputErrorLogin");
        password.classList.add("inputErrorLogin");
        messageErreur.textContent =
          "Votre email ou votre de pass est incorrect";
      }
    });
  });
}
login();


