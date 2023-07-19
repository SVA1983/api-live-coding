export const loginFormTemplate = 
    `<div class="add-form form-authorization">
        <input
          type="text"
          class="add-form-name login-authorization"
          placeholder="Введите логин" 
          id="login-input"
        />
        <textarea
          type="textarea"
          class="add-form-text password-authorization"
          placeholder="Введите пароль"
          
          id="password-input"
        ></textarea>
        <div class="add-form-row add-authorization">
          <button class="add-form-button button-authorization" id="loginButton">Войти</button>
        </div>
      </div>`;

export const renderLoginForm =  (rootElement) => {
    rootElement.innerHTML = loginFormTemplate; 
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", () => {
        console.log("1");
    })

}