import { geti18nMessage } from "./helpers";

const config = [
  {
    type: 'separator',
    label: geti18nMessage('configTextToSpeech'),
  },
  {
    name: 'autoTalk',
    label: geti18nMessage('talkAfterResponse'),
    htmlId: 'autoTalk',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: geti18nMessage('always'),
        value: 'always',
      },
      {
        label: geti18nMessage('never'),
        value: 'never',
      },
    ],
  },
  {
    name: 'TTSlanguage',
    label: geti18nMessage('TTSLanguage'),
    placeholder: geti18nMessage('TTSLanguage'),
    htmlId: 'TTSlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: geti18nMessage("englishUS")
      },
      {
        value: "es-ES",
        label: geti18nMessage("spanishSpain")
      },
      {
        value: "fr-FR",
        label: geti18nMessage("frenchFrance")
      },
      {
        value: "de-DE",
        label: geti18nMessage("germanGermany")
      },
      {
        value: "it-IT",
        label: geti18nMessage("italianItaly")
      },
      {
        value: "ja-JP",
        label: geti18nMessage("japaneseJapan")
      },
      {
        value: "pt-BR",
        label: geti18nMessage("portugueseBrazil")
      },
      {
        value: "zh-CN",
        label: geti18nMessage("chineseChina")
      },
      {
        value: "hi-IN",
        label: geti18nMessage("hindiIndia")
      }
    ],
  },
  
  {
    name: 'velocidad',
    label: geti18nMessage('setTalkingSpeed'),
    placeholder: geti18nMessage('setTalkingSpeed'),
    htmlId: 'velocidad',
    htmlclass: '',
    value: '',
    defaultValue: '1',
    type: 'number',
    min:0, 
    max: 5,
    step: 0.1,
    Hint: '',
  },
  {
    name: 'setTonada',
    min:0, 
    max: 2,
    step: 0.1,
    label: geti18nMessage("setVoiceTone"),
    placeholder: geti18nMessage("setVoiceTone"),
    htmlId: 'setTonada',
    htmlclass: '',
    value: '',
    defaultValue: '1',
    type: 'number',
    Hint: '',
  },
// {
  //   name: 'setVoz',
  //   label: 'Text To Speech language',
  //   placeholder: 'Text To Speech language',
  //   htmlId: 'setVoz',
  //   htmlclass: '',
  //   value: '',
  //   defaultValue: 'es-ES',
  //   type: 'voiceSelector',
  //   Hint: '',
  // },


  {
    type: 'separator',
    label: geti18nMessage("STTSettings"),
  },
  {
    type: 'p',
    label: geti18nMessage("STTDescription"),
  },
  {
    name: 'autoFocus',
    label: geti18nMessage("autoFocusAfterApproval"),
    htmlId: 'autoFocus',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: geti18nMessage('always'),
        value: 'always',
      },
      {
        label: geti18nMessage('never'),
        value: 'never',
      },
    ],
  },
  
  {
    name: 'STTlanguage',
    label: geti18nMessage("SRlanguage"),
    placeholder: geti18nMessage("SRlanguage"),
    htmlId: 'STTlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: geti18nMessage("englishUS")
      },
      {
        value: "es-ES",
        label: geti18nMessage("spanishSpain")
      },
      {
        value: "fr-FR",
        label: geti18nMessage("frenchFrance")
      },
      {
        value: "de-DE",
        label: geti18nMessage("germanGermany")
      },
      {
        value: "it-IT",
        label: geti18nMessage("italianItaly")
      },
      {
        value: "ja-JP",
        label: geti18nMessage("japaneseJapan")
      },
      {
        value: "pt-BR",
        label: geti18nMessage("portugueseBrazil")
      },
      {
        value: "zh-CN",
        label: geti18nMessage("chineseChina")
      },
      {
        value: "hi-IN",
        label: geti18nMessage("hindiIndia")
      }
    ],
  },
  
  // {
  //   name: 'continuousMode',
  //   label: 'Set continuous mode',
  //   placeholder: 'Set continuous mode',
  //   htmlId: 'continuousMode',
  //   htmlclass: '',
  //   value: '',
  //   defaultValue: 'false',
  //   type: 'checkbox',
  //   Hint: 'Whether continuous results are returned for each recognition, or only a single result',
  // },
  
  // {
  //   name: 'interimResults',
  //   label: 'Set interim results',
  //   placeholder: 'Set interim results',
  //   htmlId: 'interimResults',
  //   htmlclass: '',
  //   value: '',
  //   defaultValue: 'false',
  //   type: 'checkbox',
  //   Hint: 'Whether interim results should be returned (true) or not (false)',
  // },
  // {
  //   type: 'separator',
  //   label: 'Element Redaction',
  // },
  // {
  //   type: 'p',
  //   label: 'Use css selectors to select the content of the HTML you want to redact and select the option to redact or not redact the content of the selected HTML element. <br> To paste the content, just press ctrl+shift+Z and it will paste it in the prompt or press the button bellow the download chat button.',
  // },
  // {
  //   type: 'button',
  //   class:"btn btn-warning",
  //   label: 'Reset to default',
  //   action: (e) => {
  //     console.log('click');
  //   },
  // }
];


export { config };
