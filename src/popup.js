import FormGenerator from './clases/FormGenerator.js';
import { config } from './config.js';
import bootstrap from 'bootstrap';


const formGenerator = new FormGenerator('optionScreen', config);
formGenerator.generateForm().then(() => {
  console.log('Form has been generated.');
}).catch((error) => {
  console.error('Failed to generate form:', error);
});
document.addEventListener('DOMContentLoaded', function () {
  var objects = document.getElementsByTagName('*'), i;
  for(i = 0; i < objects.length; i++) {
      if (objects[i].dataset && objects[i].dataset.i18n) {
          objects[i].innerText = chrome.i18n.getMessage(objects[i].dataset.i18n);
      }
  }
});
const optionsLink = document.querySelector('#optionsLink');
if(optionsLink){
  optionsLink.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}