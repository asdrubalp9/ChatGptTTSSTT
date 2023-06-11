import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
const path = require('path');

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'src', 'background.js'),
        content: path.resolve(__dirname, 'src', 'content.js'),
        popup: path.resolve(__dirname, 'src', 'popup.js'),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: path.join(__dirname, 'src', 'manifest.json'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'icon16.png'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'icon48.png'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'icon128.png'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'options.html'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'popup.html'), dest: path.join(__dirname, 'dist') },
        { src: path.join(__dirname, 'src', 'images'), dest: path.join(__dirname, 'dist', 'images') },
        { src: path.join(__dirname, 'src', 'clases'), dest: path.join(__dirname, 'dist', 'clases') },
        { src: path.join(__dirname, 'src', '_locales'), dest: path.join(__dirname, 'dist', '_locales') },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/, // also transpile TS.
    exclude: [/node_modules/, /bower_components/]
  }
})
