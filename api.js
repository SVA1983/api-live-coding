import { dataTime } from "./data.js";
import { token, listElement } from "./script.js";
import { renderUsers } from "./render.js";
const host = "https://wedev-api.sky.pro/api/v2/vlad-smirnov/comments";


export const fetchPromise = (token) => {
    return fetch(host,
    {
        method: "GET",
        headers: {
          Authorization: token,
        }
        
    })
    .then((response) => {
      if(response.status == 401) {
        token = prompt("Введите верный пароль");
        fetchPromise();
        throw new Error("Нет авторизации");
      }
    return response.json()
    })
    .then((responseData) => {
      return responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: dataTime(new Date(comment.date)),
          comments: comment.text,
          like: comment.likes,
          isLiked: false,
          active: ""
        };
      });
    });   
}; 

export const fetchPost = (text, name, token) => {
    return fetch(host,
    {
        method: "POST",
        body: JSON.stringify(
        { 
            text: text,
            name: name,
        }),
        headers: {
          Authorization: token,
        },
        
        
    }); 
};
    