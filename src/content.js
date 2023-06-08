import SoundActivator from './clases/SoundActivator.js';
import ElementMonitor from './clases/ElementMonitor.js';
import TalkingButtons from './clases/TalkingButtons.js';

import TextoAVoz from './clases/TextoAVoz.js';
import AutoTalker from './clases/Autotalker.js';
import DrusPlugins from './clases/DrusPlugins.js';
import { HTMLInjector, delegateEventListener, getStoredValue, watchStoredValue } from './helpers.js';

// TODO:

const MicBtnHTML = `
 <button id="micBtn" class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent" style="right: 2.5em;">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style=" height: 20px; fill: #d0d0d7;"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path></svg>
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


// delegateEventListener('.speakBtn', 'click', function(event) {
//   // este código se ejecutará cuando se haga clic en un elemento con la clase 'mi-clase'
//   const btn = this
//   let text = btn.parentElement.parentElement.parentElement.parentElement.querySelector('.markdown').innerText
//   const tts = new TextoAVoz
//   tts.speak(text)
// 
// });

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
const talkingButtonAdder = new TalkingButtons();
talkingButtonAdder.initTalkingButtons()

delegateEventListener('a', 'click', function(event) {
  talkingButtonAdder.initTalkingButtons()
});