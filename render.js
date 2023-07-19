import { listElement, likeFunctions, users, renderTask, token } from "./script.js";
import { fetchPost, fetchPromise, } from "./api.js";
import { renderAuthLink } from "./component/auth-link.js";
import { renderLoginForm, loginFormTemplate } from "./component/login-form.js";



export const getListUsersEdit = (user, index) => {
    return `<li class="comment" data-index="${index}">
              <div class="comment-header">
                <div> ${user.name}</div>
                <div>${user.date}</div>
              </div>
              <div class="comment-body">    
                <div class="comment-text">
                  ${user.comments}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${user.like}</span>
                  <button class="like-button ${user.active}" data-index = ${index}></button>
                </div>
            </li>`
    }

const addNewForm = (element) => {
  return ` 
    <ul class="comments" id="list">
    ${element}
  </ul>
  
  <div class="box-load-new">
    <p class="text-load-new">Комментарий загружается ...</p>
  </div>
  
  <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя" 
      id="name-input"
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
      id="comment-input"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="addButton">Написать</button>
    </div>
  </div>`
  
};

export const renderUsers = (element, getListUsers, token) => {
  if(!token) {
    element.innerHTML = loginFormTemplate;
    document.getElementById("loginButton").addEventListener("click", () => {
      token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
      renderUsers(listElement, getListUsersEdit, token); console.log(token);
      

    })
    return;
  }
    const usersHtml = users.map((user, index) => getListUsers(user, index)).join(''); 
    
    element.innerHTML = addNewForm(usersHtml); 
    const nameInput = document.getElementById("name-input");
    const commentInput = document.getElementById("comment-input");
    renderTask(nameInput, commentInput, token);
    
    likeFunctions(token);   
         
  
    // Функция ответа на комментарий 
  
    const userElements = document.querySelectorAll(".comment");
    const answerComment = () => {
        for (const userElement of userElements) {
            const index = userElement.dataset.index;
            userElement.addEventListener("click", () => {
                commentInput.value = `> ${users[index].comments}
                ${users[index].name}, `;
                fetchPromise(token);
            })
        }; 
    }; answerComment();  
     
}; 