const config = [
  {
    type: 'separator',
    label: chrome.i18n.getMessage('configTextToSpeech'),
  },
  {
    name: 'autoTalk',
    label: chrome.i18n.getMessage('talkAfterResponse'),
    htmlId: 'autoTalk',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: chrome.i18n.getMessage('always'),
        value: 'always',
      },
      {
        label: chrome.i18n.getMessage('never'),
        value: 'never',
      },
    ],
  },
  {
    name: 'TTSlanguage',
    label: chrome.i18n.getMessage('TTSLanguage'),
    placeholder: chrome.i18n.getMessage('TTSLanguage'),
    htmlId: 'TTSlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: chrome.i18n.getMessage("englishUS")
      },
      {
        value: "es-ES",
        label: chrome.i18n.getMessage("spanishSpain")
      },
      {
        value: "fr-FR",
        label: chrome.i18n.getMessage("frenchFrance")
      },
      {
        value: "de-DE",
        label: chrome.i18n.getMessage("germanGermany")
      },
      {
        value: "it-IT",
        label: chrome.i18n.getMessage("italianItaly")
      },
      {
        value: "ja-JP",
        label: chrome.i18n.getMessage("japaneseJapan")
      },
      {
        value: "pt-BR",
        label: chrome.i18n.getMessage("portugueseBrazil")
      },
      {
        value: "zh-CN",
        label: chrome.i18n.getMessage("chineseChina")
      },
    ],
  },
  
  {
    name: 'velocidad',
    label: chrome.i18n.getMessage('setTalkingSpeed'),
    placeholder: chrome.i18n.getMessage('setTalkingSpeed'),
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
    label: chrome.i18n.getMessage("setVoiceTone"),
    placeholder: chrome.i18n.getMessage("setVoiceTone"),
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
    label: chrome.i18n.getMessage("STTSettings"),
  },
  {
    type: 'p',
    label: chrome.i18n.getMessage("STTDescription"),
  },
  {
    name: 'autoFocus',
    label: chrome.i18n.getMessage("autoFocusAfterApproval"),
    htmlId: 'autoFocus',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: chrome.i18n.getMessage('always'),
        value: 'always',
      },
      {
        label: chrome.i18n.getMessage('never'),
        value: 'never',
      },
    ],
  },
  
  {
    name: 'STTlanguage',
    label: chrome.i18n.getMessage("SRlanguage"),
    placeholder: chrome.i18n.getMessage("SRlanguage"),
    htmlId: 'STTlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: chrome.i18n.getMessage("englishUS")
      },
      {
        value: "es-ES",
        label: chrome.i18n.getMessage("spanishSpain")
      },
      {
        value: "fr-FR",
        label: chrome.i18n.getMessage("frenchFrance")
      },
      {
        value: "de-DE",
        label: chrome.i18n.getMessage("germanGermany")
      },
      {
        value: "it-IT",
        label: chrome.i18n.getMessage("italianItaly")
      },
      {
        value: "ja-JP",
        label: chrome.i18n.getMessage("japaneseJapan")
      },
      {
        value: "pt-BR",
        label: chrome.i18n.getMessage("portugueseBrazil")
      },
      {
        value: "zh-CN",
        label: chrome.i18n.getMessage("chineseChina")
      },
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
