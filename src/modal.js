require("firebase/auth");
import { baseURL } from "./api/api-config";
import { signIn, initApi, createUser, nick } from "./api/api-handlers";
import { getToken, setToken, delToken } from "./api/api-ls.js";
import { renderNickname } from './mainPage-nickname.js';

window.onload = () => {
  initApi();
  renderNickname();
  if (window.location.pathname === "/" && !getToken()) {
    window.location.href = "./sign-in.html";
  }

  if (window.location.pathname === "/sign-in.html") {
    const form = document.getElementById("form_1");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("pass").value;
      signIn(email, password).then(({ idToken }) => {
        if (idToken) {
          setToken(idToken);
          window.location.href = "/";
        } else alert("Проверьте правильность ввода email или password!!!");
      });
    });
  }

  if (window.location.pathname === "/sign-up.html") {
    const form = document.getElementById("form_2");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email_1").value;
      const password = document.getElementById("pass_1").value;
      const nickname = document.getElementById("nickname").value;
      const birthday = document.getElementById("birthday").value;
      const male = document.getElementById("Male");
      const gender = male.checked ? "male" : "female";

      createUser(email, password, nickname, birthday, gender);
    });
  }

  if (getToken() && window.location.pathname === "/") {
    const form = document.getElementById("form_3");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      delToken();
      window.location.href = "/sign-in.html";
    });
  }
};

