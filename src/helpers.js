export function HTMLInjector(HTML, selector, position) {
  // 'beforebegin': Antes del elemento en sí.
  // 'afterbegin': Justo dentro del elemento, antes de su primer hijo.
  // 'beforeend': Justo dentro del elemento, después de su último hijo.
  // 'afterend': Después del elemento en sí.
  var intervalId = setInterval(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.insertAdjacentHTML(position, HTML);
      });
      clearInterval(intervalId);
    }
  }, 1000); // 1000ms = 1s
}

export function delegateEventListener(selector, eventType, eventHandler) {
      // agregar el evento al document (elemento padre)
      document.addEventListener(eventType, function(event) {
          // obtener el elemento al que se hizo clic
          var targetElement = event.target;

          // recorrer la cadena de ancestros del elemento hasta encontrar un elemento que coincida con el selector
          while (targetElement != null) {
              if (targetElement.matches(selector)) {
                  eventHandler.call(targetElement, event);
                  break;
              }
              targetElement = targetElement.parentElement;
          }
      }, false);
  }

// Esta función obtiene el valor almacenado y devuelve una promesa que se resuelve con ese valor.
export function getStoredValue(key, defaultValue) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key] == undefined ? defaultValue : result[key]);
      });
    } catch (e) {
      reject(e);
    }
  });
}

// Esta función registra un listener que se llama cada vez que se cambia un valor en el almacenamiento.
export function watchStoredValue(key, callback) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes[key]) {
      callback(changes[key].newValue);
    }
  });
}
