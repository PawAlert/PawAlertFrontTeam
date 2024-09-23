
<script setup>
import {useMissingStore} from '@/store/modules/missing';
import {storeToRefs} from 'pinia';
import {ref, computed, onMounted} from 'vue';
import router from "@/router/router";
import {useAuthStore} from "@/store/modules/auth";

// 데이터 가져오기
const missingStore = useMissingStore();
const {content, totalElements, currentPage, totalPages, status, error} = storeToRefs(missingStore);

// 검색 필드 상태
const items1 = ref('최신순');  // 최신순 또는 오래된순
const items2 = ref('MISSING'); // 실종 상태 (MISSING, FOUND, RESOLVED)
const itemListValue1 = ['최신순', '오래된순'];
const itemListValue2 = ['MISSING', 'FOUND', 'RESOLVED', '전체'];

const authStore = useAuthStore();

const checkUser = async () => {
  const user = await authStore.checkAuth();

  if (authStore.status === 'success') {
    await router.push({ name: 'MissingPostCreate' });
  } else {
    alert('로그인이 필요합니다.');
    await router.push({ name: 'Login' });
  }
};

const viewDetail = (getId) => {
  router.push({ name: 'DetailView', params: { id: getId } });
};

// 데이터가 마운트될 때 가져오기
onMounted(() => {
  missingStore.fetchPosts({ address: '', addressDetail1: '', status: '' });
});

// 필터링 및 정렬된 데이터
const filteredPosts = computed(() => {
  // 상태 필터링
  let filtered = content.value.filter(post => {
    return items2.value === '전체' || post.missingStatus === items2.value;
  });

  // 날짜 정렬
  if (items1.value === '최신순') {
    filtered.sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost)); // 최신순
  } else {
    filtered.sort((a, b) => new Date(a.dateLost) - new Date(b.dateLost)); // 오래된순
  }

  return filtered;
});

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

// 설명을 90자로 줄이고 ... 추가하는 함수
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// 실종 상태 텍스트
const getStatusText = (status) => {
  switch (status) {
    case 'MISSING':
      return '실종일';
    case 'FOUND':
      return '발견일';
    case 'RESOLVED':
      return '임보일';
    default:
      return '실종일';
  }
};

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
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-col>
              <p style="font-size: 11px; color: #808080">반려동물 찾아요</p>
              <p class="mt-3" style="font-size: 25px; font-weight: bold">게시글 보기</p>
            </v-col>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="align-content-space-between">
          <!-- 두 개의 v-select를 한 그룹으로 배치 -->
          <v-col cols="auto" class="d-flex">
            <v-select
                v-model="items1"
                :items="itemListValue1"
                label="최신순"
                class="select-box"
                style="width: 150px"
            ></v-select>
            <v-select
                v-model="items2"
                :items="itemListValue2"
                label="실종 상태"
                class="select-box"
                style="width: 150px; margin-left: 10px;"
            ></v-select>
          </v-col>

          <!-- 버튼을 오른쪽 끝으로 -->
          <v-col cols="auto">
            <v-btn @click="checkUser">글쓰러가기</v-btn>
          </v-col>
        </v-row>

        <!-- 로딩 상태 표시 -->
        <v-alert type="info" v-if="status === 'loading'">로딩 중...</v-alert>
        <v-alert type="error" v-else-if="status === 'error'">오류: {{ error }}</v-alert>

        <!-- 게시글 목록 -->
        <v-row v-else>
          <v-col @click="viewDetail(post.missingReportId)"
                 v-for="post in filteredPosts"
                 :key="post.missingReportId"
                 cols="12"
                 md="6"
                 class="d-flex justify-center"
          >
            <!-- 전체 카드 크기 조절 -->
            <v-card
                class="d-flex flex-column align-center justify-center my-2 post-card card-item"
                :style="{ width: '700px', height: '250px' }"
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
                  <v-container class="pa-0">
                    <v-row justify="center" align="center">
                      <v-col cols="12" class="post-text">
                        <!-- 제목 -->
                        <v-list-item-title class="font-weight-bold mb-1" style="font-size: 20px;">
                          {{ post.title }}
                        </v-list-item-title>

                        <!-- 설명 -->
                        <v-row class="text-items">
                          <v-list-item-subtitle class="mt-3" style="width: 97%; font-size: 15px; color: #514949;">
                            {{ truncateText(post.content, 90) }}
                          </v-list-item-subtitle>

                          <!-- 구분선 -->
                          <v-divider class="custom-divider"></v-divider>

                          <v-alert-title style="font-weight: bold; color: #2D2D2D; font-size: 20px; margin-top: 5px">
                            발견 장소
                          </v-alert-title>

                          <v-list-item-subtitle class="date-text">
                            {{ post.address }} - {{ post.addressDetail }}
                          </v-list-item-subtitle>

                          <v-alert-title style="font-weight: bold; color: #2D2D2D; font-size: 20px; margin-top: 10px">
                            {{ getStatusText(post.missingStatus) }}
                          </v-alert-title>
                          <v-list-item-subtitle class="date-text mt-1" style="font-size: 0.9rem; color: #666;">
                            {{ formatDate(post.dateLost) }}
                          </v-list-item-subtitle>
                        </v-row>

                        <!-- 상태 뱃지 -->
                        <div class="custom-badge-container">
                          <div class="custom-badge" :style="{ backgroundColor: getBadgeColor(post.missingStatus) }">
                            {{ getBadgeText(post.missingStatus) }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- 페이지네이션 -->
<!--        <v-row justify="center" class="mt-4">-->
<!--          <v-btn @click="prevPage" :disabled="currentPage === 0">이전</v-btn>-->
<!--          <span class="mx-4">페이지 {{ currentPage + 1 }} / {{ totalPages }}</span>-->
<!--          <v-btn @click="nextPage" :disabled="currentPage >= totalPages - 1">다음</v-btn>-->
<!--        </v-row>-->
      </v-col>
    </v-row>
  </v-container>
</template>


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
  font-size: 0.75rem;
  background-color: #0D47A1;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: auto;
}

.post-text {
  margin-top: 1px;
}

.date-text {
  margin: 0 auto;
  width: 100%;
  color: #2D2D2D;
  font-size: 15px;
}

.card-item {
  border-radius: 25px;
  overflow: hidden;
}

.text-items {
  margin-left: 2px;
}

.des-add {
  margin-left: -15px;
}

.custom-badge {
  font-size: 0.75rem;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 5px 15px;
  width: auto;
  height: auto;
}

.custom-badge-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 10px;
  width: 100%;
}

.custom-divider {
  border-top: 1px solid #808080;
  margin-top: 15px;
}
</style>
