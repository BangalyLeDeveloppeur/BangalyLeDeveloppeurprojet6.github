// mes varaiables
const email = document.querySelector(" form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".logg p");
const modif = document.querySelector("form button");
console.log(modif);

//console.log(messageErreur);

// la methode post dans Api//
const PostUser = (userinfo) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userinfo),
});

async function userPost(user) {
  const response = await fetch(
    "http://localhost:5678/api/users/login/",
    PostUser(user)
  );
  //console.log(response.ok);
  if (response.ok) {
    return response.json();
  }
}

//function de conexion ///
async function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPassword = password.value;

    const users = await userPost({ email: userEmail, password: userPassword });
    //console.log(users);
    if (users) {
      window.localStorage.setItem("authToken", users.token);
      window.sessionStorage.loged = true;
      window.location.href = "index.html";
    } else {
      //// message erreur /////
      email.classList.add("inputErrorLogin");
      password.classList.add("inputErrorLogin");
      messageErreur.textContent =
        "Votre email ou votre mot de passe est incorrect !";
    }
  });
}

login();

