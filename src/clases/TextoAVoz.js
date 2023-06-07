import { config } from './../config.js';
export default class TextoAVoz {
  constructor() {
    this.speechSynth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.settings = {};
    this.state = 'playing';
    this.utterance.lang = "es-ES";
    this.initialized = this.init();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync') {
        this.updateSettings(changes);
      }
    });
  }
  async init() {
    await this.getSettings();
  }
  
  getSettings() {
    return new Promise((resolve, reject) => {
      
      const configKeys = config.filter((field) => field?.name !== undefined);
      const configKeyNames = configKeys.map(key => key.name);
      chrome.storage.sync.get(configKeyNames, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          for (const key of configKeys) {
            this.settings[key.name] = result[key.name] || key.defaultValue;
          }
          console.log("Settings loaded:", this.settings);
          resolve();
        }
      });
    });
  }

  updateSettings(changes) {
    for (let key in changes) {
      let storageChange = changes[key];
      this.settings[key] = storageChange.newValue;
    }
  }

  setLanguage() {
    this.utterance.lang = this.settings.language;
  }

  setVoz() {
    const vocesDisponibles = this.speechSynth.getVoices();
    this.utterance.voice = vocesDisponibles[this.settings.setVoz];
  }

  setVelocidad() {
    this.utterance.rate = this.settings.velocidad.value;

  }

  setTonada() {
    this.utterance.pitch = this.settings.setTonada.value;
  }
  
  textToSpeechWindow(content) {
    const div = document.createElement('div');
    div.style.cssText = 'border-radius: 26px; background-color: white; position: fixed; padding: 3em; top: 50%; left: 50%; transform: translate(-50%, -50%);-webkit-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);';
    div.innerHTML = content;
    document.body.appendChild(div);
    return div; // Devolvemos el div para poder modificar su contenido en otras funciones
  }

  addScreenOnLoadingSpeech() {
    const spinner = `
    <style>
    .spin {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
        }
        @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
    </style>
    <svg xmlns="http://www.w3.org/2000/svg"
    class="spin"
        style="width: 100px;"
        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
    </svg>`
  }
  
  addScreenToCancel() {
    const htmlContent = `
        <div>
          <button class="btn btn-info mr-4" id="speechState" data-state="playing">
            <svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
          </button>
          <button class="btn btn-danger" id="cancelSpeech">
            <svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
          </button>
        </div>
      `;
    const div = this.textToSpeechWindow(htmlContent);
    this.screen = div; // Guardamos el div para poder modificar su contenido en otras funciones
    this.screen.innerHTML = htmlContent; // Cambiamos el contenido del div a un botón
    document.getElementById('cancelSpeech').addEventListener('click', () => this.stfu());
    document.getElementById('speechState').addEventListener('click', () => this.toggleSpeechState());
  }

  toggleSpeechState(){
    const speechState = document.getElementById('speechState');
    if (this.state === 'playing') {
      speechState.innerHTML = `<svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`
      this.state = 'paused';
      this.speechSynth.pause();
    }else{
      speechState.innerHTML = `<svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`
      this.state = 'playing';
      this.speechSynth.resume();
    }
  }
  stfu() {
    this.screen.remove();
    this.speechSynth.cancel();
  }

  chunkText(text, maxLength) {
    const chunks = text.match(new RegExp('.{1,' + maxLength + '}', 'g'));
    return chunks;
  }

  speakChunk(chunks, index) {
    if (index < chunks.length) {
      this.utterance.text = chunks[index];
      this.speechSynth.speak(this.utterance);
      this.utterance.onend = () => this.speakChunk(chunks, index + 1);
    } else {
      this.addScreenToCancel();
    }
  }
  
  async speak(text) {
    await this.initialized;
    this.prepareSpeech(text);
  }
  
  prepareSpeech(texto) {
    this.setLanguage()
    this.setVoz()
    this.setVelocidad()
    this.setTonada()
    const chunks = this.chunkText(texto, 100); // Aquí ajustas el tamaño máximo de cada chunk
    this.speakChunk(chunks, 0);
    this.addScreenToCancel(); // Puedes agregar esta línea aquí si quieres que aparezca el botón de silenciar una vez que comienza la lectura
  }
  
}