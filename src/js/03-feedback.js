import localStorageAPI from './localstorage';
import throttle from 'lodash.throttle';
// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів 
// у локальне сховище, коли користувач щось друкує.

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, 
// у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. 
// В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми,
// а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. 
// Для цього додай до проекту і використовуй бібліотеку lodash.throttle.




const formInput = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
const user = {};

const fillContactFormFields = () => {
    const userInfoFromLS = localStorageAPI.load('feedback-form-state');
    
    if (userInfoFromLS){
        input.value = userInfoFromLS.email || '';
        textArea.value = userInfoFromLS.message || '';
    }
  
}
fillContactFormFields()

const onInputFormData = (e) => {
    const inputFieldEl = e.target;
    const inputFieldValue = inputFieldEl.value.trim();
    const inputFieldName = inputFieldEl.name;
    
    user[inputFieldName] = inputFieldValue
    
    localStorageAPI.save('feedback-form-state', user);
    
}

const onSubmitFormData = e => {
    e.preventDefault();
    if (e.target.email.value && e.target.message.value) {
    console.log(localStorageAPI.load('feedback-form-state'));
    localStorageAPI.remove('feedback-form-state');
    formInput.reset();  
    }
    else {
        alert('Всі поля мають бути заповенні !')
    }          
}

formInput.addEventListener('input', throttle(onInputFormData, 500));
formInput.addEventListener('submit', onSubmitFormData)
