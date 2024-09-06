const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    chainWebpack: config => {
        config.module
            .rule('txt')
            .test(/\.txt$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
    transpileDependencies: [
        'vuetify',
        'vue-tel-input-vuetify'
    ],

    devServer: {
        port: 8080, // 개발 서버 포트를 8080으로 설정
    },

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },

    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/global.scss";` // 글로벌 Sass 파일을 모든 컴포넌트에 추가
            }
        }
    }
});
