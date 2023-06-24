const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');


module.exports = (env, argv) => {
  const isZipable = argv?.env?.isZipable || false;
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'manifest.json'), 'utf8'));
  // Obtener el nombre y reemplazar espacios por underscores
  const name = manifest.name.replace(/\s/g, '_');
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
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
        title: "TTS PLUGIN",
        suppressSuccess: false,
      }),
      ...(isZipable ? [new ZipPlugin({
          filename: `${name}_${formattedDate}.zip`,
          compression: 'DEFLATE',
          path: '../dist-zip',
        })] : []),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(__dirname, 'src', 'manifest.json'), to: path.join(__dirname, 'dist', 'manifest.json') },
          { from: path.join(__dirname, 'src', 'icon16.png'), to: path.join(__dirname, 'dist', 'icon16.png') },
          { from: path.join(__dirname, 'src', 'icon48.png'), to: path.join(__dirname, 'dist', 'icon48.png') },
          { from: path.join(__dirname, 'src', 'icon128.png'), to: path.join(__dirname, 'dist', 'icon128.png') },
          { from: path.join(__dirname, 'src', 'helpers.js'), to: path.join(__dirname, 'dist', 'helpers.js') },
          { from: path.join(__dirname, 'src', 'options.html'), to: path.join(__dirname, 'dist', 'options.html') },
          { from: path.join(__dirname, 'src', 'options.js'), to: path.join(__dirname, 'dist', 'options.js') },
          { from: path.join(__dirname, 'src', 'popup.html'), to: path.join(__dirname, 'dist', 'popup.html') },
          { from: path.join(__dirname, 'src', 'popup.js'), to: path.join(__dirname, 'dist', 'popup.js') },
          { from: path.join(__dirname, 'src', 'images'), to: path.join(__dirname, 'dist', 'images') },
          { from: path.join(__dirname, 'src', 'clases'), to: path.join(__dirname, 'dist', 'clases') },
          { from: path.join(__dirname, 'src', '_locales'), to: path.join(__dirname, 'dist', '_locales') },
        ],
      }),
    ],
  };
}
