import TalkingButtons from './clases/TalkingButtons.js';

import AutoTalker from './clases/Autotalker.js';
import VozATexto from './clases/VozATexto.js';
import TextoAVoz from './clases/TextoAVoz.js';
import DrusPlugins from './clases/DrusPlugins.js';
//import InjectMovableHtml from './clases/InjectMovableHtml.js';
import { HTMLInjector, delegateEventListener } from './helpers.js';

const plugin = new DrusPlugins();
const textoAVoz = new TextoAVoz();
textoAVoz.init()
const autoTalker = new AutoTalker();
autoTalker.init()
let vozATexto = new VozATexto();
vozATexto.initVozATexto()
// const talkingButtonAdder = new TalkingButtons();
// talkingButtonAdder.initTalkingButtons()
// const moveable = new InjectMovableHtml('<p>My Movable Element</p>', 'myElement');

delegateEventListener('li a', 'click', async function(event) {
  vozATexto.addMicrophoneSetBtn()
}); 