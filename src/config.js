const config = [
  {
    type: 'separator',
    label: chrome.i18n.getMessage('configTextToSpeech'),
  },
  {
    name: 'autoTalk',
    label: 'Talk as soon as chatGPT ends responding',
    htmlId: 'autoTalk',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: 'Always',
        value: 'always',
      },
      {
        label: 'Never',
        value: 'never',
      },
    ],
  },
  {
    name: 'TTSlanguage',
    label: 'Text To Speech language',
    placeholder: 'Text To Speech language',
    htmlId: 'TTSlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: "English (United States)"
      },
      {
        value: "es-ES",
        label: "Spanish (Spain)"
      },
      {
        value: "fr-FR",
        label: "French (France)"
      },
      {
        value: "de-DE",
        label: "German (Germany)"
      },
      {
        value: "it-IT",
        label: "Italian (Italy)"
      },
      {
        value: "ja-JP",
        label: "Japanese (Japan)"
      },
      {
        value: "pt-BR",
        label: "Portuguese (Brazil)"
      },
      {
        value: "zh-CN",
        label: "Chinese (China)"
      },
    ],
  },
  
  {
    name: 'velocidad',
    label: 'Set talking speed',
    placeholder: 'Set talking speed',
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
    label: 'Ajustar tono de voz',
    placeholder: 'Ajustar tono de voz',
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
    label: 'Speech to text settings',
  },
  {
    type: 'p',
    label: 'For voice to text, you have to press the microphone button at the prompt area or press L, once the window is open, you can press R to listen again, A to approve what it listened and escape to close the window.',
  },
  {
    name: 'autoFocus',
    label: 'Auto focus on textarea when the text is approved',
    htmlId: 'autoFocus',
    htmlclass: '',
    value: '',
    defaultValue: 'never',
    type: 'radio',
    Hint: '',
    options: [
      {
        label: 'Always',
        value: 'always',
      },
      {
        label: 'Never',
        value: 'never',
      },
    ],
  },
  
  {
    name: 'STTlanguage',
    label: 'Speech Recognition language',
    placeholder: 'Speech Recognition language',
    htmlId: 'STTlanguage',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'select',
    Hint: '',
    options: [
      {
        value: "en-US",
        label: "English (United States)"
      },
      {
        value: "es-ES",
        label: "Spanish (Spain)"
      },
      {
        value: "fr-FR",
        label: "French (France)"
      },
      {
        value: "de-DE",
        label: "German (Germany)"
      },
      {
        value: "it-IT",
        label: "Italian (Italy)"
      },
      {
        value: "ja-JP",
        label: "Japanese (Japan)"
      },
      {
        value: "pt-BR",
        label: "Portuguese (Brazil)"
      },
      {
        value: "zh-CN",
        label: "Chinese (China)"
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
