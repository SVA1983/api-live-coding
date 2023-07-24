import {renderLoginForm} from "./login-form.js";

// Переключение на форму входа/регистрации

export const authLinkTemplate = () => {  
    return `<p>Чтобы добавить комментарий,
    <span class = "authorization" > 
         авторизируйтесь
      </span>
      </p>`
};
export const renderAuthLink =  (rootElement, token) => {
    rootElement.innerHTML += authLinkTemplate(); 
    const authorization = document.querySelector(".authorization");
    authorization.addEventListener("click", () => {
        const listElement = document.querySelector(".container");
        renderLoginForm (listElement, token);       
    })
}