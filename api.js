import { dataTime } from "./data.js";
import { format } from "date-fns";
import _ from 'lodash';


// документация https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/v2/%5Bkey%5D/comments/README.md

// Адрес Апи

export const host = "https://wedev-api.sky.pro/api/v2/vlad-smirnov/comments";

// Запрос на Апи (загрузка существующих)

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
          date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
          comments: comment.text,
          like: comment.likes,
          isLiked: false,
          active: ""
        };
      });
    });   
}; 


// Запрос на Апи (добавление)

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

// Запрос на Апи (Вход)

export const loginUser = ({login, password}, ) => {
  return fetch( "https://wedev-api.sky.pro/api/user/login",
  {
      method: "POST",
      body: JSON.stringify(
      { 
          login,
          password,
      }),      
  }).then((response) => { 
    if (response.status === 400) { 
      throw new Error("Не верный логин или пароль");  

    } ;
    return response.json(); 
  });
};

// Запрос на Апи (Регистрация)

export const regUser = ({name, login, password}) => {
  return fetch( "https://wedev-api.sky.pro/api/user",
  {
      method: "POST",
      body: JSON.stringify(
      { 
          name,
          login,
          password,
      }),    
  }).then((response) => { 
    if (response.status === 400) {
      throw new Error("Такой пользователь уже есть");  
    }
    return response.json();
  });
};
    