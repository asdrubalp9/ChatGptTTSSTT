class SoundActivator {
  constructor() {
    const audioUrl = chrome.runtime.getURL('ding.mp3');
    this.audio = new Audio(audioUrl);
  }

  playSound() {
    // Get the sound setting from the Chrome storage
    chrome.storage.sync.get(['sound'], (result) => {
      const soundSetting = result.sound;

      // If the sound setting is 'never', don't play the sound
      if (soundSetting === 'never') {
        return;
      }

      chrome.runtime.sendMessage({ message: 'getTabUrl' }, (response) => {
        if (chrome.runtime.lastError) {
          return;
        }

        // If the sound setting is 'notFocused' and the tab is focused, don't play the sound
        if (soundSetting === 'notFocused' && response.tabUrl.includes('chat.openai.com')) {
          return;
        }

        this.audio.play();
      });
    });
  }
}

export default SoundActivator;
