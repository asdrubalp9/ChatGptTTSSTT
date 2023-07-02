class InjectMovableHtml {
    constructor(html, elementName) {
        this.html = html;
        this.elementName = elementName;
        
        // Create wrapper div
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = html;
        this.wrapper.style.position = 'absolute';
        document.body.appendChild(this.wrapper);
        
        // Load position from cookies if exists
        let pos = this.getCookie(this.elementName);
        if (pos) {
            let [left, top] = pos.split(',');
            this.wrapper.style.left = `${left}px`;
            this.wrapper.style.top = `${top}px`;
        }

        // Drag and drop functionality
        this.wrapper.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    }
    
    mouseDownHandler(e) {
        this.offset = [
            this.wrapper.offsetLeft - e.clientX,
            this.wrapper.offsetTop - e.clientY
        ];
        this.isDown = true;
    }
    
    mouseUpHandler() {
        this.isDown = false;
        // Store position in cookies
        this.setCookie(this.elementName, `${this.wrapper.style.left},${this.wrapper.style.top}`);
    }
    
    mouseMoveHandler(event) {
        event.preventDefault();
        if (this.isDown) {
            this.wrapper.style.left = `${event.clientX + this.offset[0]}px`;
            this.wrapper.style.top = `${event.clientY + this.offset[1]}px`;
        }
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
}

// Usage:
// new InjectMovableHtml('<p>My Movable Element</p>', 'myElement');
