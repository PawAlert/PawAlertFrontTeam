<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Header -->
        <v-row align="center" class="mb-4">
          <v-col class="text-center">
            <h1>실종 신고 목록</h1>
          </v-col>
          <v-btn @click="router.push({name: 'MissingCreate'})">글쓰러가기</v-btn>
        </v-row>

        <!-- 검색 필드 -->
        <v-card class="pa-3 mb-4 mt-2">
          <v-row>
            <!-- 지역 선택 드롭다운 -->
            <v-col cols="12" md="4">
              <v-select
                  v-model="address"
                  :items="addressOptions"
                  label="지역 선택"
                  outlined
                  dense
                  clearable
              />
            </v-col>

            <!-- 상세 주소 입력 -->
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="addressDetail1"
                  label="상세 주소"
                  outlined
                  dense
                  clearable
              />
            </v-col>

            <!-- 상태 선택 드롭다운 -->
            <v-col cols="12" md="3">
              <v-select
                  v-model="statusFilter"
                  :items="statusOptions"
                  label="상태 선택"
                  outlined
                  dense
                  clearable
              />
            </v-col>

            <!-- 검색 버튼 -->
            <v-col cols="12" md="1">
              <v-btn color="primary" @click="search">검색</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <!-- 로딩 상태 표시 -->
        <v-alert type="info" v-if="status === 'loading'">로딩 중...</v-alert>
        <v-alert type="error" v-else-if="status === 'error'">오류: {{ error }}</v-alert>

        <!-- 게시글 목록 -->
        <v-row v-else>
          <v-col
              v-for="post in content"
              :key="post.missingReportId"
              cols="12"
              md="6"
              class="d-flex justify-center"
          >
            <v-card
                class="d-flex flex-column align-center justify-center my-2 post-card card-item"
                :style="{ width: '515px', height: '200px' }"
            >
              <v-row class="rowimage">
                <!-- 이미지와 상태 -->
                <v-col cols="4" class="d-flex align-center justify-center">
                  <v-img
                      :src="post.petImageUrls"
                      width="100%"
                      height="100%"
                      cover
                      class="rounded"
                  ></v-img>
                </v-col>

                <!-- 게시글 내용 -->
                <v-col cols="8" class="position-relative">


                  <!-- 수평 및 수직 중앙 정렬 -->
                  <v-container class="pa-0">
                    <v-row justify="center" align="center">
                      <v-col cols="12" class="post-text">
                        <v-list-item-title class="font-weight-bold mb-1" style="font-size: 1rem;">
                          {{ post.title }}
                        </v-list-item-title>

                        <!-- 가로로 나란히 배치 -->
                        <v-row class="text-items">

                          <!-- Description (40자 이상일 경우 줄임) -->
                          <v-list-item-subtitle class="mt-3" style="font-size: 0.9rem; color: #888;">
                            {{ truncateText(post.content, 40) }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="address-text mt-3" style="font-size: 0.9rem; color: #888;">
                            {{ post.address }} - {{ post.addressDetail1 }}
                          </v-list-item-subtitle>

                          <v-list-item-subtitle class="date-text mt-3" style="font-size: 0.9rem; color: #666;">
                            {{ formatDate(post.dateLost) }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle style="font-size: 0.9rem; color: #666;" class="mt-3">
                            포상금액 {{ post.rewardAmount }} 원
                          </v-list-item-subtitle>
                        </v-row>

                      </v-col>

                    </v-row>

                  </v-container>

                </v-col>

              </v-row>
              <!-- 상태 뱃지 -->
              <v-badge
                  :color="getBadgeColor(post.missingStatus)"
                  class="status-badge"
                  :content="getBadgeText(post.missingStatus)"
                  style="font-size: 0.75rem; right: 80px;"
              ></v-badge>
            </v-card>
            <!-- 상태 뱃지 -->

          </v-col>

        </v-row>

        <!-- 페이지네이션 -->
        <v-row justify="center" class="mt-4">
          <v-btn @click="prevPage" :disabled="currentPage === 0">이전</v-btn>
          <span class="mx-4">페이지 {{ currentPage + 1 }} / {{ totalPages }}</span>
          <v-btn @click="nextPage" :disabled="currentPage >= totalPages - 1">다음</v-btn>
        </v-row>

      </v-col>

    </v-row>

  </v-container>
</template>


<script setup>
import {useMissingStore} from '@/store/modules/missing';
import {storeToRefs} from 'pinia';
import {ref, onMounted} from 'vue';
import router from "@/router/router";

const missingStore = useMissingStore();
const {content, totalElements, currentPage, totalPages, status, error} = storeToRefs(missingStore);

// 검색 필드 상태
const address = ref('');
const addressDetail1 = ref('');
const statusFilter = ref(''); // 기본 상태는 '전체'

// 기본 이미지 URL 설정
const defaultImageUrl =
    'https://fastly.picsum.photos/id/701/300/300.jpg?hmac=I01SYsoRBR6HATSI9xSORt0XIUpz5E5wFpkr02_Ps7A'; // 외부 URL에서 기본 이미지를 가져옵니다.

// 한국의 행정구역 목록
const addressOptions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도'
];

// 상태 옵션 목록
const statusOptions = ['전체', 'MISSING', 'FOUND', 'RESOLVED'];

// 컴포넌트가 마운트될 때 초기 데이터 가져오기
onMounted(() => {
  missingStore.fetchPosts({address: '', addressDetail1: '', status: ''});
});

// 검색 함수
const search = () => {
  const status = statusFilter.value === '전체' ? '' : statusFilter.value;

  missingStore.fetchPosts({
    address: address.value,
    addressDetail1: addressDetail1.value,
    status
  });
};

// 페이지네이션 함수
const prevPage = () => {
  missingStore.prevPage();
};

const nextPage = () => {
  missingStore.nextPage();
};

// 날짜 형식을 가독성 있게 변환
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 설명을 40자로 줄이고 ... 추가하는 함수
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// 뱃지 색상 설정
const getBadgeColor = (status) => {
  switch (status) {
    case 'MISSING':
      return 'red';
    case 'FOUND':
      return 'green';
    case 'RESOLVED':
      return 'blue';
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


<style scoped>
.mx-4 {
  margin-left: 16px;
  margin-right: 16px;
}

.rounded {
  border-radius: 8px;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}

.my-2 {
  margin-top: 8px;
  margin-bottom: 8px;
}

.position-relative {
  position: relative;
}

.status-badge {
  position: absolute;
  top: 150px;
  font-weight: bold;
  font-size: 0.85rem;
}

.post-text {
  margin-top: 5%;
}

.date-text {
  margin: 0 auto;
  width: 100%;
}

.address-text {
  display: inline-block;
}

.card-item {
  border-radius: 25px;
  overflow: hidden; /* 이미지가 카드 범위를 넘지 않도록 */
}

.text-items {
  margin-left: 2px;
}

.des-add {
  margin-left: -15px;
}

.rowimage {width: 100%;
}
</style>

