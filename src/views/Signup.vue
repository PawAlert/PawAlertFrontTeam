<script setup>

import {useRouter} from 'vue-router';
import {ref, defineEmits} from 'vue';

const router = useRouter();
const emit = defineEmits(['next-step'])

// 사용자 클릭 시 호출되는 메서드
const goToNextStep = (type) => {
  // type은 선택된 회원가입 유형을 나타냅니다.
  emit('next-step', type);
};

</script>

<template>
  <v-container fluid class="d-flex align-center justify-center fill-height">
    <v-row class="justify-center">

      <v-row class="justify-lg-space-between mt-12">
        <!--        1번카드 -->
        <v-col cols="12" sm="12" md="10" lg="4" class="d-flex justify-center">
          <v-card class="card card-1">
            <v-img class="imges"
                   :width="300"
                   height="266"
                   src="@/assets/images/signup-logo-1.png"
            >
            </v-img>
            <v-col class="d-flex flex-column">
              <v-typography class="text-1">동물병원 / 보호센터 회원가입</v-typography>
              <v-typography class="text-2">빠른 인증을 통해 동물 예방정보,
                보호활동을 공유할 수 있습니다
              </v-typography>
              <v-btn class="ma-auto btn" @click="goToNextStep('official')"
                     style="background-color: #00813E; color: #FFFFFF; font-size: 20px">
                관계자 회원가입
              </v-btn>
            </v-col>
          </v-card>
        </v-col>

        <!--        2번 카드-->
        <v-col cols="12" sm="12" md="10" lg="4" class="d-flex justify-center">
          <v-card class="card card-2">
            <v-img class="imges"
                   :width="300"
                   height="266"
                   src="@/assets/images/signup-logo-2.png"
            >
            </v-img>
            <v-col class="d-flex  flex-column">
              <v-typography class="text-1">일반회원가입</v-typography>
              <v-typography class="text-2">반려동물의 실종글 작성 및
                각종 봉사활동과 관련정보를 확인할 수 있습니다.
              </v-typography>
              <v-btn @click="goToNextStep('general')" class="ma-auto btn"
                     style="background-color: #096A9D; color: #FFFFFF; font-size: 20px">
                일반 회원가입
              </v-btn>
            </v-col>
          </v-card>
        </v-col>
        <!--        3번카드-->

        <v-col cols="12" sm="12" md="10" lg="4" class="d-flex justify-center">
          <v-card class="card card-3">
            <v-list>
              <v-list-item>
                간편 로그인 선택시 완료후 메인화면으로 이동됩니다.
              </v-list-item>
              <v-list-item style="font-weight: bold; font-size: 30px">
                간편 로그인
              </v-list-item>
              <v-col class="d-flex">
                <v-list-item class="flex-column ma-auto">
                  <v-img
                      :width="326"
                      height="180"
                      src="@/assets/images/group-kakaogoogle.png"
                  ></v-img>
                </v-list-item>
              </v-col>
              <v-list-item>
                <v-btn class="btn social" style="background-color: #5E8FD9; color: #FFFFFF; font-size: 20px">
                  간편 회원가입/로그인
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

.card {
  width: 404px;
  height: 550px;
  text-align: center;

}

.card-1 {
  border-radius: 10px;
  border: 2px solid #5DA070;
}

.card-2 {
  border-radius: 10px;
  border: 2px solid #096A9D;
}

.card-3 {
  border-radius: 10px;
  border: 2px solid grey;

}

.imges {
  margin: auto;
}

.btn {
  width: 305px;
  height: 54px;
}

.text-1 {
  font-size: 30px;
  margin-top: 25px;
  margin-bottom: 30px;
  font-weight: bold;
}

.text-2 {
  margin-bottom: 20px;
}

.social {
  margin-top: 120px;
}


</style>
