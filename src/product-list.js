const list = () => {
  if (window.location.pathname === "/") {
    const todoList = document.getElementById("toDo");
    const btnAdd = document.getElementById("btn_basket");
    const inputBasket = document.getElementById("basket_input");

    const ul = document.createElement("ul");
    ul.classList.add("ulList");
    todoList.append(ul);

    const addArr = [];

    const removeItem = (index) => {
      console.log(addArr);
      addArr.splice(index, 1);
      FuncTransform();
    };

    const FuncTransform = () => {
      ul.innerHTML = null;

      addArr.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list");
        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btnRemove");

        btnRemove.addEventListener("click", () => removeItem(index));
        li.innerHTML = item;
        li.append(btnRemove);
        ul.append(li);

        li.onclick = () => {
          const clickLi = li.getAttribute("clicked");

          if (!clickLi) {
            li.setAttribute("clicked", true);
            li.classList.add("clicked_Li");
          } else {
            li.removeAttribute("clicked");
            li.classList.remove("clicked_Li");
          }
        };
      });
    };

    btnAdd.addEventListener("click", () => {
      addArr.push(inputBasket.value);
      inputBasket.value = "";

      FuncTransform();
    });
  }
};

list();
