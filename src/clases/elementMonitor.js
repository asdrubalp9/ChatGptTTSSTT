export default class ElementMonitor {
  constructor( checkInterval = 200, eventName = "domMutationDetected", eventEmitter = document) {
    this.checkInterval = checkInterval;
    this.trackedSelector = 'FORM';
    this.observer = null;
    this.eventEmitter = eventEmitter; 
    this.eventName = eventName; 

  }

  init(callback = () => { }){
    this.checkIntervalId = setInterval(() => {
      const element = document.querySelector(this.trackedSelector);
      if (element) {
        console.log('elemento encontrado')
        this.trackedElement = element;
        this.startMonitoring(element);
        clearInterval(this.checkIntervalId); 
        callback();
      }
    }, this.checkInterval);
  }

  startMonitoring(element) {
    const config = { attributes: true, childList: true, subtree: true };
    console.log('start monitoring')
    const callback = (mutationsList, observer) => {
      console.log('start monitoring')
      if (/(Stop generating)/i.test(this.trackedElement.outerHTML)) {
        this.observer.disconnect();
        this.waitForReturnToOriginal(element);
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
  }

  waitForReturnToOriginal(element) {
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      console.log('waiting', /(Regenerate response|New response|There was an error generating a response|Generate new response)/i.test(this.trackedElement.outerHTML))
      if (/(Regenerate response|New response|There was an error generating a response|Generate new response)/i.test(this.trackedElement.outerHTML)) {
        console.log('--------------------finished responding ------------------')
        this.observer.disconnect();
        this.startMonitoring(element);
        const event = new CustomEvent(this.eventName, { detail: { mutation: "regenerateResponse" } });
        this.eventEmitter.dispatchEvent(event);
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
  }
}
