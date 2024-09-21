<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/modules/auth";

const authStore = useAuthStore();

const router = useRouter();

const userRole = ref('');

onMounted(() => {
  authStore.checkAuth();
  console.log("유저 정보 데이터", authStore.user)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="hidden-sm-and-down">
        <v-list>
          <!-- 왼쪽 리스트 배치 -->
          <v-list>
            <v-list-item @click="router.push({name: 'Profile'})">
              <v-card-text>
                프로필
              </v-card-text>
            </v-list-item>
            <v-list-item @click="router.push({name: 'MyPost'})">
              <v-card-text>
                내가 작성한 글
              </v-card-text>
            </v-list-item>
            <v-list-item @click="router.push({name: 'MyFavorites'})">
              <v-card-text>
                찜 글
              </v-card-text>
            </v-list-item>
            <v-list-item v-if="authStore.user.UserRoles === 'ROLE_USER'"
                         @click="router.push({name: 'joinHospitalShelter'})">
              <v-card-text>
                동물병원 / 보호센터 등록하기
              </v-card-text>
            </v-list-item>

            <v-list-item v-else-if="authStore.user.UserRoles === 'ROLE_ANIMAL_HOSPITAL_USER'"
                         @click="router.push({name: 'myHospital'})">
              <v-card-text>
                나의 동물병원
              </v-card-text>
            </v-list-item>

            <v-list-item v-else-if="authStore.user.UserRoles === 'ROLE_ASSOCIATION_USER'"
                         @click="router.push({name: 'MyShelter'})">
              <v-card-text>
                나의 보호센터
              </v-card-text>
            </v-list-item>


            <v-list-item @click="router.push({name: 'Contact'})">
              <v-card-text>
                문의하기
              </v-card-text>
            </v-list-item>
            <v-list-item @click="router.push({name: 'myLogout'})">
              <v-card-text>
                로그아웃
              </v-card-text>
            </v-list-item>
          </v-list>
        </v-list>
      </v-col>
      <v-menu offset-y class="hidden-md-and-up">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="hidden-md-and-up mt-12 ml-5">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>프로필</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>내가 작성한 글</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>찜 글</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>동물병원 / 보호센터 등록하기</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>문의하기</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>로그아웃</v-list-item-title>
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
