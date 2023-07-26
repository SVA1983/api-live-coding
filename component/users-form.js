// Рендер комментариев
import { format } from "date-fns";

export const getListUsersEdit = (user, index, token ) => {
  // const createDate = format(new Date(task.created_at), 'dd/MM/yyyy hh:mm');
    return `<li class="comment" data-index="${index}">
              <div class="comment-header">
                <div> ${user.name}</div>
                <div>${user.date} </div>
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
                <div class="del-comment">${token  ? `<button class="del" data-id = ${user.id}>Удалить</button>` : ""}
                 
                  
                </div>
            </li>`
    }   