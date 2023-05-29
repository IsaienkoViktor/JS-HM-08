import localStorageAPI from './localstorage';
import throttle from 'lodash.throttle';

const formInput = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
let user = {};

const fillContactFormFields = () => {
    const userInfoFromLS = localStorageAPI.load('feedback-form-state');
    
    if (userInfoFromLS === undefined) {
        return
        // input.value = userInfoFromLS.email || '';
        // textArea.value = userInfoFromLS.message || '';
    }
   for (const key in userInfoFromLS) {
       user[key] = userInfoFromLS[key];
       formInput.elements[key].value = userInfoFromLS[key];
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
    
    if (e.target.elements.email.value && e.target.elements.message.value) {
    console.log(localStorageAPI.load('feedback-form-state'));  
    localStorageAPI.remove('feedback-form-state');  
    formInput.reset();      
       }
    else {
      
        
    user = {};   
        alert('Всі поля мають бути заповенні !')
    }          
}

formInput.addEventListener('input', throttle(onInputFormData, 500));
formInput.addEventListener('submit', onSubmitFormData)
