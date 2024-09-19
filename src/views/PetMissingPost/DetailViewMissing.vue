<script setup>
import {useMissingStore} from "@/store/modules/missing";
import {onMounted} from "vue";

onMounted(() => {
  store.detailView(props.id);  // 가져온 id 값을 넘겨서 API 호출

});
// Props로 ID 값 받기 (부모 컴포넌트에서 전달)
const props = defineProps(['id']);

// Pinia Store 가져오기
const store = useMissingStore();


</script>

<template>
  <v-container fluid class="black-background">
    <!-- 파란색 배경 -->

    <v-col>
      <v-col style="margin-left: 20px;">
        <p style="font-size: 10px; color: #808080;">실종글 / 게시글 정보</p>
        <v-row class="align-center mr-3" justify="space-between">
          <p style="margin-left: 4px;
              font-size: 50px;
              font-weight: bold;
              color: black">{{ store.detailViewData.title }} </p>

          <v-btn-group>
            <v-btn style="background-color: #AEF1B1">수정</v-btn>
            <v-btn style="background-color: #F4F1F1">삭제</v-btn>
          </v-btn-group>
        </v-row>

        <!-- 상세 정보 출력 -->
        <v-col>
          <div v-if="store.status === 'loading'">로딩 중...</div>
          <div v-else-if="store.status === 'error'">에러 발생: {{ store.error }}</div>

          <!-- 이미지 출력 -->
          <v-row class="mt-7 d-flex" justify="space-between">
            <v-col
                v-for="image in store.detailViewData.missingPetImages"
                :key="image.petId"
                cols="8"
                lg="4"
                class="d-flex justify-center"
            >
              <v-img
                  class="image-list"
                  :src="image.imageUrl"
                  :width="300"
                  height="300px"
                  cover
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
      <v-divider></v-divider>
      <v-card class="card-sty mt-12">
        <!-- 반려동물 이미지 + 텍스트 정보 -->
        <v-row>
          <v-col>
            <!-- 이미지가 상단에 위치 -->
            <v-img
                class="mt-5 ml-5"
                :src="store.detailViewData.missingPetImages[0].imageUrl"
                :width="416"
                corver
                height="auto"
            ></v-img>
          </v-col>

        </v-row>
        <v-col class="ml-5">
          <p>제 반려동물 이름은 <span style="color: #0D47A1">{{ store.detailViewData.petName }} </span> 입니다.</p>
          <p>나이는 {{ store.detailViewData.age }}세에요</p>
          <p>연락처1:{{store.detailViewData }}</p>
          <p>연락처2: 222-222-222</p>
        </v-col>
      </v-card>
    </v-col>

  </v-container>
</template>

<style scoped>
.black-background {
  background-color: #FCFBF6; /* 검정색 배경 */
  width: 100%;
  min-height: 100vh; /* 화면 전체 높이를 최소 높이로 설정 */
  position: relative; /* 자식 요소의 기준 */
  display: flex;

}

.image-list {
  margin-right: 20px;
  justify-content: space-between;
  border-radius: 20px;
}

.card-sty {
  margin: 0 auto;
  width: 1090px;
  background-color: #5DA070;
}
</style>