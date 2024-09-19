<template>
  <v-container fluid class="black-background">
    <!-- 파란색 배경 -->
    <div class="blue-background">
      <v-col>
        <v-row style="margin-left: 20px; margin-top: 70px;">
          <p style="font-size: 10px; color: #808080;">실종글 / 게시글 정보</p>
<!--          <p style="font-size: 50px; font-weight: bold; color: black">{{ store.detailViewData.title }}</p>-->
          <v-btn>
            수정
          </v-btn>
          <v-btn>
            수정
          </v-btn>

        </v-row>
      </v-col>


      <!-- 로딩 중일 때 메시지 -->
      <div v-if="store.status === 'loading'">로딩 중...</div>
      <div v-else-if="store.status === 'error'">에러 발생: {{ store.error }}</div>

      <div>상태 : {{ store.status }}</div>
      <!-- 상세 정보 출력 -->
      <div>나이 : {{ store.detailViewData.age}}</div>

    </div>
  </v-container>
</template>

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

<style scoped>
.black-background {
  background-color: #CFCBCB; /* 검정색 배경 */
  width: 100%;
  min-height: 100vh; /* 화면 전체 높이를 최소 높이로 설정 */
  position: relative; /* 자식 요소의 기준 */
  display: flex;

}

.blue-background {
  background-color: #FCFBF6; /* 파란색 배경 */
  width: 97.5%; /* 파란색 배경의 너비 */
  max-width: 100%; /* 최대 너비 제한 */
  min-height: 95vh; /* 파란색 배경의 최소 높이 */
  position: relative; /* 부모 요소 기준으로 절대 위치 */
  margin: auto;
  overflow: hidden; /* 화면을 벗어나는 요소 숨김 */
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
}

.title-text {
  font-size: 20px;
  color: #222222;
}

.address-field {
  width: 500px;
}

</style>