// src/plugins/webfontloader.js
import WebFont from 'webfontloader';

export function loadFonts() {
  WebFont.load({
    google: {
      families: ['Noto+Sans+KR:100,300,400,500,700,900&display=swap'],
    },
    custom: {
      families: ['Material Design Icons'],
      urls: ['https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css'],
    },
  });
}
