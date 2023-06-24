import TalkingButtons from './clases/TalkingButtons.js';

import AutoTalker from './clases/Autotalker.js';
import VozATexto from './clases/VozATexto.js';
import TextoAVoz from './clases/TextoAVoz.js';
import DrusPlugins from './clases/DrusPlugins.js';
import { HTMLInjector, delegateEventListener } from './helpers.js';




const plugin = new DrusPlugins();


const textoAVoz = new TextoAVoz();
textoAVoz.init()
const autoTalker = new AutoTalker();
let vozATexto = new VozATexto();
vozATexto.initVozATexto()
// const talkingButtonAdder = new TalkingButtons();
// talkingButtonAdder.initTalkingButtons()

// TODO: cuando haga click en una pagina nueva, que funcione y no se multiplique por mil el modal y funcione el voz a texto
delegateEventListener('li a', 'click', async function(event) {
  console.log('click, event:', event);
  await vozATexto.destroy()
  vozATexto.initVozATexto()
}); 