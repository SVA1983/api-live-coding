import { listElement, likeFunctions, users, commentInput, } from "./script.js";
import { getListUsersEdit } from "./data.js";



export const renderUsers = (element, getListUsers) => {
    const usersHtml = users.map((user, index) => getListUsers(user, index)).join(''); 
    element.innerHTML = usersHtml; 
    likeFunctions();   
         
  
    // Функция ответа на комментарий 
  
    const userElements = document.querySelectorAll(".comment");
    const answerComment = () => {
        for (const userElement of userElements) {
            const index = userElement.dataset.index;
            userElement.addEventListener("click", () => {
                commentInput.value = `> ${users[index].comments}
                ${users[index].name}, `;
                renderUsers(listElement, getListUsersEdit); 
            })
        }; 
    }; answerComment();   
}; 