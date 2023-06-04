module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-base",
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "no-console": "off", // Permitir el uso de console.log()
        "no-unused-vars": [  { argsIgnorePattern: "^_" } ], // Marcar variables no utilizadas, excepto aquellas que comienzan con un guión bajo (_)
        "no-constant-condition": [  { checkLoops: false } ], // Permitir condiciones constantes en bucles

        // Reglas de estilo de código
        indent: [  4 ], // Utilizar sangrado de 2 espacios
        quotes: [ "double" ], // Utilizar comillas simples en lugar de comillas dobles
        semi: [ "always" ], // Utilizar punto y coma al final de cada sentencia
        "comma-dangle": [ "always-multiline" ], // Utilizar coma al final de la última propiedad de un objeto o elemento en un array
        "object-curly-spacing": [  "always" ], // Agregar espacios entre llaves de objetos
        "array-bracket-spacing": [  "always" ], // Agregar espacios entre corchetes de arrays

        // Otras reglas recomendadas
        "no-var": "error", // Evitar el uso de 'var', utilizar 'let' o 'const' en su lugar
        "prefer-const": "error", // Utilizar 'const' en lugar de 'let' cuando sea posible
        eqeqeq: [  "always" ], // Utilizar operadores de igualdad estricta (===, !==) en lugar de la igualdad débil (==, !=)
    },
};
