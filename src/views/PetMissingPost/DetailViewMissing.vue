<script setup>
import {useMissingStore} from "@/store/modules/missing";
import {useAuthStore} from "@/store/modules/auth";
import {onMounted, ref} from "vue";
import {KakaoMap, KakaoMapMarker} from "vue3-kakao-maps";

// Pinia Store 가져오기
const store = useMissingStore();
const userStore = useAuthStore();

// Props로 ID 값 받기 (부모 컴포넌트에서 전달)
const props = defineProps(['id']);
const comment = ref('');

onMounted(() => {
  store.detailView(props.id);  // 가져온 id 값을 넘겨서 API 호출
  store.commentListResponse(props.id);  // 댓글 목록 가져오기

});


const commentCreate = async () => {
  const getToken = localStorage.getItem('token');
  if(!getToken){
    alert('댓글을 작성하려면 로그인이 필요합니다.');
    comment.value='';
    return;
  }
  const data = {
    comment: comment.value,
    postId: store.detailViewData.missingReportId
  };

  try {
    // 댓글 작성 API 호출 (서버로 댓글 전송)
    await store.commentMissingReport(data);

    // 댓글 작성 후, 서버에서 최신 댓글 목록 다시 가져오기
    await store.commentListResponse(props.id);

    // 댓글 입력 필드 초기화
    comment.value = '';
  } catch (error) {
    console.error("댓글 작성 오류:", error);
  }
};



</script>

<template>

  <v-container fluid class="black-background">
    <!-- 파란색 배경 -->
    <div v-if="store.status === 'loading'">로딩 중...</div>
    <div v-else-if="store.status === 'error'">에러 발생: {{ store.error }}</div>


    <v-col v-else-if="store.status === 'success'">
      <!--상단 이미지와 수정/취소 보이는 부분-->
      <v-col style="margin-left: 20px;">
        <p style="font-size: 10px; color: #808080;">실종글 / 게시글 정보</p>

        <v-row class="align-center mr-3" justify="space-between">
          <p style="margin-left: 4px;
              font-size: 50px;
              font-weight: bold;
              color: black">{{ store.detailViewData.title }} </p>

          <v-btn-group v-if="store.detailViewData.isMine">
            <v-btn style="background-color: #AEF1B1">수정</v-btn>
            <v-btn style="background-color: #F4F1F1">삭제</v-btn>
          </v-btn-group>
        </v-row>

        <!-- 상세 정보 출력 -->
        <v-col>


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

      <!--pet 정보 보여주는 부분-->
      <v-row style="width: 1180px; margin-left: 10px" class="mt-12">
        <v-row style="border: 1px solid rgba(222,222,222,0.53);">
          <v-card style="margin-bottom: 10px; margin-left: 5px; margin-top: 5px">
            <!-- 반려동물 이미지 + 텍스트 정보 -->
            <v-img
                :src="store.detailViewData.missingPetImages[0].imageUrl"
                :width="416"
                corver
                height="auto"
            ></v-img>
            <v-col cols="12">
              <p>제 반려동물 이름은 <span style="color: #7B61FF; font-weight: bold">{{
                  store.detailViewData.petName
                }} </span>
                입니다.
              </p>
              <p>나이는
                <span style="color: #94ED74; font-weight: bold">
              {{ store.detailViewData.age }}  세
            </span>
                입니다.
              </p>
              <p>
            <span style="font-weight: bold;">
                   연락처1:
            </span>
                <span>
            {{ store.detailViewData.contact1 }}
            </span>
              </p>
              <p>
            <span style="font-weight: bold;">
                 연락처2:
            </span>
                <span>
              연락처2: {{ store.detailViewData.contact2 }}
            </span>
              </p>
              <p style="color: #808080; font-size: 12px;
                   margin-top: 15px;
">
                많은 관심을 가져주세요</p>
            </v-col>
          </v-card>

          <v-col style="height: 700px;">

            <v-toolbar-title class="text-title mt-2">품종</v-toolbar-title>
            <div class="text-field-sty">
              {{ store.detailViewData.petSpecies }}
            </div>

            <v-toolbar-title class="text-title">사라진 날짜</v-toolbar-title>
            <div class="text-field-sty">
              {{ store.detailViewData.dateLost }} 일
            </div>

            <v-toolbar-title class="text-title">실종 위치</v-toolbar-title>
            <div class="text-field-sty">
              {{ store.detailViewData.location.address }}
            </div>
            <div class="text-field-sty">
              {{ store.detailViewData.location.addressDetail }}
            </div>
            <v-toolbar-title class="text-title">마이크로칩 ID</v-toolbar-title>
            <div class="text-field-sty">
              {{ store.detailViewData.microchipId }}
            </div>

            <v-toolbar-title class="text-title">반려동물 설명</v-toolbar-title>
            <div class="text-field-textarea">
              {{ store.detailViewData.petDescription }}
            </div>
          </v-col>
        </v-row>
      </v-row>
      <!--실종 정보-->
      <v-col class="missing-detail">
        <div style="color: #333333; font-size: 30px; font-weight: bold">실종 정보</div>
        <v-row>
          <!--실종 당시 상세 정보-->
          <v-col>
            <div class="missing-detail-text">
              <span>
                  {{ store.detailViewData.description }}
              </span>
            </div>
          </v-col>
          <!--카카오 지도 로드-->
          <v-col>
            <div class="missing-detail-map">

              <!-- 테스트용 KakaoMap 컴포넌트 -->
              <KakaoMap :lat="Number(store.detailViewData.location.latitude)"
                        :lng="Number(store.detailViewData.location.longitude)" :draggable="true">
                <KakaoMapMarker :lat="Number(store.detailViewData.location.latitude)"
                                :lng="Number(store.detailViewData.location.longitude)"></KakaoMapMarker>
              </KakaoMap>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="store.detailViewData.comments != ''">
        <v-col v-for="comment in store.commentList">
          <!--         <p>작성자 이미지</p>-->
          <p>{{ comment.userId }}</p>
          <div v-if="comment.isCommentMine">
            <p>{{ comment.content }}</p>
          </div>
          <div v-else>
            <p>비공개 댓글입니다.</p>
          </div>
          <p>{{ comment.timestamp }}</p>
        </v-col>
      </v-col>
      <v-col v-else>
        <div>댓글이 없습니다.</div>
      </v-col>
      <v-text-field
          label="댓글을 작성해주세요"
          v-model="comment"
      ></v-text-field>
      <v-btn @click="commentCreate">
        댓글 작성하기
      </v-btn>
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

.text-field-sty {
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #DDDDDD;
  font-size: 16px;
  width: 96%;
}

.text-title {
  font-size: 20px;
  color: #888888;
}

.text-field-textarea {
  margin-bottom: 5px;
  border: 1px solid #DDDDDD;
  width: 96%;
  height: 150px;
}

.missing-detail {
  margin-top: 30px;
  width: 100%;
  height: 600px;
}

.missing-detail-text {
  border: 1px solid rgba(0, 0, 0, 0.09);
  width: 480px;
  height: 480px;
  border-radius: 10px;
}

.missing-detail-text span {
  margin-top: 10px; /* 위쪽 여백 */
  margin-left: 10px;
  display: inline-block; /* margin이 적용되도록 inline-block 사용 */
}


KakaoMap {
  width: 100%; /* 지도의 너비를 부모 요소에 맞춤 */
  height: 100%; /* 지도의 높이 설정 */
  border-radius: 50px;

}
</style>