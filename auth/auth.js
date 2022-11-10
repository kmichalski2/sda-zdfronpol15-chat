import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const initAuth = (auth) => {
  handleSignInForm(auth);
  handleSignUpForm(auth);
  handleSignOut(auth);

  const whitelist = ["/auth/login.html", "/auth/register.html"];

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (!whitelist.includes(location.pathname)) {
        location.href = location.origin + "/auth/login.html";
      }
    }
  });
};

const handleSignOut = (auth) => {
  const buttons = document.querySelectorAll("[data-signout]");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      signOut(auth).then((result) => {
        location.href = location.origin + "/auth/login.html";
      });
    });
  });
};

const handleSignInForm = (auth) => {
  const form = document.querySelector("#signInForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      const formData = new FormData(form);

      signInWithEmailAndPassword(
        auth,
        formData.get("email", formData.get("password"))
      ).then((result) => {
        location.href = location.origin;
      });
    });
  }
};

const handleSignUpForm = (auth) => {
  const form = document.querySelector("#signUpForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      console.log(formData.get("email"));

      createUserWithEmailAndPassword(
        auth,
        formData.get("email"),
        formData.get("password")
      ).then((result) => {
        location.href = location.origin;
      });
    });
  }
};
