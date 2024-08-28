// src/plugins/vuetify.js
import 'vuetify/styles'; // Vuetify 기본 스타일 가져오기
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Material Design Icons 가져오기

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // 기본 아이콘 세트 설정
        aliases,
        sets: {
            mdi,
        },
    },
});

export default vuetify;
