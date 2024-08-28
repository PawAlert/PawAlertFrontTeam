// src/plugins/webfontloader.js
import WebFont from 'webfontloader';

export function loadFonts() {
  WebFont.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
    custom: {
      families: ['Material Design Icons'], // Material Design Icons를 사용하도록 지정
      urls: ['https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css'], // MDI 아이콘 폰트 CSS
    },
  });
}
