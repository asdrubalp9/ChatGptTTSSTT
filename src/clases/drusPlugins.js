export default class DrusPlugins {
    constructor(position = 'fixed', top = '0', width = '100px', height = '100px', right = '0', marginRight = '2em') {
        this.container = null;
        this.position = position;
        this.top = top;
        this.width = width;
        this.height = height;
        this.right = right;
        this.marginRight = marginRight;
    
        const intervalId = setInterval(() => {
          if (document.readyState === 'complete') {
            this.container = document.createElement('div');
            this.container.id = 'drusPlugins';
            this.container.style.position = this.position;
            this.container.style.top = this.top;
            this.container.style.width = this.width;
            this.container.style.height = this.height;
            this.container.style.right = this.right;
            this.container.style.zIndex = 99;
            this.container.style.marginRight = this.marginRight;
            
            document.body.appendChild(this.container);
            clearInterval(intervalId);
          }
        }, 100);
      }
    
      insertHTML(html) {
        return new Promise((resolve, reject) => {
          const intervalId = setInterval(() => {
            if (this.container) {
              this.container.innerHTML += html;
              clearInterval(intervalId);
              resolve();
            }
          }, 100);
        });
      }
  }
  