const fs = require('fs');
const path = require('path');

const browser = process.argv[2] || 'chrome';

// Seleccionar el archivo de manifiesto basado en el navegador
const manifestFile = `manifest.${browser}.json`;

// Copiar el archivo de manifiesto seleccionado a manifest.json
fs.copyFileSync(path.join(__dirname, 'src', manifestFile), path.join(__dirname, 'dist', 'manifest.json'));