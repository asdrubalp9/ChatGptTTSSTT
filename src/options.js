// import boostrap from 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { geti18nMessage } from "./helpers.js";
      var objects = document.getElementsByTagName('*'), i;
      for(i = 0; i < objects.length; i++) {
          if (objects[i].dataset && objects[i].dataset.i18n) {
              objects[i].innerText = geti18nMessage(objects[i].dataset.i18n);
          }
      }