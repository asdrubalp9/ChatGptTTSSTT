import FormGenerator from './clases/formGenerator.js';
import { config } from './config.js';
import bootstrap from 'bootstrap';


const formGenerator = new FormGenerator('optionScreen', config);
formGenerator.generateForm().then(() => {
  console.log('Form has been generated.');
}).catch((error) => {
  console.error('Failed to generate form:', error);
});
