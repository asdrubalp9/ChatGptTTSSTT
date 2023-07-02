export default class ElementMonitor {
  constructor(
    condicionInicial,
    condicionFinal,
    eventName = 'domMutationDetected',
    eventEmitter = document,
    trackedSelector = 'FORM',
    checkInterval = 200,
  ) {
    console.log('ElementMonitor ttsstt');
    this.checkInterval = checkInterval;
    this.trackedSelector = trackedSelector || 'FORM';
    this.observer = null;
    this.eventEmitter = eventEmitter;
    this.eventName = eventName;
    this.condicionInicial = condicionInicial;
    this.condicionFinal = condicionFinal;
    this.initialized = false;
    this.isMonitoring = false;
    this.isWaiting = false;
  }

  init(callback = () => {}) {
    if (this.initialized) {
      return;
    }
    const element = document.querySelector(this.trackedSelector);
    if (element) {
      console.log(`${this.eventName} encontrado`);
      this.trackedElement = element;
      this.startMonitoring(element);
      this.initialized = true;
      callback();
    } else {
      setTimeout(() => {
        console.log(`buscando ${this.eventName} `, element);
        this.init(callback);
      }, 200);
    }
  }

  startMonitoring(element) {
    if (this.isMonitoring) {
      return;
    }

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationsList, observer) => {
      if (this.condicionInicial.test(this.trackedElement.outerHTML)) {
        this.observer.disconnect();
        this.waitForReturnToOriginal(element);
        this.isMonitoring = false;
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
    this.isMonitoring = true;
  }

  waitForReturnToOriginal(element) {
    if (this.isWaiting) {
      return;
    }

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationsList, observer) => {
      if (this.condicionFinal.test(this.trackedElement.outerHTML)) {
        console.log(
          '--------------------finished responding ------------------',
        );
        this.observer.disconnect();
        this.startMonitoring(element);
        this.isWaiting = false;
        const event = new CustomEvent(this.eventName, {
          detail: { mutation: 'regenerateResponse' },
        });
        this.eventEmitter.dispatchEvent(event);
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
    this.isWaiting = true;
  }
}
