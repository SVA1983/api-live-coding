import {renderLoginForm} from "./login-form.js";

const authLinkTemplate = () => {
    return `<span class = "authorization" > 
        Авторизуйтесь
      </span>`
};
export const renderAuthLink =  (rootElement) => {
    rootElement.innerHTML += authLinkTemplate(); 
    const authorization = document.querySelector(".authorization");
    authorization.addEventListener("click", () => {
        const listElement = document.querySelector(".container");
        renderLoginForm (listElement); 

        console.log("1");
    })

}