// Форма добавления комментария

export const addNewForm = (element) => {
    return ` 
      <ul class="comments" id="list">
      ${element}
    </ul>
    <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя" 
        id="name-input"
      />
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
        id="comment-input"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="addButton">Написать</button>
      </div>
    </div>`
    
};
  