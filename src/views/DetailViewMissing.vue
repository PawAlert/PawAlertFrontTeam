<script setup>
import {useMissingStore} from '@/store/modules/missing';
import {onMounted, ref, computed} from 'vue';
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';

const props = defineProps(['id']);
const missingStore = useMissingStore();

const isLoading = ref(true);

const commentData = ref({
  content: '',
});

const submitComment = (id) => {
  const comment = commentData.value.content;
  console.log(id)

  // commentMissingReport 메서드 호출
  missingStore.commentMissingReport(id, comment);
};

onMounted(async () => {
  try {
    await missingStore.detailView(props.id);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

const response = computed(() => missingStore.detail);


</script>

<template>
  <v-container class="d-flex flex-column">
    <v-col v-if="isLoading">
      <p>데이터를 불러오는 중...</p>
    </v-col>

    <v-col v-else-if="response && response.data">
      <v-card>
        <v-btn v-if="response.data?.isMine">
          삭제하기
        </v-btn>
        <v-btn v-if="response.data?.isMine">
          수정하기
        </v-btn>

        <v-card-title>
          게시글 ID: {{ response.data.missingReportId }}
        </v-card-title>

        <v-card-title>
          제목: {{ response.data.title }}
        </v-card-title>

        <v-card-text>
          상세 설명: {{ response.data.content }}
        </v-card-text>
        <v-card-subtitle>
          잃어버린 날짜: {{ response.data.dateLost }}
        </v-card-subtitle>
        <v-card-text>
          주소: {{ response.data.location.address }}
        </v-card-text>
        <v-card-text>
          상세주소: {{ response.data.location.addressDetail1 || '상세주소 없음' }}
        </v-card-text>
        <v-card-text>
          위도: {{ response.data.location.latitude }}
          경도: {{ response.data.location.longitude }}
        </v-card-text>
        <!-- KakaoMap 컴포넌트 수정 -->
        <KakaoMap :lat="response.data.location.latitude" :lng="response.data.location.longitude" :draggable="true">
          <KakaoMapMarker :lat="response.data.location.latitude"
                          :lng="response.data.location.longitude"></KakaoMapMarker>
        </KakaoMap>
        <v-card-text>
          마이크로칩 : {{ response.data.microchipId }}
        </v-card-text>
        <v-card-text>
          이미지 :
          <v-img v-for="image in response.data.missingPetImages"
                 :src="image.imageUrl"
                 :key="image.id"
                 width="300"
                 height="300"></v-img>
        </v-card-text>
        <v-card-text>
          <!--          todo : 실종상태 서버에서 받는 값을 변경하기-->
          실종상태 : 실종
        </v-card-text>
        <v-card-text>
          펫 관련 설명 : {{ response.data.petDescription }}
        </v-card-text>
        <v-card-text>
          펫 이름 : {{ response.data.petName }}

        </v-card-text>
        <v-card-text>
          펫 나이 : {{ response.data.age }}
        </v-card-text>
        <v-card-text>
          펫 성별 : {{ response.data.gender }}
        </v-card-text>
        <v-card-text>
          사례금 : {{ Number(response.data.reward) }}
        </v-card-text>
        <v-card-text>
          사례금 지급 상태 : {{ response.data.rewardStatus }}
        </v-card-text>
      </v-card>
      <v-card-text v-if="response.data.comments.length > 0">
        <v-list>
          <v-list-item v-for="comment in response.data.comments" :key="comment.id">
            <v-list-item-title>
              {{ comment.content.length > 0 ? comment.content : '댓글이 없습니다.' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              작성일 : {{ new Date(comment.timestamp).toLocaleString() }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-else>
        <p>댓글이 없습니다.</p>
      </v-card-text>
      <v-text-field
          v-model="commentData.content"
          placeholder="댓글을 작성해주세요"
      />
      <v-btn @click="submitComment(response.data.missingReportId)">
        댓글 작성
      </v-btn>
    </v-col>


    <v-col v-else>
      <p>데이터를 불러오지 못했습니다.</p>
    </v-col>
  </v-container>
</template>