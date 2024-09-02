<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const drawer = ref(false);

const exampleList = ref([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' }
]);

const navigateTo = (path) => {
  router.push(path); // router.push를 사용하여 페이지 이동
  drawer.value = false; // 사이드바 닫기
};

</script>

<template>
  <v-container>
    <!--  토글 버튼-->
    <v-btn v-if="!drawer" icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>

    </v-btn>
    <!--  사이드바  -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in exampleList" :key="item">
          <v-btn class="itemlist" @click="navigateTo(item.path)" >{{ item.name }}</v-btn>
        </v-list-item>
        <v-btn class="close-btn" @click="drawer = !drawer">
          닫기
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </v-container>

</template>

<style scoped>
.itemlist{
  width: 100%;
}
.close-btn{
  width: 100%;
}
</style>