import { showNickname } from "./api/api-handlers.js";

export const renderNickname = () => {
  const userList = document.getElementById("userList");

  showNickname().then((result) => {
    const transformArr = Object.keys(result).map((key) => ({
      ...result[key],
      id: key,
    }));
    if (window.location.pathname === "/") {
      transformArr.forEach((users) => {
        if (users.nickname) {
          userList.innerText = `Welcome ${users.nickname}`;
        }
      });
    }
  });
};
