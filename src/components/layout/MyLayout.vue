<script setup>
import {ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/modules/auth";

const authStore = useAuthStore();
const router = useRouter();

const userRole = ref('');


const logout = () => {
  authStore.logout();
  router.push({name: 'Main'});
}

// 메뉴 아이템을 계산된 속성으로 정의
const menuItems = computed(() => {
    const items = [
      {text: '프로필', route: 'Profile'},
      {text: '내가 작성한 글', route: 'MyPost'},
      {text: '찜 글', route: 'MyPageContact'},
      {text: '문의하기', route: 'MyFavorites'},
      {text: '로그아웃', route: 'myLogout'},
    ];

    if (authStore.user.UserRoles === 'ROLE_USER') {
      items.push({text: '동물병원 / 보호센터 등록하기', route: 'MyPageJoin'});
    } else if (authStore.user.UserRoles === 'ROLE_ANIMAL_HOSPITAL_USER') {
      items.push({text: '나의 동물병원', route: 'myHospital'});
    } else if (authStore.user.UserRoles === 'ROLE_ASSOCIATION_USER') {
      items.push({text: '나의 보호센터', route: 'MyShelter'});
    }

    return items;


});

const navigateTo = (route) => {
  router.push({name: route});
};


onMounted(() => {
  authStore.checkAuth()
})

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="hidden-sm-and-down">
        <v-list>
          <v-list-item v-for="item in menuItems"
                       v-if="authStore.user"
                       :key="item.route"
                       @click="item.route === 'myLogout' ? logout() : navigateTo(item.route)">
            <v-card-text>{{ item.text }}</v-card-text>
          </v-list-item>
        </v-list>
      </v-col>
      <v-menu offset-y class="hidden-md-and-up">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="hidden-md-and-up mt-12 ml-5">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.route" @click="navigateTo(item.route)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-col cols="9">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-link {
  color: #1976D2; /* 버튼처럼 보이게 할 색상 */
  cursor: pointer; /* 마우스 포인터를 손 모양으로 변경 */
  text-decoration: underline; /* 밑줄 추가 */
}

.text-link:hover {
  color: #155A8A; /* 호버 시 색상 변경 */
}

.text-link:active {
  color: #0D47A1; /* 클릭 시 색상 변경 */
}
</style>
