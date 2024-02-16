// mes varaiables
const email = document.querySelector(" form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".logg p");
console.log(messageErreur);

// la partie post//
const PostUser = (userinfo) => ({
  method: "POST",
  headers: {
    "Content-Type":"application/json",
  },
  body: JSON.stringify(userinfo),
});

async function userPost(user) {
  fetch("http://localhost:5678/api/users/login/", PostUser(user)).then((data) =>
    console.log("data envoyée")
  );
}

//function de conexion ///
async function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const UserEmail = email.value;
    const UserPword = password.value;
    const users = await userPost({ email: UserEmail, password: UserPword });
    console.log(UserEmail, UserPword);
    users.forEach((e) => {
      // la verification des conditions //
      if (UserEmail == email.value && UserPword == password.value) {
        // si toutes ces conditions son rempliees
        window.sessionStorage.loged = true;
        window.location.href = "../index.html";
      } else{
        //// message erreur /////
        email.classList.add("inputErrorLogin");
        password.classList.add("inputErrorLogin");
        messageErreur.textContent =
          "Votre email ou votre mot de passe est incorrect !";
      }
    });
  });
}
login();
