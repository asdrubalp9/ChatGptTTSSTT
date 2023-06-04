const config = [
  {
    type: 'separator',
    label: 'Configuración de Text to speech',
  },
  {
    name: 'language',
    label: 'Text To Speech language',
    placeholder: 'Text To Speech language',
    htmlId: 'language',
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
    name: 'setVoz',
    label: 'Text To Speech languageaaa',
    placeholder: 'Text To Speech language',
    htmlId: 'setVoz',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'voiceSelector',
    Hint: '',
  },
  {
    name: 'velocidad',
    label: 'Set talking speed',
    placeholder: 'Set talking speed',
    htmlId: 'velocidad',
    htmlclass: '',
    value: '',
    defaultValue: '1',
    type: 'numeric',
    Hint: '',
  },
  {
    name: 'setTonada',
    label: 'Text To Speech language',
    placeholder: 'Text To Speech language',
    htmlId: 'setTonada',
    htmlclass: '',
    value: '',
    defaultValue: 'es-ES',
    type: 'text',
    Hint: '',
  },



  {
    type: 'separator',
    label: 'Speech to text settings',
  },
  {
    name: 'oneLiner',
    label: 'Eliminate breakspaces, double spaces and new lines',
    htmlId: 'oneLiner',
    htmlclass: '',
    value: '',
    defaultValue: 'always',
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
    type: 'separator',
    label: 'Element Redaction',
  },
  {
    type: 'p',
    label: 'Use css selectors to select the content of the HTML you want to redact and select the option to redact or not redact the content of the selected HTML element. <br> To paste the content, just press ctrl+shift+Z and it will paste it in the prompt or press the button bellow the download chat button.',
  },
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
