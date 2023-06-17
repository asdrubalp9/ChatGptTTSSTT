import { geti18nMessage } from "./../helpers";
import { HTMLInjector, delegateEventListener, waitForElement } from './../helpers.js';
import ConfigHandler from './ConfigHandler.js';
export default class VozATexto {
    constructor() {
        this.recognition = null;
        this.settings = {};
        this.textArea = null;
        this.isListening = false;
        
        this.initVozATexto()

        this.listeningDiv = null
    }

    async initConfigHandler() {
        this.configHandler = await new ConfigHandler.create();
        await this.setLanguage()
    }

    textToSpeechWindow(content) {
        const div = document.createElement('div');
        div.classList.add('textToSpeechWindow')
        div.innerHTML = content;
        document.body.appendChild(div);
        return div;
    }

    addListeningScreen() {
        const htmlContent = `
        <style>
            .textToSpeechWindow {   
                border-radius: 26px;
                background-color: white;
                position: fixed;
                padding: 3em;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 36px -9px rgba(0,0,0,0.75);
                min-width: 320px;
                width: 59vh;
            }
            #listeningState {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: block;
                margin: 20px auto;
            }
            .d-fd-column {
                display: flex;
                flex-direction: column;
            }
            .text-small.text-muted {
                font-size: 0.8em;
                color: #6c757d!important;
                text-align:center;
            }
            @keyframes pulse {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
                }
        
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
                }
        
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                }
            }
            .flex-center {
                justify-content: center;
                align-items: center;
                display: flex;
            }
            .activeListening {
                background-color: tomato;
                animation: pulse 1.2s infinite cubic-bezier(0.66, 0, 0, 1);
            }
            .inactiveListening {
                background-color: #6c757d;
            }
            #transcript {
                width: 100%;
                word-break: break-word;
                text-align: center;
                margin:20px 0;
            }
        </style>
            <div class="d-flex justify-content-center flex-column gap-10">
                <div id="listeningState" class="pulse" data-state="playing"></div>
                <p id="transcript"></p>
                <div class="row d-flex flex-direction-row justify-content-between gap-20">
                    <div class="d-fd-column">
                        <button class="btn flex-center btn-primary" id="aproveText">
                            <svg style="width: 100px;" height="2em" fill="#FFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
                        </button>
                        <span class="text-small text-muted">${geti18nMessage("PressAToApprove")}</span>
                        
                    </div>
                    <div class="d-fd-column">
                        <button class="btn flex-center btn-dark" id="restart">
                            <svg style="width: 100px;" height="2em" fill="#FFFF" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                        </button>
                        <span class="text-small text-muted">${geti18nMessage("PressRToRestart")}</span>
                    </div>
                    <div class="d-fd-column">
                        <button class="btn flex-center btn-danger" id="cancelListening">
                            <svg style="width: 100px;" height="2em" fill="#FFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                        </button>
                        <span class="text-small text-muted">${geti18nMessage("PressEscToCancel")}</span>
                    </div>
                </div>
            </div>
        `;
        this.textArea = document.querySelector('#prompt-textarea');
        const div = this.textToSpeechWindow(htmlContent);
        this.screen = div; 
        this.screen.innerHTML = htmlContent;
        document.getElementById('restart').addEventListener('click', () => this.listen());
        document.getElementById('cancelListening').addEventListener('click', () => this.stopListening());
        document.getElementById('aproveText').addEventListener('click', () => this.aprovedText());
        this.listeningDiv = document.getElementById('listeningState');
        this.listeningDiv.classList.add('activeListening');
    }

    aprovedText(){
        const text = document.getElementById('transcript').innerText;
        this.stopListening();
        this.textArea.value = text;
        this.textArea.style.height = '264px';
        
        if(this.configHandler.settings.autoFocus == 'always'){
            this.textArea.focus();
        }
    }
    
    startListening() {
        
        if (this.recognition && this.recognition.state === 'listening') {
            this.recognition.stop();
        }
        this.addListeningScreen();//
        this.listen();
    }
    
    async adjustButtonSizeBasedOnVolume() {
        const listeningButton = document.getElementById('listeningState');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.microphoneStream = stream; // Guardar el stream para usarlo más tarde
            const audioContext = new AudioContext();
            await audioContext.audioWorklet.addModule('./audio-processor.js');
            const audioProcessor = new AudioWorkletNode(audioContext, 'audio-processor');
            const microphone = audioContext.createMediaStreamSource(this.microphoneStream);
            microphone.connect(audioProcessor);
            audioProcessor.connect(audioContext.destination);
            audioProcessor.port.onmessage = (event) => {
                const average = event.data.average;
                listeningButton.style.width = `${average}px`;
                listeningButton.style.height = `${average}px`;
            };
        } catch (err) {
                console.log("The following error occured: " + err.name);
        }
    }

    onSpeechResult(event) {
        const transcriptElement = document.getElementById('transcript');
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript;
        transcriptElement.innerHTML = transcript;
    }

    stopListening() {

        if (this.microphoneStream) {
            this.microphoneStream.getTracks().forEach(track => track.stop());
            this.microphoneStream = null; 
        }
        document.querySelectorAll('.textToSpeechWindow').forEach(el => el.remove());
        this.screen = null
        this.recognition.stop();
    }

    initVozATexto() {
        console.log('initVozATexto')
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = false;
        this.microphoneStream = null;
        // chrome.storage.onChanged.addListener((changes, areaName) => {
        //     if (areaName === 'sync') {
        //         this.updateSettings(changes);
        //     }
        // });

        document.addEventListener('keyup', (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();
            if (tagName !== 'input' && tagName !== 'textarea') {
                if (e.key === 'Escape') {
                    if(this.listeningDiv){
                        this.stopListening();
                    }
                }
                if (e.key === 'l') {
                    this.startListening();
                }
                if (e.key === 'r') {
                    if(this.listeningDiv){
                        this.listen();
                    }
                }
                if (e.key === 'a') {
                    if(this.listeningDiv){
                        this.aprovedText();
                    }
                }
            }
        })

        this.initConfigHandler();

        const MicBtnHTML = `
            <button id="micBtn" class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent" style="right: 3em;top: 5px; padding: 0 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style=" height: 20px; fill: #d0d0d7;"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path></svg>
            </button>
        `;
        HTMLInjector(MicBtnHTML, 'textarea','afterend');
        delegateEventListener('#micBtn', 'click', (event) => {
            waitForElement('form')
                .then((element) => {
                this.startListening()
                this.textArea = document.querySelector('#prompt-textarea');
                this.textArea.style.paddingRight = '80px';
            })
            .catch((error) => {
                console.error('Error waiting for form element', error);
            });
        });
    }

    updateSettings(changes) {
        for (let key in changes) {
            let storageChange = changes[key];
            this.settings[key] = storageChange.newValue;
        }
    }

    setInterimResults() {
        //this.recognition.interimResults = this.configHandler.settings.interimResults
        //console.log('STT config this.recognition.interimResults', this.recognition.interimResults)
    }

    // setLanguage() {
    //     this.recognition.lang = this.configHandler.settings.STTlanguage;
    // }
    async setLanguage() {
        return new Promise(async (resolve, reject) => {
            try {
                this.recognition.lang = this.configHandler.settings.STTlanguage;
                resolve();
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    setContinuousMode() {
        this.recognition.continuous = false
        //this.recognition.continuous = this.configHandler.settings.continuousMode;
        //console.log('STT config this.recognition.continuous', this.recognition.continuous)
    }

    async listen() {
        await this.initConfigHandler();
        if(this.listeningDiv){
            this.listeningDiv.focus()
            this.listeningDiv.classList.add('activeListening');
            this.listeningDiv.classList.remove('inactiveListening');
        }
        return new Promise((resolve, reject) => {
            console.log("🚀 ~ file: VozATexto.js:279 ~ VozATexto ~ returnnewPromise ~ this.recognition:", this.recognition)
            try {
                this.recognition.start();
                
                this.recognition.onresult = (event) => {
                    const text = event.results[0][0].transcript;
                    console.log('Result received: ' + text);
                    this.onSpeechResult(event);
                    // this.adjustButtonSizeBasedOnVolume();
                    this.listeningDiv.classList.remove('activeListening');
                    this.listeningDiv.classList.add('inactiveListening');
                    resolve(text);
                };
    
                this.recognition.onerror = (event) => {
                    reject('Error occurred in recognition: ' + event.error);
                };
            } catch (error) {
                
            }
        });
    }

    destroy(){
        this.recognition = null;
        this.microphoneStream = null; 
        document.querySelectorAll('.textToSpeechWindow').forEach(el => {console.log(el); el.remove()});
        this.screen = null

    }
}