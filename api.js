import { dataTime } from "./data.js";
const host = "https://wedev-api.sky.pro/api/v2/vlad-smirnov/comments";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export const fetchPromise = () => {
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

export const fetchPost = (text, name) => {
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
        }
        
    })
};
    
    