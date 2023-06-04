class ElementMonitor {
  constructor(checkInterval = 200) {
    this.checkInterval = checkInterval;
    this.trackedElement = null;
    this.observer = null;
    const audioUrl = chrome.runtime.getURL('ding.mp3');
    this.audio = new Audio(audioUrl);
  }

  init() {
    this.checkIntervalId = setInterval(() => {
      const element = document.querySelector('form');
      if (element && element.tagName === 'FORM') {
        this.trackedElement = element;
        this.startMonitoring(element);
        clearInterval(this.checkIntervalId); // Clear the interval once the element is found
      }
    }, this.checkInterval);
  }

  startMonitoring(element) {
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationsList, observer) => {
      if (this.trackedElement.outerHTML.includes('Stop generating')) {
        this.observer.disconnect();
        this.waitForReturnToOriginal(element);
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
  }

  waitForReturnToOriginal(element) {
    const config = { attributes: true, childList: true, subtree: true };
    const self = this; // store reference to 'this'

    const callback = (mutationsList, observer) => {
      if (/(Regenerate response|New response|There was an error generating a response|Generate new response)/i.test(self.trackedElement.outerHTML)) {
      //if (self.trackedElement.outerHTML.includes('Regenerate response')) {

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

            self.audio.play();
            self.observer.disconnect();
            self.startMonitoring(element);
          });
        });
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
  }
}

export default ElementMonitor;
