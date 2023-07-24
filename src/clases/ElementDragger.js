export default class ElementDragger {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.dragElement = null;

    // Crear el elemento arrastrable
    this.createDragElement();

    // Configurar los eventos de arrastrar y soltar
    this.setupDragEvents();
  }

  createDragElement() {
    this.dragElement = document.createElement('div');
    this.dragElement.style.width = '35px';
    this.dragElement.style.height = '35px';
    this.dragElement.style.display = 'flex';
    this.dragElement.style.alignItems = 'center';
    this.dragElement.style.justifyContent = 'center';
    this.dragElement.style.borderRadius = '50%';
    this.dragElement.style.backgroundColor = 'black';
    this.dragElement.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" style=" height: 20px; fill: #FFFF;" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32v96H128V192c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V288h96v96H192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H288V288h96v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v32H288V128h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"/></svg>';
    this.dragElement.style.position = 'absolute';
    this.dragElement.style.top = '-15px';
    this.dragElement.style.right = '-15px';

    this.container.appendChild(this.dragElement);
  }

  setupDragEvents() {
    let offsetX, offsetY;

    this.dragElement.addEventListener('mousedown', (event) => {
      // Permitir el arrastre solo con el botón izquierdo del ratón
      if (event.button !== 0) return;

      offsetX =
        event.clientX -
        this.dragElement.parentElement.getBoundingClientRect().left;
      offsetY =
        event.clientY -
        this.dragElement.parentElement.getBoundingClientRect().top;

      this.moveAt(event.pageX, event.pageY);

      // Mover el elemento arrastrable con el ratón
      document.addEventListener('mousemove', this.onMouseMove);
    });

    this.dragElement.addEventListener('mouseup', () => {
      // Dejar de mover el elemento arrastrable
      document.removeEventListener('mousemove', this.onMouseMove);
    });

    this.onMouseMove = (event) => {
      this.moveAt(event.pageX, event.pageY);
    };

    this.moveAt = (pageX, pageY) => {
      this.dragElement.parentElement.style.left = pageX - offsetX + 'px';
      this.dragElement.parentElement.style.top = pageY - offsetY + 'px';
    };
  }
}
