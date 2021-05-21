import { authURL, API_CONFIG, baseURL } from "./api-config.js";
import firebase from "firebase/app";
import { getToken, setToken } from "./api-ls.js";


export const signIn = (email, password) => {
  return fetch(authURL, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "aplication/json",
    },
  }).then((response) => response.json());
};

export const initApi = async () => {
  firebase.initializeApp(API_CONFIG);
};

export const createUser = async (
  email,
  password,
  nickname,
  birthday,
  gender
) => {
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  await fetch(`${baseURL}/users.json`, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ email, nickname, birthday, gender }),
  })
    .then((response) => response.json());

    await signIn(email, password)
    .then( ({idToken}) => {
      if (idToken) {
        setToken(idToken);
        window.location.href = '/';
      } else alert('Неверно введены данные...')
    })
};

export const showNickname = () => {
  return fetch(`${baseURL}/users.json`, {
    method: 'GET',
    headers: {
      "Content-Type": "aplication/json"
    },
  }).then((response) => response.json());
}

