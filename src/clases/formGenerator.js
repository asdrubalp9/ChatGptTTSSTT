class FormGenerator {
  constructor(className, fieldArray) {
    this.formSelector = className;
    this.fieldArray = JSON.parse(JSON.stringify(fieldArray));
  }

  toast(message = 'Saved successfully') {
    const toast = document.querySelector('.toast');
    const toastBody = document.querySelector('.toast-body');
    toastBody.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  }

  async getStoredValue(key, defaultValue) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get([key], (result) => {
          resolve(result[key] == undefined ? defaultValue : result[key]);
        });
      } catch (e) {
        resolve(defaultValue);
      }
    });
  }

  async generateForm() {
    const formElement = document.createElement('form');
    formElement.className = `form ${this.formSelector}`;

    for (const field of this.fieldArray) {

      let fieldElement;
      switch (field.type) {
        case 'voiceSelector':
          fieldElement = await this.createVoiceSelector(field);
        break;
        case 'customSelector':
          fieldElement = await this.createCustomCssSelector(field);
          break;
        case 'button':
          fieldElement = this.createButton(field);
          break;
        case 'p':
          fieldElement = this.createP(field);
          break;
        case 'separator':
          fieldElement = this.createSeparator(field);
          break;
        case 'number':
        case 'text':
        case 'password':
        case 'email':
          fieldElement = await this.createTextField(field);
          break;
        case 'textarea':
          fieldElement = await this.createTextArea(field);
          break;
        case 'checkbox':
          fieldElement = await this.createCheckbox(field);
          break;
        case 'select':
          fieldElement = await this.createSelectInput(field);
          break;
        case 'switch':
        case 'radio':
          fieldElement = await this.createRadio(field);
          break;
        default:
          continue;
      }

      formElement.appendChild(fieldElement);
    }

    const element = await this.waitForElement(this.formSelector);
    element.appendChild(formElement);
  }


  async createVoiceSelector(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3';
  
    const labelElement = document.createElement('label');
    labelElement.for = field.htmlId;
    labelElement.className = 'form-label fw-semibold';
    labelElement.innerHTML = field.label;
  
    const selectElement = document.createElement('select');
    selectElement.className = `form-select ${field.htmlClass}`;
    selectElement.id = field.htmlId;
    selectElement.name = field.name;
  
    const storedValue = await this.getStoredValue(field.name, field.defaultValue);
  
    if (typeof speechSynthesis !== "undefined") {
      let voices = speechSynthesis.getVoices();
      voices.forEach((voice) => {
        const optionElement = document.createElement('option');
        optionElement.value = voice.name;
        optionElement.innerText = `${voice.name} (${voice.lang})`;
        if (voice.default) {
          optionElement.innerText += " — DEFAULT";
        }
        if (storedValue === voice.name) {
          optionElement.selected = true;
        }
        selectElement.appendChild(optionElement);
      });
      // Cuando las voces estén cargadas, repobla la lista
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          selectElement.innerHTML = ""; // Limpia el select
          voices.forEach((voice) => {
            const optionElement = document.createElement('option');
            optionElement.value = voice.name;
            optionElement.innerText = `${voice.name} (${voice.lang})`;
            if (voice.default) {
              optionElement.innerText += " — DEFAULT";
            }
            if (storedValue === voice.name) {
              optionElement.selected = true;
            }
            selectElement.appendChild(optionElement);
          });
        };
      }
    }
  
    selectElement.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [field.name]: e.target.value }, () => {
        this.toast(`Voice is set to ${e.target.value}`);
      });
  
      if (field.onChange) {
        field.onChange(e);
      }
    });
  
    divElement.appendChild(labelElement);
    divElement.appendChild(selectElement);
  
    return divElement;
  }

  async createSelectInput(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3';
  
    const labelElement = document.createElement('label');
    labelElement.for = field.htmlId;
    labelElement.className = 'form-label fw-semibold';
    labelElement.innerHTML = field.label;
  
    const selectElement = document.createElement('select');
    selectElement.className = `form-select ${field.htmlClass}`;
    selectElement.id = field.htmlId;
    selectElement.name = field.name;
  
    const storedValue = await this.getStoredValue(field.name, field.defaultValue);
  
    field.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.innerText = option.label;
      if (storedValue === option.value) {
        optionElement.selected = true;
      }
      selectElement.appendChild(optionElement);
    });
  
    selectElement.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [field.name]: e.target.value }, () => {
        this.toast(`Value is set to ${e.target.value}`);
      });
  
      if (field.onChange) {
        field.onChange(e);
      }
    });
  
    divElement.appendChild(labelElement);
    divElement.appendChild(selectElement);
  
    return divElement;
  }  

  async createCustomCssSelector(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3 row';
    const divCol8Element = document.createElement('div');
    divCol8Element.className = 'col-8';
    const divCol4Element = document.createElement('div');
    divCol4Element.className = 'col-4 d-flex justify-content-center align-items-center';
  
    for (const subField of field.fields) {
      const subFieldElement = await this.createTextField(subField);
      divCol8Element.appendChild(subFieldElement);
    }
    const storedValue = await this.getStoredValue(field.name, field.defaultValue);
    if(field?.radioOptions){
      const radioOptionsDiv = this.createRadioOptions(field, field.radioOptions, storedValue);
      divCol8Element.appendChild(radioOptionsDiv);
    }
    
  
    divElement.appendChild(divCol8Element);
    divElement.appendChild(divCol4Element);
    return divElement;
  }
  
  createRadioOptions(field, radioOptions, storedValue) {
    const radioOptionsDiv = document.createElement('div');
  
    radioOptions.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'form-check';
      const input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'radio';
      input.name = field.name; // Changed from field.htmlId to field.name
      input.value = option.value;
      input.id = `${field.htmlId}${index + 1}`;
      input.checked = storedValue.setting == option.value;
  
      const optionLabel = document.createElement('label');
      optionLabel.className = 'form-check-label';
      optionLabel.htmlFor = input.id;
      optionLabel.innerText = option.label;
  
      input.addEventListener('change', (e) => {
        
        const setting = {
                          [field.name]: {
                                          setting: e.target.value,
                                          selector: e.target.closest('.row').querySelector('input[type="text"]').value
                                        }
                        }
        chrome.storage.sync.set(setting, () => {
          this.toast(`Value is set to ${option.label}`);
        });
  
        if (field.onChange) {
          field.onChange(e);
        }
      });
  
      optionDiv.appendChild(input);
      optionDiv.appendChild(optionLabel);
      radioOptionsDiv.appendChild(optionDiv);
    });
  
    return radioOptionsDiv;
  }


  createButton(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3 d-flex justify-content-end';
    const buttonElement = document.createElement('button');
    buttonElement.className = field.class || 'btn btn-warning';  // usando la clase del campo si está disponible
    buttonElement.innerText = field.label;
    buttonElement.addEventListener('click', (e) => {
      e.preventDefault();
      field.action();
    });
    
    divElement.appendChild(buttonElement);
    return divElement;
  }

  createP(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3';
    const pElement = document.createElement('p');
    pElement.className = 'col-12';
    pElement.innerHTML = field.label;
    divElement.appendChild(pElement);
    return divElement;
  }

  createSeparator(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3 row';

    const divCol1Element = document.createElement('div');
    divCol1Element.className = 'col';

    const hr1Element = document.createElement('hr');
    hr1Element.className = 'mt-4';
    divCol1Element.appendChild(hr1Element);

    const divCol2Element = document.createElement('div');
    divCol2Element.className = 'col';

    const pElement = document.createElement('p');
    pElement.className = 'fw-bold text-center col-12';
    pElement.innerText = field.label;
    divCol2Element.appendChild(pElement);

    const divCol3Element = document.createElement('div');
    divCol3Element.className = 'col';

    const hr2Element = document.createElement('hr');
    hr2Element.className = 'mt-4';
    divCol3Element.appendChild(hr2Element);

    divElement.appendChild(divCol1Element);
    divElement.appendChild(divCol2Element);
    divElement.appendChild(divCol3Element);

    return divElement;
  }

  async createTextField(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3';

    const labelElement = document.createElement('label');
    labelElement.for = field.htmlId;
    labelElement.className = 'form-label fw-semibold';
    labelElement.innerHTML = field.label;

    const inputElement = document.createElement('input');
    inputElement.type = field.type;
    inputElement.className = `form-control ${field?.htmlClass || ''}`;
    inputElement.id = field?.htmlId || '';
    inputElement.name = field?.name || '';
    
    if(field?.type == 'number') {
      inputElement.min = field?.min || '';
      inputElement.max = field?.max || '';
      inputElement.step = field?.step || '';
    }
    inputElement.placeholder = field?.placeholder || '';

    const storedValue = await this.getStoredValue(field.name, field.defaultValue);
    console.log('storedValue', storedValue);
    inputElement.value = storedValue.value;

    inputElement.addEventListener('change', (e) => {
      
      const setting = {
                          [field.name]: {
                                          //setting: e.target.closest('.row').querySelector('.row [type="radio"]:checked').value,
                                          value: e.target.value,
                                        }
                        }
      chrome.storage.sync.set(setting, () => {
        this.toast(`Value is set to ${e.target.value}`);
      });

      if (field.onChange) {
        field.onChange(e);
      }
    });

    divElement.appendChild(labelElement);
    divElement.appendChild(inputElement);
    if(field?.hint || field?.min || field?.max || field?.step) {
      const hintLabelElement = document.createElement('label');
      hintLabelElement.for = field.htmlId;
      hintLabelElement.className = 'form-label text-muted text-small';
      let hint = field.hint || '';
      if(field?.type == 'number') {
        hint += ` (${field?.min ?'min:'+ field.min +', ' : ''} ${field?.max ?'max:'+ field.max : ''} ${field?.step ?', step:'+ field.step : ''})`;
      }
      hintLabelElement.innerHTML = hint;
      divElement.appendChild(hintLabelElement);
      
    }

    return divElement;
  }

  async createTextArea(field) {
    const divElement = document.createElement('div');
    divElement.className = 'mb-3';

    const labelElement = document.createElement('label');
    labelElement.for = field.htmlId;
    labelElement.className = 'form-label fw-semibold';
    labelElement.innerText = field.label;

    const textAreaElement = document.createElement('textarea');
    textAreaElement.className = `form-control ${field.htmlClass}`;
    textAreaElement.id = field.htmlId;
    textAreaElement.name = field.name;
    textAreaElement.rows = 3; // you may want to control this with a field property

    const storedValue = await this.getStoredValue(field.name, field.defaultValue);
    textAreaElement.value = storedValue;

    textAreaElement.addEventListener('change', (e) => {
      // Update in Chrome Storage
      chrome.storage.sync.set({ [field.name]: e.target.value }, () => {
        this.toast(`Value is set to ${e.target.value}`);
      });

      if (field.onChange) {
        field.onChange(e);
      }
    });

    divElement.appendChild(labelElement);
    divElement.appendChild(textAreaElement);

    return divElement;
  }

  async createCheckbox(field) {
    const div = document.createElement('div');
    div.className = 'mb-3';

    const label = document.createElement('label');
    label.className = 'form-label fw-semibold';
    label.innerText = field.label;

    div.appendChild(label);

    const storedValue = await this.getStoredValue(field.name, field.defaultValue);

    const optionDiv = document.createElement('div');
    optionDiv.className = 'form-check';

    const input = document.createElement('input');
    input.className = 'form-check-input';
    input.type = 'checkbox';
    input.name = field.name;
    input.id = field.htmlId;
    input.checked = Boolean(storedValue);

    input.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [field.name]: e.target.checked }, () => {
        this.toast(`Value is set to ${e.target.checked}`);
      });

      if (field.onChange) {
        field.onChange(e);
      }
    });

    const optionLabel = document.createElement('label');
    optionLabel.className = 'form-check-label';
    optionLabel.htmlFor = input.id;
    optionLabel.innerText = field.label;

    optionDiv.appendChild(input);
    optionDiv.appendChild(optionLabel);

    div.appendChild(optionDiv);

    return div;
  }

  async createRadio(field) {
    const div = document.createElement('div');
    div.className = 'mb-3';

    const label = document.createElement('label');
    label.className = 'form-label fw-semibold';
    label.innerText = field.label;

    div.appendChild(label);

    const storedValue = await this.getStoredValue(field.name, field.defaultValue);

    if (field.options && field.options.length > 0) {
      field.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'form-check';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = field.name;
        input.value = option.value;
        input.id = `${field.htmlId}${index + 1}`;
        input.checked = storedValue == option.value;

        const optionLabel = document.createElement('label');
        optionLabel.className = 'form-check-label';
        optionLabel.htmlFor = input.id;
        optionLabel.innerText = option.label;

        input.addEventListener('change', (e) => {
          chrome.storage.sync.set({ [field.name]: e.target.value }, () => {
            this.toast(`Value is set to ${option.label}`);
          });

          if (field.onChange) {
            field.onChange(e);
          }
        });
        optionDiv.appendChild(input);
        optionDiv.appendChild(optionLabel);

        div.appendChild(optionDiv);
      });
    }

    return div;
  }

  async waitForElement(selector, time = 2000, interval = 100) {
    console.log('selector', selector)
    const endTime = Number(new Date()) + time;

    const check = (resolve, reject) => {
      if (document.querySelector('.'+selector)) {
        resolve(document.querySelector('.'+selector));
      } else if (Number(new Date()) < endTime) {
        setTimeout(check, interval, resolve, reject);
      } else {
        reject(new Error(`Timed out waiting for ${selector}`));
      }
    };

    return new Promise(check);
  }
}
export default FormGenerator;
