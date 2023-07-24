
import { renderTaskUsers } from "../render.js";
import { listElement } from "../script.js";
import { getListUsersEdit } from "./users-form.js";
import { loginUser, regUser } from "../api.js";
export let isLogin = true;

// Две переменные для передачи имени пользователя в рендер-функцию

export let existingUser = null;
export let newUser = null;


// Форма входа и регистрации

export const loginFormTemplate = () => {
  
  return `<div class="add-form form-authorization">
  <h1 class = "form-enter">Форма ${isLogin ? 'входа' : 'регистрации'}</h1>
  ${isLogin ? '' : `<input
    type="text"
    class="add-form-name login-authorization name-registration" id="name-reg"
    placeholder="Введите имя"
  />`}
  <input
    type="text"
    class="add-form-name login-authorization"
    placeholder="Введите логин" 
    id="login-input"
  />
  <input
    type="password"
    class="add-form-text password-authorization"
    placeholder="Введите пароль"
    
    id="password-input"
  />  
  <div class="add-form-row add-authorization">
    <button class="add-form-button button-authorization" id="loginButton">${isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>
  <div class="add-form-row">
  <button class="add-form-button button-authorization button-enter">Перейти ${isLogin ? 'к регистрации' : 'ко входу'}</button>
  </div>
  </div>`;
}


// Рендер - функция формы входа

   
export const renderLoginForm =  (rootElement, token) => {
    rootElement.innerHTML = loginFormTemplate(); 
    const loginButton = document.querySelector(".button-authorization");
    loginButton.addEventListener("click", () => {
      
      if (isLogin) {
        const login = document.getElementById("login-input");
        const password = document.getElementById("password-input");
        if (!login) {
          alert("Введите правильный логин");
          return
        }
        if (!password) {
          alert("Введите правильный пароль");
          return
        }
       
        // Запрос входа на Апи
        
        loginUser({
          login: login.value,
          password: password.value,
        }).then((user) => { 
          
          token = `Bearer ${user.user.token} `; 
          existingUser = user.user.name;
          renderTaskUsers(listElement, getListUsersEdit, token); 
          
        }).catch(error => {
          // TODO: Вывести алерт красиво
          alert(error.message);
        })
        
      } 
      else {
          
          const login = document.getElementById("login-input");
          const password = document.getElementById("password-input");
          const name = document.getElementById("name-reg");
        if (!name) { 
            alert("Введите правильное имя");
            return
        }  
        if (!login) {
          alert("Введите правильный логин");
          return
        }
        if (!password) {
          alert("Введите правильный пароль");
          return
        }
       
        // Запрос регистрации на Апи
        
        regUser({
          name: name.value,
          login: login.value,
          password: password.value,
        }).then((user) => {
          
          token = `Bearer ${user.user.token} `;
          newUser = user.user.name;

          
          renderTaskUsers(listElement, getListUsersEdit, token); 
          
          
        }).catch(error => {
          // TODO: Вывести алерт красиво
          alert(error.message);
        })
      }; 
    });

    // Переключение на форму регистрации

    document.querySelector(".button-enter").addEventListener('click', () => {  
      isLogin = !isLogin;
      renderLoginForm(listElement)
      });
}