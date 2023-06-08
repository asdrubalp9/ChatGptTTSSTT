export default class ElementMonitor {
  constructor(condicionInicial, condicionFinal, eventName = "domMutationDetected", eventEmitter = document, trackedSelector = 'FORM', checkInterval = 200) {
    this.checkInterval = checkInterval;
    this.trackedSelector = trackedSelector || 'FORM';
    this.observer = null;
    this.eventEmitter = eventEmitter; 
    this.eventName = eventName; 
    this.condicionInicial = condicionInicial
    this.condicionFinal = condicionFinal
  }

  init(callback = () => { }){
    this.checkIntervalId = setInterval(() => {
      const element = document.querySelector(this.trackedSelector);
      console.log('buscando ', this.eventName, element)
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
      // /(Stop generating)/i
      if (this.condicionInicial.test(this.trackedElement.outerHTML)) {
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
      console.log('waiting',this.condicionFinal.test(this.trackedElement.outerHTML))
      // /(Regenerate response|New response|There was an error generating a response|Generate new response)/i.test(this.trackedElement.outerHTML)
      if (this.condicionFinal.test(this.trackedElement.outerHTML)) {
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
