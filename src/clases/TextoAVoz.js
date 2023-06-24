import { geti18nMessage } from "./../helpers";
import ConfigHandler from './ConfigHandler.js';
export default class TextoAVoz {
  constructor() {
    this.configHandler = null
    this.speechSynth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.state = 'playing';
    this.utterance.lang = null
    this.initialized = null
    this.handleKeyup = this.handleKeyup.bind(this); // Haz el binding de 'this'
  }

  async init() {
    this.configHandler = await ConfigHandler.create();
    this.startListeningToEscapeKey()
    this.startListening()
  }

  handleMessages(request, sender, sendResponse) {
    if (request.command === "speak") {
      this.speak(request.text);
    }
  }

  startListening() {
    const runtime = typeof chrome !== 'undefined' ? chrome.runtime : browser.runtime;
    if (runtime) {
      runtime.onMessage.addListener(this.handleMessages.bind(this));
    }
  }

  stopListening() {
    const runtime = typeof chrome !== 'undefined' ? chrome.runtime : browser.runtime;
    if (runtime) {
      runtime.onMessage.removeListener(this.handleMessages.bind(this));
    }
  }

  handleKeyup(e) {
    if (e.key === 'Escape') {
      this.stopTalking();
    }
  }

  startListeningToEscapeKey() {
    document.addEventListener('keyup', this.handleKeyup);
  }

  stopListeningToEscapeKey() {
    document.removeEventListener('keyup', this.handleKeyup);
  }

  setLanguage() {
    this.utterance.lang = this.configHandler.settings.TTSlanguage;
  }

  setVoz() {
    const vocesDisponibles = this.speechSynth.getVoices();
    this.utterance.voice = vocesDisponibles[this.configHandler.settings.setVoz];
  }

  setVelocidad() {
    this.utterance.rate = this.configHandler.settings.velocidad;
  }

  setTonada() {
    this.utterance.pitch = this.configHandler.settings.setTonada;
  }
  
  textToSpeechWindow(content) {
    const div = document.createElement('div');
    div.classList.add('speechWindow');
    div.style.cssText = 'border-radius: 26px; background-color: white; position: fixed; padding: 3em; top: 50%; left: 50%; transform: translate(-50%, -50%);-webkit-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);';
    div.innerHTML = content;
    document.body.appendChild(div);
    return div; // Devolvemos el div para poder modificar su contenido en otras funciones
  }
  
  addScreenToCancel() {
    const readingIn = this.configHandler.settings.TTSlanguage
    const htmlContent = `
        <style>
          .flex-center {
            justify-content: center;
            align-items: center;
            display: flex;
          }
          .column {
            flex-direction: column;
          }
        </style>
        <div class="flex flex-col justify-center row">
          <div class="col-12">
            <p class="text-center">
            ${geti18nMessage('readingIn')}: ${readingIn}
            </p>
          </div>
          <div class="col-6 flex">
            <button class="btn flex-center btn-outline-dark flex-grow border border-gray-200" id="speechState" data-state="playing">
              <svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
            </button>
          </div>
          <div class="col-6 flex column">
            <button class="btn flex-center btn-danger flex-grow" id="cancelSpeech" style="margin:20px 0px 0px;">
              <svg style="width: 100px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
            </button>
            <p class="text-center">
              ${geti18nMessage('PressEscToCancel')}
            </p>
          </div>
        </div>
      `;
    const div = this.textToSpeechWindow(htmlContent);
    this.screen = div; // Guardamos el div para poder modificar su contenido en otras funciones
    this.screen.innerHTML = htmlContent; // Cambiamos el contenido del div a un botón
    document.getElementById('cancelSpeech').addEventListener('click', () => this.stopTalking());
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

  stopTalking() {
    console.log('stopTalking', this.screen)
    if(this.screen){
      this.screen.remove();
    }
    document.querySelectorAll('.speechWindow').forEach((el) => el.remove());
    this.speechSynth.cancel();
  }

  chunkText(text, maxLength) {
    const chunks = text.match(new RegExp('.{1,' + maxLength + '}', 'g'));
    return chunks;
  }

  speakChunk(chunks, index) {
    console.log('speakChunk', chunks[index])
    if (index < chunks.length) {
      this.utterance.text = chunks[index];
      this.speechSynth.speak(this.utterance);
      this.utterance.onend = () => this.speakChunk(chunks, index + 1);
    } else {
      console.log('se acabo el texto')
      this.stopTalking()
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
    this.addScreenToCancel(); 
  }
  
}