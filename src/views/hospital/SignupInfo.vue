<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";


const router = useRouter();

import {useAuthStore} from "@/store/modules/auth.js";

const userStore = useAuthStore();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const userName = ref('');
const show1 = ref(false)
const show2 = ref(true)

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
  passwordMatch: () => password.value === confirmPassword.value || '비밀번호가 일치하지 않습니다.',
}
const submit = async () => {
  const data = {
    email: email.value,
    password: password.value,
    userName: userName.value,
  };
  const response = await userStore.fetchUserSignup(data);
  if(response.status === 201) {
    await router.push({name: 'Login'});
  }
}

</script>
<script>
export default {
  data() {
    return {
      show1: false,
      show2: true,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
}

</script>
<template>
  <v-container fluid class="fill-height d-flex">
    <v-col class="d-flex flex-column">
      <v-col class="d-flex">
        <v-img :width="50" height="50" src="@/assets/images/paw 2.png"></v-img>
        <v-typography style="margin-left: 10px; font-size: 20px; width: 100%; font-weight: bold" class="mt-3">회원가입 완료하기
        </v-typography>
      </v-col>
      <v-col cols="12" class="d-flex flex-column">
        <v-row class="d-flex flex-column">
          <v-form @submit.prevent="submit">
            <!-- 유저 이름 -->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">사용자 이름</v-typography>
              <v-text-field
                  style="font-size: 18px; font-weight: bold;"
                  placeholder="사용자 이름을 입력해주세요"
                  class="custom-text-field"
                  v-model="userName"
              ></v-text-field>
            </v-col>
            <!--            이메일-->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">이메일</v-typography>
              <v-text-field
                  variant="outlined"
                  v-model="email"
                  style="background-color: #FFFFFF; border: 1px solid #FFFFFF; width: 400px; height: 50px;"
                  placeholder="로그인 이메일을 입력해주세요"
              ></v-text-field>
            </v-col>

            <!--패스워드-->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">패스워드</v-typography>
              <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="8자 이상 적어주세요"
                  name="input-10-1"
                  counter
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>

            <!--            패스워드 확인-->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">패스워드 확인</v-typography>
              <v-text-field
                  v-model="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.passwordMatch]"
                  :type="show2 ? 'text' : 'password'"
                  hint="8자 이상 적어주세요"
                  name="input-10-1"
                  counter
                  @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-form>
          <v-col cols="12" sm="6" md="5" class="d-flex flex-column align-center mb-4">
            <v-btn @click="submit"
                   style="width: 260px; height: 50px; background-color: #00813E; color: #FFFFFF; border-radius: 10px; ">
              인증하기
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<style scoped>
.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

.address-field-t {
  margin-left: -10px;
}

.address-field {
  margin-top: -20px;
}
</style>