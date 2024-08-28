<template>
  <v-app>
    <v-main>
      <router-view></router-view> <!-- 현재 활성화된 라우트의 컴포넌트가 이곳에 렌더링됩니다 -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* 필요에 따라 스타일을 추가하세요 */
</style>
