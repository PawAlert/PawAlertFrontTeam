<template>
  <v-container class="main-view-1" fluid>
    <v-row class="main-view-1-title" no-gutters>
      <!-- 왼쪽 텍스트 영역 -->
      <v-col cols="12" md="6" class="text-left">
        <h1 class="h1_text">PawAlert
        </h1>
        <h1 class="h1_text">
          과 함께 해요
        </h1>
        <p class="p-text">동물의 종류, 특징, 실종된 장소 및 시간, 연락처 등을</p>
        <p class="p-text">구체적으로 기재하여 더 많은 사람들이 정보를 공유하고 찾을 수 있도록</p>
        <p class="p-text">도와주세요.</p>

      </v-col>

      <!-- 오른쪽 이미지 영역 -->
      <v-img
          width="25%"
          height="%"
          cover
          src="@/assets/images/main_dog_image.png"
      ></v-img>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .main-view-1 {
    height: 600px;
  }

  .main-view-1-title {
    height: 460px;
    align-items: center;
  }

  .text-left {
    padding: 20px;
    text-align: left;
    color: #ffffff; /* 텍스트 색상 */
  }

  .text-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .h1_text {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 100px;
    color: $text-color;
  }

  .p-text {
    margin-left: 100px;
    color: $grey-color;
  }
</style>
<script setup lang="ts">
</script>