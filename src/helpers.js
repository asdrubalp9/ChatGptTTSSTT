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

export function waitForElement(cssSelector) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const element = document.querySelector(cssSelector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 300);
  });
}

export function delegateEventListener(selector, eventType, eventHandler) {
  // agregar el evento al document (elemento padre)
  document.addEventListener(
    eventType,
    function (event) {
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
    },
    false,
  );
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
  if (typeof chrome !== 'undefined') {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[key]) {
        callback(changes[key].newValue);
      }
    });
  } else if (typeof browser !== 'undefined') {
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes[key]) {
        callback(changes[key].newValue);
      }
    });
  } else {
    throw new Error('Unsupported browser');
  }
}

export function geti18nMessage(key) {
  if (typeof chrome !== 'undefined') {
    // Chrome browser detected
    return chrome.i18n.getMessage(key);
  } else if (typeof browser !== 'undefined') {
    // Firefox browser detected
    return browser.i18n.getMessage(key);
  } else {
    // Unknown browser
    throw new Error('Unsupported browser');
  }
}

export async function obtenerIdiomaNavegador() {
  // Esta función retorna el idioma del navegador
  return new Promise((resolve) => {
    if (window.chrome && chrome.i18n && chrome.i18n.getAcceptLanguages) {
      chrome.i18n.getAcceptLanguages(function (languages) {
        resolve(languages[0]);
      });
    } else {
      resolve(
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.language,
      );
    }
  });
}
