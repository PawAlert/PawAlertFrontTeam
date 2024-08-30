<template>
  <v-container class="maincol" fluid>
    <v-row align="center" justify="center">
      <!-- 첫 번째 카드 -->
      <v-col cols="12" md="2" class="text-center text-1">
        <v-card class="card">
          <v-card-item>
            <!-- 첫 번째 이미지의 크기 조절 -->
            <v-img
                class="img-nestle"
                src="@/assets/images/Nestle.png"
            ></v-img>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 두 번째 카드 -->
      <v-col cols="12" md="2" class="text-center">
        <v-card class="card">
          <v-card-item>
            <!-- 두 번째 이미지의 크기 조절 -->
            <v-img
                class="img-apple"
                src="@/assets/images/Apple_logo_black 1.png"
            ></v-img>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 세 번째 카드 -->
      <v-col cols="12" md="2" class="text-center">
        <v-card class="card">
          <v-card-item>
            <!-- 세 번째 이미지의 크기 조절 -->
            <v-img
                class="img-walmart"
                src="@/assets/images/Walmart_logo 2.png"
            ></v-img>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 네 번째 카드 -->
      <v-col cols="12" md="2" class="text-center">
        <v-card class="card">
          <v-card-item>
            <!-- 네 번째 이미지의 크기 조절 -->
            <v-img
                class="img-google"
                src="@/assets/images/Google.png"
            ></v-img>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 다섯 번째 카드 -->
      <v-col cols="12" md="2" class="text-center">
        <v-card class="card">
          <v-card-item>
            <!-- 다섯 번째 이미지의 크기 조절 -->
            <v-img
                class="img-beco"
                src="@/assets/images/Beco.png"
            ></v-img>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>

  .maincol {
    background-color: #FFFFFF;
    margin-top: 20px;
  }

  .card {
    display: flex;
    justify-content: center; /* 이미지 가로 중앙 정렬 */
    align-items: center; /* 이미지 세로 중앙 정렬 */
    width: 120px; /* 카드 너비 */
    height: 268px; /* 카드 높이 */
    margin: 10px;
    border: none; /* 테두리 제거 */
    box-shadow: none; /* 그림자 제거 */
  }

  /* 각 이미지별 크기 조정 */
  .img-nestle {
    width: 120px; /* 첫 번째 이미지의 너비 */
    height: 35px; /* 첫 번째 이미지의 높이 */
  }

  .img-apple {
    width: 30px; /* 두 번째 이미지의 너비 */
    height: 35px; /* 두 번째 이미지의 높이 */
  }

  .img-walmart {
    width: 119px; /* 세 번째 이미지의 너비 */
    height: 35px; /* 세 번째 이미지의 높이 */
  }

  .img-google {
    width: 105px; /* 네 번째 이미지의 너비 */
    height: 100px; /* 네 번째 이미지의 높이 */
  }

  .img-beco {
    width: 60px; /* 다섯 번째 이미지의 너비 */
    height: 40px; /* 다섯 번째 이미지의 높이 */
  }
</style>

<script setup lang="ts">
</script>
