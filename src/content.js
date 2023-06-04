import ElementMonitor from './clases/elementMonitor.js';
import TextoAVoz from './clases/textoAVoz.js';
import { HTMLInjector, delegateEventListener } from './helpers.js';

// TODO:


const MicBtnHTML = `
 <button id="micBtn" class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent" style="right: 2.5em;">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style=" height: 20px; fill: #d0d0d7;"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path></svg>
 </button>
`;

const speakBtnHTML = `
<button class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 speakBtn">
 <svg stroke="currentColor" fill="#a1a1b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 96 960 960" width="1em"><path d="m801 751-50-50q48-51 73.5-104.5T850 465q0-78-25.5-131.5T751 229l50-50q56 58 87.5 126.5T920 465q0 91-31.5 159.5T801 751ZM662 609l-50-50q18-20 28-42.5t10-51.5q0-29-10-51.5T612 371l50-50q26 28 42 65.5t16 78.5q0 41-16 78.5T662 609Zm-302 6q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 936v-94q0-38 19-64.5t49-41.5q51-26 120.5-43T360 676q62 0 131 17t120 43q30 15 49.5 41.5T680 842v94H40Zm60-60h520v-34q0-16-8.5-29.5T587 790q-48-27-109-40.5T360 736q-57 0-118.5 14.5T132 790q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T450 465q0-39-25.5-64.5T360 375q-39 0-64.5 25.5T270 465q0 39 25.5 64.5T360 555Zm0-90Zm0 411Z"/></svg>
</button>
`;
// document.querySelector('textArea').style.paddingRight="60px";
HTMLInjector(MicBtnHTML, 'textarea','afterend');
delegateEventListener('#micBtn', 'click', function(event) {
  console.log('Elemento clickeado: ', this);
});

HTMLInjector(speakBtnHTML, 'main .flex-1 .group:nth-child(odd) .relative .text-gray-400 .flex.gap-1 button:last-child','afterend');
delegateEventListener('.speakBtn', 'click', function(event) {
  // este código se ejecutará cuando se haga clic en un elemento con la clase 'mi-clase'
  const btn = this
  let text = btn.parentElement.parentElement.parentElement.parentElement.querySelector('.markdown').innerText
  const tts = new TextoAVoz
  tts.speak(text)

});


// Conecta el botón con la función de descarga



const myMonitor = new ElementMonitor();
myMonitor.init();

