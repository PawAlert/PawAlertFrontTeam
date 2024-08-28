import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';  // 라우터 모듈 임포트
import { createPinia } from 'pinia';  // Pinia 임포트
import vuetify from './plugins/vuetify';  // Vuetify 임포트
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);

app.use(createPinia());  // Pinia를 애플리케이션에 등록
app.use(router);  // Vue Router를 애플리케이션에 등록
app.use(vuetify);  // Vuetify를 애플리케이션에 등록

app.mount('#app');  // 애플리케이션 마운트
