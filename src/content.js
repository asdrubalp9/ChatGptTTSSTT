import TalkingButtons from './clases/TalkingButtons.js';

import AutoTalker from './clases/Autotalker.js';
import VozATexto from './clases/VozATexto.js';
import DrusPlugins from './clases/DrusPlugins.js';
import { HTMLInjector, delegateEventListener } from './helpers.js';


const plugin = new DrusPlugins();

let vozATexto = new VozATexto();
const autoTalker = new AutoTalker();
// const talkingButtonAdder = new TalkingButtons();
// talkingButtonAdder.initTalkingButtons()

// TODO: cuando haga click en una pagina nueva, que funcione y no se multiplique por mil el modal y funcione el voz a texto
delegateEventListener('li a', 'click', function(event) {
  console.log('click, event:', event);
  vozATexto.destroy()
  vozATexto = null
  vozATexto = new VozATexto();

}); 