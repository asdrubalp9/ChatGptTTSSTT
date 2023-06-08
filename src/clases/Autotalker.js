import { config } from '../config.js';
import TextoAVoz from './TextoAVoz.js';
import ConfigHandler from './ConfigHandler.js';
import ElementMonitor from './ElementMonitor.js'; // import the ElementMonitor class


export default class AutoTalker extends TextoAVoz {
  constructor() {
    super();
    this.talkIcon = `<svg class="talk" style=" height: 20px; fill: #FFFF;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>`
    this.silentIcon = `<svg class="silent" style=" height: 20px; fill: #FFFF;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>`
    this.configHandler = null;
    this.initConfigHandler();
    this.initAutoTalker();
    this.elementMonitor = new ElementMonitor(/(Stop generating)/i, /(Regenerate response|New response|There was an error generating a response|Generate new response)/i, "eventStartTalking", document, 'FORM', 200);
  }

  async initConfigHandler() {
    this.configHandler = await new ConfigHandler();
  }

  async initAutoTalker() {
    console.log('iniciando auto talker')
    this.checkIntervalId = setInterval(() => {
      const drusPluginsDiv = document.getElementById('drusPlugins');
      if (drusPluginsDiv) {
        this.elementMonitor.init();
        clearInterval(this.checkIntervalId); 
        const button = document.createElement('button');
        button.id = 'autoTalk';
        button.style = 'position: fixed;top: 1em;right: 1em;border-radius: 50%;height: 50px;width: 50px;display: flex;align-items: center;justify-content: center;';
        button.className = 'btn btn-primary shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]';
        let talkingStatus = ''
        if(this.configHandler.settings.autoTalk == 'always'){
          talkingStatus = this.talkIcon
        }else{
          talkingStatus = this.silentIcon
        }
        button.innerHTML = talkingStatus

        button.onclick = () => {
          let newAutoTalk = this.configHandler.settings.autoTalk == 'always' ? 'never' : 'always';
          console.log('clikc', newAutoTalk)
          this.configHandler.setSettings({autoTalk: newAutoTalk}).then(() => {
            button.innerHTML = newAutoTalk == 'always' ? this.talkIcon : this.silentIcon;
          }).catch((error) => {
            console.error("Error al actualizar la configuración: ", error);
          });
        };
        drusPluginsDiv.appendChild(button);

        document.addEventListener(this.elementMonitor.eventName, () => {
          console.log("order heard. checking config")
          if (this.configHandler.settings.autoTalk == 'always') {
            console.log("Now I'll talk")
            const sectores = document.querySelectorAll('main .group.bg-gray-50:nth-child(odd)')
            let speech = sectores[sectores.length - 1 ].innerText
            speech = speech.replace('ChatGPT\n','')
            console.log('speech', speech)
            this.speak(speech);
          }
        });
      }
    }, 200);
  }
}