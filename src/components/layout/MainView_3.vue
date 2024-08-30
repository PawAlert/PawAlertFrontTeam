<template>
  <v-col class="maincol" cols="12">
    <v-row align="center" justify="center">
      <!-- 첫 번째 카드 -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="card">
          <v-card-item>
            <v-img
                :width="85"
                :height="85"
                aspect-ratio="16/9"
                src="@/assets/images/Illustration.png"
            ></v-img>
            <p class="p-tag bold">사랑으로 키울 가족을 찾습니다.</p>
            <p class="p-tag margintop">따뜻한 가슴으로 기다리고 있는</p>
            <p class="p-tag">아이들에게 사랑을 전해주세요.</p>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 두 번째 카드 -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="card">
          <v-card-item>
            <v-img
                :width="85"
                :height="85"
                aspect-ratio="16/9"
                src="@/assets/images/ball.png"
            ></v-img>
            <p class="p-tag bold">사랑으로 키울 가족을 찾습니다.</p>
            <p class="p-tag margintop">따뜻한 가슴으로 기다리고 있는</p>
            <p class="p-tag">아이들에게 사랑을 전해주세요.</p>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 세 번째 카드 -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="card">
          <v-card-item>
            <v-img
                :width="85"
                :height="85"
                aspect-ratio="16/9"
                src="@/assets/images/medical.png"
            ></v-img>
            <p class="p-tag bold">사랑으로 키울 가족을 찾습니다.</p>
            <p class="p-tag margintop">따뜻한 가슴으로 기다리고 있는</p>
            <p class="p-tag">아이들에게 사랑을 전해주세요.</p>
          </v-card-item>
        </v-card>
      </v-col>

      <!-- 네 번째 카드 -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="card">
          <v-card-item>
            <v-img
                :width="85"
                :height="85"
                aspect-ratio="16/9"
                src="@/assets/images/scissors.png"
            ></v-img>
            <p class="p-tag bold">사랑으로 키울 가족을 찾습니다.</p>
            <p class="p-tag margintop">따뜻한 가슴으로 기다리고 있는</p>
            <p class="p-tag">아이들에게 사랑을 전해주세요.</p>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<style lang="scss" scoped>
  .maincol {
    background-color: #FFFFFF;
  }

  .card {
    height: 268px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border: none; /* 테두리 제거 */
    box-shadow: none; /* 그림자 제거 */

  }

  .v-img {
    margin: 0 auto;
  }

  .p-tag {
    color: $text-color;
  }

  .bold {
    font-weight: 700;
  }

  .margintop {
    margin-top: 10px;
  }

</style>
<script setup lang="ts">
</script>