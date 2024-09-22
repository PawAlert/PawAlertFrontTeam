<script setup>
import {useMissingStore} from "@/store/modules/missing";
import {useAuthStore} from "@/store/modules/auth";
import {onMounted, ref, watch} from "vue";
import {KakaoMap, KakaoMapMarker} from "vue3-kakao-maps";

import {useRouter} from 'vue-router';

const router = useRouter();


// Pinia Store 가져오기
const store = useMissingStore();
const userStore = useAuthStore();
const isEditing = ref(false);
// Props로 ID 값 받기 (부모 컴포넌트에서 전달)
const props = defineProps(['id']);
const comment = ref('');
//
//  // 반려동물 설명
const title = ref('');
const petDescription = ref('');
const contact1 = ref('');
const contact2 = ref('');
const petSpecies = ref('');
const microchipId = ref('');
const description = ref('');
const missingReportId = ref('');
const missingStatus = ref('');

// onMounted에서 데이터를 불러온 후 업데이트
// onMounted(async () => {
//   await store.detailView(props.id);
//
//   console.log(store.status, "store.status");
//   if (store.status === "success") {
//     await store.commentListResponse(props.id);
//     console.log("댓글 호출")
//   }
//
//   // store.detailViewData가 업데이트되면 각 ref 값도 업데이트
//   title.value = store.detailViewData?.title || '';
//   petDescription.value = store.detailViewData?.petDescription || '';
//   contact1.value = store.detailViewData?.contact1 || '';
//   contact2.value = store.detailViewData?.contact2 || '';
//   petSpecies.value = store.detailViewData?.petSpecies || '';
//   microchipId.value = store.detailViewData?.microchipId || '';
//   description.value = store.detailViewData?.description || '';
//   missingReportId.value = store.detailViewData?.missingReportId || '';
//   missingStatus.value = store.detailViewData?.missingStatus || '';
// });

onMounted(() => {
  store.detailView(props.id);
});


// 수정하기 전송
const editingPostRequest = async () => {
  const data1 = {
    missingReportId: missingReportId.value,
    title: title.value,
    petDescription: petDescription.value,
    contact1: contact1.value,
    contact2: contact2.value,
    petSpecies: petSpecies.value,
    microchipId: microchipId.value,
    description: description.value,
    missingStatus: missingStatus.value
  }

  await store.updateMissingPost(data1);
  if (store.status === 'success') {
    isEditing.value = false;
  }
}
// status 변경 상태 확인
watch(missingStatus, (newValue) => {
  console.log(newValue)
})


const commentCreate = async () => {
  const getToken = localStorage.getItem('token');
  if (!getToken) {
    alert('댓글을 작성하려면 로그인이 필요합니다.');
    comment.value = '';
    return;
  }
  const data = {
    comment: comment.value,
    postId: store.detailViewData.missingReportId
  };
  try {
    // 댓글 작성 API 호출 (서버로 댓글 전송)
    await store.commentMissingReport(data);
    if (store.commentStatus === "success") {
      // 댓글 작성 후, 서버에서 최신 댓글 목록 다시 가져오기
      await store.commentListResponse(props.id);
      // 댓글 입력 필드 초기화
      comment.value = '';
    }
  } catch (error) {
    console.error("댓글 작성 오류:", error);
  }
};

const editing = () => {
  isEditing.value = !isEditing.value;
};

// 삭제 로직
const deleteClick = async () => {
  await store.deleteMissingPost(props.id);
  if (store.status === 'success') {
    await router.push({name: 'Missing'});
  } else if (store.status === 'error') {
    alert('삭제에 실패하였습니다. 다시 시도해주세요');
  }
}

// 뱃지 색상 설정
const getBadgeColor = (status) => {
  switch (status) {
    case 'MISSING':
      return '#ED7474';
    case 'FOUND':
      return '#94ED74';
    case 'RESOLVED':
      return '#DC74ED';
    default:
      return 'grey';
  }
};

// 뱃지 텍스트 설정
const getBadgeText = (status) => {
  switch (status) {
    case 'MISSING':
      return '실종';
    case 'FOUND':
      return '발견';
    case 'RESOLVED':
      return '해결';
    default:
      return '알 수 없음';
  }
};

</script>

<template>

  <v-container fluid class="black-background">

    <div v-if="store.status === 'loading'">로딩 중...</div>
    <div v-else-if="store.status === 'error'">에러 발생: {{ store.error }}</div>


    <v-col v-else-if="store.status === 'success'">
      <!--상단 이미지와 수정/취소 보이는 부분-->
      <v-col style="margin-left: 20px;">
        <p style="font-size: 10px; color: #808080;">실종글 / 게시글 정보</p>

        <v-row class="align-center mr-3" justify="space-between">
          <p v-if="!isEditing" style="margin-left: 4px;
              font-size: 50px;
              font-weight: bold;
              color: black">{{ store.detailViewData.title }} </p>

          <v-text-field v-else
                        style="margin-top: 15px;"
                        class="text-editing-style"
                        v-model="title">

          </v-text-field>

          <v-btn-group v-if="store.detailViewData.isMine">
            <v-btn v-if="!isEditing" @click="editing" style="background-color: #AEF1B1">수정</v-btn>
            <v-btn v-else @click="editing" style="background-color: #AEF1B1">취소</v-btn>
            <v-btn @click="deleteClick" v-if="!isEditing" style="background-color: #F4F1F1">삭제</v-btn>
            <v-btn @click="editingPostRequest" v-else style="background-color: #F4F1F1">완료하기</v-btn>
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
      <v-row style="width: 1180px; margin-left: 10px" class="mt-12 pet-detail">
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

              <!--              연락처1 -->
              <span
                  v-if="!isEditing">
                <p style="font-weight: bold;"> 연락처1:
                  <span style="font-weight: normal"> {{ store.detailViewData.contact1 }}
                  </span></p>
                <p>

                </p>
            </span>

              <span v-else>
             <p style="margin-top: 15px; color: #808080; font-weight: bold">
                연락처1 수정 :
              </p>
              <v-text-field
                  v-model="contact1"
              >
              </v-text-field>
            </span>

              <!--              연락처2-->
              <span
                  v-if="!isEditing">
                <p style="font-weight: bold;"> 연락처2:
                  <span style="font-weight: normal"> {{ store.detailViewData.contact2 }}
                  </span>
                </p>

            </span>

              <span v-else>
             <p style="margin-top: 15px; color: #808080; font-weight: bold">
                연락처2 수정 :
              </p>
              <v-text-field
                  v-model="contact2"
              >
              </v-text-field>
            </span>
              <div>
                <div v-if="isEditing" class="custom-badge"
                     :style="{backgroundColor: getBadgeColor(store.detailViewData.missingStatus),
                     borderRadius: '50px',
                     width: '10%',
                     textAlign: 'center',
                }">
                  {{ getBadgeText(store.detailViewData.missingStatus) }}
                </div>
                <div v-if="isEditing">
                  <p
                      :style="{backgroundColor: getBadgeColor(store.detailViewData.missingStatus),
                     borderRadius: '50px',
                     width: '30%',
                  marginTop: '10px',
                  marginBottom:'10px',
                     textAlign: 'center',}">
                    {{ store.detailViewData.missingStatus }}</p>
                  <v-select
                      v-model="missingStatus"
                      label="상태변경"
                      :items="['MISSING', 'FOUND', 'RESOLVED']"
                  >


                  </v-select>
                </div>

              </div>

              <p style="color:
                    #808080;
                   font-size: 12px;
                   margin-top: 15px;">
                많은 관심을 가져주세요
              </p>
            </v-col>
          </v-card>

          <v-col class="pet-text-detail" cols="12" sm="6" style="height: 700px;">

            <v-toolbar-title class="text-title mt-2">품종</v-toolbar-title>
            <div v-if="!isEditing" class="text-field-sty">
              {{ store.detailViewData.petSpecies }}
            </div>
            <v-text-field v-else
                          class="text-editing-style"
                          v-model="petSpecies"
            >
            </v-text-field>


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
            <div v-if="!isEditing" class="text-field-sty">
              {{ store.detailViewData.microchipId }}
            </div>
            <v-text-field v-else
                          class="text-editing-style"
                          v-model="microchipId"
            >
            </v-text-field>

            <v-toolbar-title class="text-title">반려동물 설명</v-toolbar-title>
            <div v-if="!isEditing" class="text-field-textarea">
              {{ store.detailViewData.petDescription }}
            </div>
            <textarea rows="10" cols="50"
                      class="editing-pet-description"
                      v-else
                      v-model="petDescription"
            >
            </textarea>

          </v-col>
        </v-row>
      </v-row>
      <!--실종 정보-->
      <v-col class="missing-detail">
        <div style="color: #333333; font-size: 30px; font-weight: bold">실종 정보</div>
        <v-row>
          <!--실종 당시 상세 정보-->
          <v-col>
            <div v-if="!isEditing" class="missing-detail-text">
              <span>
                  {{ store.detailViewData.description }}
              </span>
            </div>
            <textarea rows="10" cols="50"
                      style="border: 1px solid green"
                      v-else
                      v-model="description"
            >
            </textarea>

          </v-col>
          <!--카카오 지도 로드-->
          <v-col class="missing-detail-map">
            <div>
              <!-- KakaoMap 컴포넌트 -->
              <KakaoMap :lat="Number(store.detailViewData.location.latitude)"
                        :lng="Number(store.detailViewData.location.longitude)" :draggable="true"
                        style="width: 550px"
              >
                <KakaoMapMarker :lat="Number(store.detailViewData.location.latitude)"
                                :lng="Number(store.detailViewData.location.longitude)"></KakaoMapMarker>
              </KakaoMap>
            </div>
          </v-col>
        </v-row>

        <v-col v-if="store.commentList != ''">
          <v-col class="comment-user" v-for="comment in store.commentList">
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
        <v-col class="comment-class" v-else>
          <div>작성된 댓글이 없습니다. 댓글을 남겨주세요</div>
        </v-col>
        <v-text-field
            label="댓글을 작성해주세요"
            v-model="comment"
        ></v-text-field>
        <v-btn class="comment-create" @click="commentCreate">
          댓글 작성하기
        </v-btn>
      </v-col>
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
  width: 100%;
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

.comment-class {
  margin-top: 50px;
  color: #2D2D2D;
  margin-bottom: 20px;
  font-size: 14px;
}

.comment-user {
  width: 1280px;
  height: 120px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid grey;
}

.comment-create {
  margin-top: 20px;
  background-color: #7B61FF;
  color: white;
  margin-left: 60%;
  width: 30%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 130px;
}

.editing-pet-description {
  width: 96%;
  height: 150px;
  border: 1px solid green;
}

@media screen and (max-width: 768px) {
  .text-field-sty {
    width: 400px
  }

  .text-field-textarea {
    width: 400px

  }

  .missing-detail-text {
    width: 400px;
  }

  .missing-detail-map {
    width: 100%; /* 부모 요소가 100% 너비를 가짐 */
    display: flex; /* 지도 컴포넌트를 제대로 배치하기 위해 flex 사용 */
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
  }

  .editing-pet-description {
    width: 35%;
  }

  .text-editing-style {
    width: 35%;
    height: 58px;
    border: 1px solid green;
  }


}
</style>