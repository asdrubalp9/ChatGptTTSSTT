import { config } from '../config.js';
import ConfigHandler from './ConfigHandler.js';
import ElementMonitor from './ElementMonitor.js';
import TextoAVoz from './TextoAVoz.js';

export default class TalkingButtons extends TextoAVoz {
    constructor() {
        super();
        this.configHandler = null;
        console.log('constructor talkingButton')
        this.initConfigHandler();
    }

    async initConfigHandler() {
        this.configHandler = await new ConfigHandler();
    }

    initTalkingButtons() {
        console.log('init talking buttons')
        const elementMonitor = new ElementMonitor(/^$/i, /(3.4|4|GPT)/i, "createTalkingButton", document, 'main div.overflow-hidden > div > div > div > div', 200);
        document.addEventListener(elementMonitor.eventName, () => {
            console.log('event listener createTalkingButton')
            this.createTalkingButton();
        });
        const addExtraTalkingBtns = new ElementMonitor(/(Stop generating)/i, /(Regenerate response|New response|There was an error generating a response|Generate new response)/i, "addExtraTalkingBtns", document, 'FORM', 200);
        document.addEventListener(addExtraTalkingBtns.eventName, () => {
            console.log('event listener addExtraTalkingBtns')
            this.createTalkingButton();
        });


        const checkMainIsPresent = setInterval(() => {
            const element = document.querySelector('main .group.bg-gray-50:nth-child(odd)');
            if (element) {
                console.log('mainPresent')
                this.createTalkingButton();
                clearInterval(checkMainIsPresent); 
            }
        }, 200);
    }

    createTalkingButton() {
        const sectores = document.querySelectorAll('main .group.bg-gray-50:nth-child(odd)')
        sectores.forEach(sector => {

            const button = document.createElement("button");
            button.style.position = "absolute";
            button.style.width = "30px";
            button.style.height = button.style.width;
            button.style.position = "absolute";
            button.style.background = "#10a37f";
            button.style.display = "flex";
            button.style.alignItems = "center";
            button.style.justifyContent = "center";
            button.style.borderRadius = "50%";
            button.style.top = `calc(50% - ${button.style.width})`;
            button.style.left = `20px`;
            button.classList.add("p-1", "hover:bg-gray-100", "hover:text-gray-700", "dark:text-gray-400", "dark:hover:bg-gray-700", "dark:hover:text-gray-200", "disabled:dark:hover:text-gray-400", "speakBtn");
            button.innerHTML = `<svg stroke="currentColor" fill="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 96 960 960" width="1em"><path d="m801 751-50-50q48-51 73.5-104.5T850 465q0-78-25.5-131.5T751 229l50-50q56 58 87.5 126.5T920 465q0 91-31.5 159.5T801 751ZM662 609l-50-50q18-20 28-42.5t10-51.5q0-29-10-51.5T612 371l50-50q26 28 42 65.5t16 78.5q0 41-16 78.5T662 609Zm-302 6q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 936v-94q0-38 19-64.5t49-41.5q51-26 120.5-43T360 676q62 0 131 17t120 43q30 15 49.5 41.5T680 842v94H40Zm60-60h520v-34q0-16-8.5-29.5T587 790q-48-27-109-40.5T360 736q-57 0-118.5 14.5T132 790q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T450 465q0-39-25.5-64.5T360 375q-39 0-64.5 25.5T270 465q0 39 25.5 64.5T360 555Zm0-90Zm0 411Z"/></svg>`
            button.addEventListener('click', (event) => {
                const btn = event.currentTarget
                let text = btn.closest('div.group').querySelector('.markdown').innerText
                this.speak(text)
            });

            document.body.appendChild(button);
            if(sector.style.position === 'relative') return
            sector.style.position = 'relative'
            sector.insertAdjacentElement('afterbegin',button)
        })
    }
}