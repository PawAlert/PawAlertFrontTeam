<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();


</script>

<template>
  <v-container fluid class="d-flex align-center justify-center fill-height">
    <v-row class="justify-center">

      <v-col class="d-flex align-center justify-center top" cols="12" sm="12" md="12">
        <div class="d-flex">
          <v-img
              :width="50"
              height="50"
              src="@/assets/images/paw 2.png"
          >
          </v-img>
          <v-typography class="display-1">동물 실종 알림 시스템</v-typography>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center signup-1">
        <v-typography class="signup-2">회원가입</v-typography>
      </v-col>

      <v-img :width="1350"
             aspect-ratio="1/1"
             cover
             src="@/assets/images/signupSic.png">
      </v-img>
      <v-row class="justify-lg-space-between mt-12 card-sty">
        <!--        1번카드 -->
        <v-card class="card card-1">
          <v-img class="imges"
                 :width="300"
                 height="266"
                 src="@/assets/images/signup-logo-1.png"
          >
          </v-img>
          <v-col class="d-flex  flex-column">
            <v-typography class="text-1">동물병원 / 보호센터 회원가입</v-typography>
            <v-typography class="text-2">빠른 인증을 통해 동물 예방정보,
              보호활동을 공유할 수 있습니다
            </v-typography>
            <v-btn class="ma-auto btn" @click="router.push({ name: 'Official' })"  style="background-color: #00813E; color: #FFFFFF; font-size: 20px">
              관계자 회원가입
            </v-btn>
          </v-col>

        </v-card>
        <!--        2번 카드-->
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
            <v-btn class="ma-auto btn" style="background-color: #096A9D; color: #FFFFFF; font-size: 20px">
              일반 회원가입
            </v-btn>
          </v-col>

        </v-card>

        <!--        3번카드-->
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

      </v-row>
    </v-row>
  </v-container>
</template>

<style scoped>
.top {
  margin-top: 50px;
}

.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

.display-1 {
  margin-left: 10px;
  font-size: 30px;
}

.signup-1 {
  font-size: 30px;
}

.signup-2 {
  margin-top: 10px;
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
.card-3{
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
.social{
  margin-top: 120px;
}


</style>
