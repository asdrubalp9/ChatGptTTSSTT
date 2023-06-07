import SoundActivator from './clases/SoundActivator.js';
import ElementMonitor from './clases/ElementMonitor.js';

import TextoAVoz from './clases/TextoAVoz.js';
import AutoTalker from './clases/Autotalker.js';
import DrusPlugins from './clases/DrusPlugins.js';
import { HTMLInjector, delegateEventListener, getStoredValue, watchStoredValue } from './helpers.js';

// TODO:


// const autoTalk = `
// <button id="autoTalk" style="position: fixed;top: 1em;right: 1em;border-radius: 50%;height: 50px;width: 50px;display: flex;align-items: center;justify-content: center;" class="btn btn-primary shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
//   <svg class="talk" style=" height: 20px; fill: #d0d0d7;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
//   <svg class="silent hidden" style=" height: 20px; fill: #d0d0d7;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
//  </button>
// `;
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

const plugin = new DrusPlugins();

// plugin.insertHTML(autoTalk)
// .then(() => {
//   const autoTalker = new AutoTalker
//   // console.log('AAAAAAAAAAAAUTOTALK')
//   // getStoredValue('autoTalk', 'never')
//   // .then((value) => {
      
//   //     console.log('getStoredValue', value)
      
//   // })
// })

HTMLInjector(MicBtnHTML, 'textarea','afterend');
delegateEventListener('#micBtn', 'click', function(event) {
  console.log('Elemento clickeado: ', this);
});


delegateEventListener('.speakBtn', 'click', function(event) {
  // este código se ejecutará cuando se haga clic en un elemento con la clase 'mi-clase'
  const btn = this
  let text = btn.parentElement.parentElement.parentElement.parentElement.querySelector('.markdown').innerText
  const tts = new TextoAVoz
  tts.speak(text)

});

// Conecta el botón con la función de descarga
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === "speak") {
    const tts = new TextoAVoz();
    tts.speak(request.text);
  }
});

// const soundActivator = new SoundActivator();
// const soundMonitor = new ElementMonitor();
// soundMonitor.init(() => {
  //   soundActivator.playSound();
  // });
  
const autoTalker = new AutoTalker();
// const addingSpeakingBtns = new ElementMonitor('main .group.bg-gray-50:nth-child(odd)');
// addingSpeakingBtns.init(() => {
//   console.log('PUPUUUUUUUUU')
//   const sectores = document.querySelectorAll('main .group.bg-gray-50:nth-child(odd)')
//   console.log('sectores', sectores)
//   sectores.forEach(sector => {
//     if(sector.style.position === 'relative') return
//     sector.style.position = 'relative'
//     //agregar speak btn
//     sector.innerHTML = speakBtnHTML + sector.innerHTML
//   })
//   // const sector = sectores[sectores.length - 1]
//   // sectorModificable.innerHTML = sectorModificable.innerHTML + speakBtnHTML
// });
