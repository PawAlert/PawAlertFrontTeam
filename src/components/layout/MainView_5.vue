<template>
  <v-container class="main-view-1" fluid>
    <v-row class="main-view-1-title" no-gutters>
      <!-- 왼쪽 텍스트 영역 -->
      <v-col cols="12" md="6" class="text-left">
        <h1 class="h1_text">Let’s talk,</h1>
        <h1 class="h1_text">woof!</h1>
        <p class="p-text">Let’s talk, woof!</p>
        <p class="p-text">You can ask us questions about your pet,</p>
        <p class="p-text">and we will be happy to answer you!</p>
        <v-btn class="contact-btn">Contact us</v-btn>
      </v-col>

      <!-- 오른쪽 이미지 영역 -->
      <v-col cols="12" md="6" class="text-right">
        <v-img
            class="image"
            contain
            src="@/assets/images/main_dog_2.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .main-view-1 {
    height: auto;
    padding: 20px;
    background-color: #424242;
  }

  .main-view-1-title {
    height: 100%;
    align-items: center;
    margin-right: 0px;
  }

  .text-left {
    text-align: left;
    color: #ffffff;
  }

  .h1_text {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 20px;
    color: #ffffff;
  }

  .p-text {
    margin-left: 20px;
    color: #D8D8D8;
  }

  .contact-btn {
    width: 203px;
    height: 64px;
    color: #2D2D2D;
    margin-top: 30px;
    background-color: #F8D57E;
    margin-left: 20px;
  }

  .image {
    width: 100%;
    height: auto;
    max-width: 475px;
    max-height: 360px;
  }

  /* 반응형 스타일링 */
  @media (max-width: 960px) {
    .h1_text, .p-text {
      font-size: 1.8rem;
      margin-left: 10px;
    }

    .contact-btn {
      width: 180px;
      height: 56px;
      margin-left: 10px;
    }

    .image {
      max-width: 100%;
      max-height: 300px;
    }
  }

  @media (max-width: 600px) {
    .h1_text {
      font-size: 1.5rem;
    }

    .p-text {
      font-size: 1rem;
      margin-left: 5px;
    }

    .contact-btn {
      width: 160px;
      height: 48px;
      margin-left: 5px;
    }

    .image {
      max-width: 90%;
      max-height: 250px;
    }

    .text-left, .text-right {
      text-align: center;
    }
  }
</style>

<script setup lang="ts"></script>
