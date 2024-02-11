// mes varaiables
const email = document.querySelector(" form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".logg p");

// la partie post//
const PostUser = (userinfo) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userinfo),
});

async function userPost(user) {
  fetch('http://localhost:5678/api/users/login',PostUser(user)).then(() =>
   console.log('data envoyée')
  )
 }
//function de conexion
async function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const UserEmail = email.value;
    const UserPword = password.value;
    /// console.log(UserEmail, UserPword);
    const user = await userPost({ email: UserEmail, password: UserPword })
     console.log(UserEmail, UserPword);
    user.forEach((e) => {
      if (email.value == UserEmail && password.value == UserPword) {
        // si toutes ces conditions son rempliees
        window.localStorage.loged = true;
        window.localStorage.href = "/index.html";
      } else {
        // message erreur
        email.classList.add("inputErrorLogin");
        password.classList.add("inputErrorLogin");
        messageErreur.textContent ="Votre email ou votre de pass est incorrect";
      }
    });
  });
}
login();



