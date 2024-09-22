<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/store/modules/auth';
import {useMyPageStore} from "@/store/modules/mypageInfo";
import router from "@/router/router";

const authStore = useAuthStore();
const myStore = useMyPageStore();

const isEditing = ref(false);

const selectedImage = ref(null);

const userName = ref('');
const phoneNumber = ref('');

const openFileDialog = () => {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();  // 숨겨진 파일 선택창을 클릭
};

const clickEditing = () => {
  isEditing.value = !isEditing.value;
  console.log(isEditing.value)
}

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImage.value = file;
    authStore.fetchUserProfileUpdate(file);
    if (authStore.status === 'success') {
      router.push({name: 'Profile'});
    }
  }
}

const myPageInfoUpdate = async () => {
  const data = {
    username: userName.value,
    phoneNumber: phoneNumber.value
  }
  await myStore.fetchMyPageInfoUpdate(data);
  if (myStore.status === 'myImageSuccess') {
    console.log(myStore.status)
    await router.push({name: 'MyPage'});

  }

}
</script>

<template>

  <div v-if="authStore.status === 'loading'">로딩 중...</div>
  <div v-else-if="authStore.status === 'error'">에러 발생: {{ store.error }}</div>
  <v-container v-if="authStore.user" fluid>
    <v-col>
      <v-col>
        <p style="font-size: 15px; color: #2D2D2D">마이페이지/</p>
        <p style="font-size: 30px; color: #2D2D2D">프로필</p>
      </v-col>
      <v-row>
        <v-col cols="2">
          <v-avatar
              :key="authStore.user.profileImageUrl"
              :image="authStore.user.profileImageUrl"
              size="80">
          </v-avatar>
          <div>
            <v-row justify="center">
              <v-menu
                  min-width="200px"
                  rounded
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      icon
                      v-bind="props"
                  >
                    <v-avatar
                        color="brown"
                        size="large"
                    >
                      <p style="font-size: 20px">+</p>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="mx-auto text-center">
                      <h5>사용자 이메일 </h5>
                      <p class="text-caption mt-1">
                        {{ authStore.user.email }}
                      </p>
                      <v-divider class="my-3"></v-divider>
                      <input type="file" ref="fileInput" @change="onFileSelected" style="display: none;"/>
                      <v-btn
                          variant="text"
                          rounded
                          @click="openFileDialog"
                      >
                        이미지 수정하기
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" lg="10">
          <v-btn-group style="margin-top: 15px;">
            <v-btn
                class="profile-btn"
                @click="clickEditing"
                style="width: 203px;
                background-color: #5E8FD9;
                color: white">
              프로필 정보 수정
            </v-btn>
          </v-btn-group>
        </v-col>
        <v-col>
          <v-col>
            <v-row>

              <v-col>
                <v-col>
                  <p style="font-size: 20px; font-weight: bold; color: #2D2D2D">로그인 이메일</p>
                  <v-text-field
                      variant="outlined"
                      disabled
                      readonly
                  >
                    <p style="color: black"> {{ authStore.user.email }}</p>
                  </v-text-field>
                </v-col>
                <v-col>
                  <p style="font-size: 20px; font-weight: bold; color: #2D2D2D">권한</p>
                  <v-text-field
                      variant="outlined"
                      disabled
                      readonly
                  >
                    <p> {{ authStore.user.UserRoles }}</p>
                  </v-text-field>
                </v-col>
              </v-col>

              <v-col cols="12" md="6">
                <v-col>
                  <p style="font-size: 20px; font-weight: bold; color: #2D2D2D">이름</p>
                  <v-text-field

                      variant="outlined"
                      readonly
                      disabled
                      v-if="!isEditing">
                    <p> {{ userName ? userName : "등록된 이름이 없습니다." }}</p>
                  </v-text-field>
                  <v-text-field v-else
                                v-model="userName"
                                label="이름을 입력해주세요"
                                variant="outlined"
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <p class="text-field" style="font-size: 20px; font-weight: bold; color: #2D2D2D">연락처</p>
                  <v-text-field
                      variant="outlined"
                      readonly
                      disabled
                      v-if="!isEditing">
                    <p> {{ authStore.user.phoneNumber ? authStore.user.phoneNumber : '등록된 연락처가 없습니다.' }}</p>
                  </v-text-field>
                  <v-text-field
                      v-else
                      v-model="phoneNumber"
                      label="연락처를 등록해주세요"
                      variant="outlined"
                  >

                  </v-text-field>
                  <v-btn
                      v-if="isEditing"
                      @click="myPageInfoUpdate"
                  >
                    수정완료하기
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-col>

        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>


<style scoped>
@media screen and (max-width: 768px) {
  .profile-btn {
    margin-left: 20px;
  }
}

</style>
