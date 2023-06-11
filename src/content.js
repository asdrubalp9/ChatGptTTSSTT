import TalkingButtons from './clases/TalkingButtons.js';

import AutoTalker from './clases/Autotalker.js';
import VozATexto from './clases/VozATexto.js';
import DrusPlugins from './clases/DrusPlugins.js';
import { HTMLInjector, delegateEventListener } from './helpers.js';


const plugin = new DrusPlugins();

const vozATexto = new VozATexto();
const autoTalker = new AutoTalker();
// const talkingButtonAdder = new TalkingButtons();
// talkingButtonAdder.initTalkingButtons()

delegateEventListener('a', 'click', function(event) {
  // talkingButtonAdder.initTalkingButtons()
}); 