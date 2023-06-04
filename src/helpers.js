function HTMLInjector(HTML, selector, position) {
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

  function delegateEventListener(selector, eventType, eventHandler) {
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

export { HTMLInjector, delegateEventListener };