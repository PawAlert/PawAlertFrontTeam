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
          <v-btn @click="checkUser">글쓰러가기</v-btn>
        </v-row>

        <v-row>
          <v-col cols="auto">
            <v-select
                v-model="items1"
                :items="itemListValue1"
                label="최신순"
                class="select-box"
                style="width: 150px"></v-select>
          </v-col>
          <v-col cols="auto">
            <v-select
                v-model="items2"
                :items="itemListValue2"
                label="실종 상태"
                class="select-box"

                style="width: 150px"></v-select>
          </v-col>
        </v-row>

        <!-- 로딩 상태 표시 -->
        <v-alert type="info" v-if="status === 'loading'">로딩 중...</v-alert>
        <v-alert type="error" v-else-if="status === 'error'">오류: {{ error }}</v-alert>

        <!-- 게시글 목록 -->
        <v-row v-else>
          <v-col @click="viewDetail(post.missingReportId)"
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
import {useAuthStore} from "@/store/modules/auth";

const missingStore = useMissingStore();
const {content, totalElements, currentPage, totalPages, status, error} = storeToRefs(missingStore);

// 검색 필드 상태
const address = ref('');
const addressDetail1 = ref('');
const statusFilter = ref(''); // 기본 상태는 '전체'
const items1 = ref('최신순');
const items2 = ref('MISSING');

const itemListValue1 = ['최신순', '오래된순']
const itemListValue2 = ['MISSING', 'FOUND', 'RESOLVED']

const authStore = useAuthStore();

const checkUser = async () => {
  const user = await authStore.checkAuth();
  console.log("user = ", user)
  if (user) {
    console.log("user OK");
    await router.push({
      name: 'MissingPostCreate'
    });
  } else {
    alert('로그인이 필요합니다.');
    await router.push({name: 'Login'});

  }
};

const viewDetail = (getId) => {
  router.push({name: 'DetailView', params: {id: getId}});
};


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

.rowimage {
  width: 100%;
}

.select-box{

}

</style>

