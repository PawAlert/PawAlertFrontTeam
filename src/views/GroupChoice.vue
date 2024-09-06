<script setup>

import router from "@/router/router";
</script>

<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-row class="justify-center">



      <!-- Cards -->
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" sm="6" md="4" class="d-flex justify-center mb-8 mt-5">
          <v-card style="background-color: #BCCBFF" class="card d-flex flex-column align-center justify-center">
            <v-img width="250" height="200" src="@/assets/images/hospi-image.png"></v-img>
            <v-col class="d-flex justify-center mt-4">
              <v-btn style="font-size: 15px; font-weight: bold; border: 1px solid #BCCBFF" @click="router.push({name : 'SignupHospital'})">

              동물병원 등록하기
              </v-btn>
            </v-col>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="d-flex justify-center mb-8 mt-5">
          <v-card style="background-color: #B4FC92" class="card d-flex flex-column align-center justify-center">
            <v-img width="220" height="200" src="@/assets/images/shelter-img.png"></v-img>
            <v-col class="d-flex justify-center mt-4">
              <v-btn style="font-size: 15px; font-weight: bold; border: 1px solid #B4FC92" @click="router.push({name: 'SignupShelter'})">
                보호센터 등록하기
              </v-btn>
            </v-col>
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
  display: flex;
  justify-content: center; /* 이미지 가로 중앙 정렬 */
  align-items: center; /* 이미지 세로 중앙 정렬 */
  width: 410px; /* 카드 너비 */
  height: 500px; /* 카드 높이 */
}

</style>