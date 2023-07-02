const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');


module.exports = (env, argv) => {
  const browser = argv.env.browser || 'unknown';

  const isZipable = argv?.env?.isZipable || false;
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'dist', 'manifest.json'), 'utf8'));
  // Obtener el nombre y reemplazar espacios por underscores
  const name = manifest.name.replace(/\s/g, '_');
  return {
    entry: {
      content: path.join(__dirname, 'src', 'content.js'),
      background: path.join(__dirname, 'src', 'background.js'),
      popup: path.join(__dirname, 'src', 'popup.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new WebpackBuildNotifierPlugin({
        title: name,
        suppressSuccess: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(__dirname, 'src', 'helpers.js'), to: path.join(__dirname, 'dist', 'helpers.js') },
          { from: path.join(__dirname, 'src', 'images'), to: path.join(__dirname, 'dist', 'images') },
          { from: path.join(__dirname, 'src', 'clases'), to: path.join(__dirname, 'dist', 'clases') },
          { from: path.join(__dirname, 'src', 'options.html'), to: path.join(__dirname, 'dist', 'options.html') },
          { from: path.join(__dirname, 'src', 'options.js'), to: path.join(__dirname, 'dist', 'options.js') },
          { from: path.join(__dirname, 'src', 'popup.html'), to: path.join(__dirname, 'dist', 'popup.html') },
          { from: path.join(__dirname, 'dist', 'manifest.json'), to: path.join(__dirname, 'dist', 'manifest.json') },
          // { from: path.join(__dirname, 'src', 'popup.js'), to: path.join(__dirname, 'dist', 'popup.js') },
          { from: path.join(__dirname, 'src', 'background.js'), to: path.join(__dirname, 'dist', 'background.js') },
          { from: path.join(__dirname, 'src', 'browser-polyfill.min.js'), to: path.join(__dirname, 'dist', 'browser-polyfill.min.js') },
          //{ from: path.join(__dirname, 'src', 'sounds'), to: path.join(__dirname, 'dist', 'sounds') },
          { from: path.join(__dirname, 'src', '_locales'), to: path.join(__dirname, 'dist', '_locales') },
        ],
      }),
      ...(isZipable ? [new ZipPlugin({
        filename: `${name}_${browser}.zip`,
        compression: 'DEFLATE',
        path: '../dist-zip',
      })] : []),
    ],
  };
}
