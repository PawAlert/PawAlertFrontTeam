// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { useKakao } from 'vue3-kakao-maps';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import {VueTelInputVuetify} from "vue-tel-input-vuetify";

loadFonts();

const app = createApp(App);

const pinia = createPinia(); // Pinia 인스턴스 생성
app.use(pinia);  // Pinia를 애플리케이션에 등록
app.use(VueTelInput);
app.use(router);  // Vue Router를 애플리케이션에 등록
app.use(vuetify);  // Vuetify를 애플리케이션에 등록
app.use(VueTelInputVuetify, { vuetify });  // VueTelInputVuetify를 애플리케이션에 등록

useKakao('43c594eca674cf06b920ee95d91886c7');
app.mount('#app');  // 애플리케이션 마운트
