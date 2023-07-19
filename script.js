
import { fetchPromise, fetchPost, } from "./api.js";
import { getListUsersEdit } from "./render.js";
import { renderUsers } from "./render.js";

   

export const listElement = document.querySelector(".container");
export const nameInput = document.getElementById("name-input");
export const commentInput = document.getElementById("comment-input");
export const replyComment = document.querySelectorAll(".comment");
export const textName = document.querySelectorAll(".add-form-name");
export const textComment = document.querySelectorAll(".add-form-text");
export const comBox = document.querySelector(".box-load");
export const comBoxNew = document.querySelector(".box-load-new");
export let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;


// массив с данными существующих пользователей

export let users = [];
   

// функция для показа коментария во время запроса с API

const activLoad = () => {
  return comBox.classList.add("box-load-active");
}; activLoad();
    
  

// Делаем запрос на API

fetchPromise(renderUsers(listElement, getListUsersEdit, token))
.then((data) => {
  comBox.classList.remove("box-load-active");
  users = data;
  renderUsers(listElement, getListUsersEdit, token);
})
.catch((error) => { console.log(error);
  alert("Что то пошло не так, повторите позже") ;
});
    
       
     
    
// Добавление лайков
export const likeFunctions = (token) => {
  const likeElements = document.querySelectorAll(".like-button");
  for (const likeElement of likeElements) {
    const index = likeElement.dataset.index;
    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      if(!users[index].isLiked) {
        users[index].isLiked = true;
        users[index].active = "-active-like";
        users[index].like += 1
      } 
      else {
        users[index].isLiked = false;
        users[index].active = "";
        users[index].like -= 1
      } 
      renderUsers(listElement, getListUsersEdit, token);
      
    })
  };
}; 
    

export const renderTask = (nameInput, commentInput, token) => {  
// Привязываем обработчик на кнопку добавить
const buttonElement = document.getElementById("addButton");
const addForm = document.querySelector(".add-form");
    buttonElement.addEventListener("click", () => {
  nameInput.classList.remove("error");
  commentInput.classList.remove("error");
  if (nameInput.value === "") {
    nameInput.classList.add("error"); return
  } 
  else if (commentInput.value === "") {
    commentInput.classList.add("error"); return
  }; 
  buttonElement.disabled = true;    
  comBoxNew.classList.add("box-load-new-active");
  addForm.classList = "box-load";
  fetchPost(commentInput.value, nameInput.value, token)
  .then((response) => {
    comBoxNew.classList.remove("box-load-new-active"); 
    if (response.status === 201) {
      return fetchPromise(token);
    }
    else if (response.status === 400 && nameInput.value.length < 3) {
      throw new Error(400);
    }
    else if (response.status === 400 && commentInput.value.length < 3) {
      throw new Error(401);
    }
    else if (response.status === 500) {
      throw new Error(500);
    }
    else {
      throw new Error()
    } 
  })
  .then((response) => {
    users = response;
    comBoxNew.classList.remove("box-load-new-active");
    addForm.classList = "add-form";
    buttonElement.disabled = false;
    nameInput.value = "";
    commentInput.value = "";
    renderUsers(listElement, getListUsersEdit, token);
  })
  .catch((error) => { 
    if(error.message == 400) { 
      nameInput.classList.add("error");
      setTimeout(() => {
        return nameInput.classList.remove("error") 
      }, 3000); 
      alert("Имя и комментарий не должны быть короче 3х символов"); 
    }
    else if (error.message == 401) {
      commentInput.classList.add("error");
      setTimeout(() => {
        return commentInput.classList.remove("error") 
      }, 3000);
      alert("Имя и комментарий не должны быть короче 3х символов");
    }
    else if (error.message == 500) {
      alert("Проблемы с сервером, повторите позже")
      buttonElement.disabled = false;
    }
    else {
      comBoxNew.classList.remove("box-load-new-active"); 
      alert("Что то пошло не так, повторите позже")
    };
    addForm.classList = "add-form";
    buttonElement.disabled = false;
  }); 
}); 
}; 

    
   
"use strict";  
console.log("It works!");