import { listElement, likeFunctions, users, addNewComment, commentText} from "./script.js";
import {fetchPromise} from "./api.js";
import { renderAuthLink} from "./component/auth-link.js";
import { addNewForm } from "./component/comment-form.js";
import { existingUser, newUser } from "./component/login-form.js";
import { format } from "./";

// Рендер функция

export const renderTaskUsers = (element, getListUsers, token) => {
  const usersHtml = users.map((user, index) => getListUsers(user, index, token)).join(''); 
  

  if(!token) { 
    element.innerHTML = usersHtml;
    
    renderAuthLink(listElement, token);
    
    return;
  };

    element.innerHTML = addNewForm(usersHtml); 

    const nameInput = document.getElementById("name-input");
    const commentInput = document.getElementById("comment-input");  
    
    addNewComment(nameInput, commentInput, token);
    commentInput.value = commentText; 
    likeFunctions(token, commentInput); 
    commentInput.value = commentText; 
    

    nameInput.disabled = true;
    if (existingUser != null)
    nameInput.value = existingUser;
    else{nameInput.value = newUser;}
    
   
  
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