<script setup>
import {onMounted, ref} from "vue";
import {useMyPageStore} from "@/store/modules/mypage/mypageInfo";
import {useMissingStore} from "@/store/modules/missing";
import router from "@/router/router";

const userStore = useMyPageStore();
const missingStore = useMissingStore();

onMounted(() => {
  userStore.fetchMyPosts();
})

const viewClick = ref(false);


const viewClickEvent = async (id) => {
  // todo : 상세 페이지 글 가져오기
  await missingStore.detailView(id);
  viewClick.value = !viewClick.value;
  console.log(missingStore.detailViewData);

}


const loading = ref(false)


const reserve = async () => {
  await router.push({name: 'DetailView', params: {id: missingStore.detailViewData.missingReportId}})
}
</script>


<template>


  <div v-if="userStore.status === 'myImageLoading'">로딩 중...</div>
  <div v-else-if="userStore.status === 'myPostsError'">에러 발생: {{ userStore.error }}</div>

  <v-container v-if="userStore.posts" fluid>
    <v-col class="top-item">
      <v-row>
        <v-col>
          <v-row>
            <!--            왼쪽 카드 아이템 list -->
            <v-col class="left-item"
                   style="background-color: #EED6D6;
                    width: 100%;
                    height: 100%">

              <v-col v-for="(post, index) in userStore.posts" :key="userStore.posts.length">
                <v-card color="#1F7087">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="text-h5">
                        {{ post.title }}
                      </v-card-title>

                      <v-card-subtitle>
                        {{ post.content }}
                      </v-card-subtitle>

                      <v-card-text>
                        {{ post.address }} - {{ post.addressDetail }}
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                            @click="viewClickEvent(post.missingReportId)"
                            class="ms-2"
                            size="small"
                            text="상세보기"
                            variant="outlined"
                        ></v-btn>
                      </v-card-actions>
                    </div>

                    <v-avatar
                        class="ma-3"
                        rounded="0"
                        size="125"
                    >
                      <v-img :src="post.petImageUrls"></v-img>
                    </v-avatar>
                  </div>
                </v-card>


              </v-col>

            </v-col>
          </v-row>
        </v-col>

        <!--        클릭시 상세 정보 보여지는 부분-->
        <v-col>
          <v-row>
            <v-col class="right-item"
                   v-if="viewClick"
                   style="background-color: #EED6D6;
                   width: 100%;
                    height: 100%">
              <v-card
                  :disabled="loading"
                  :loading="loading"
                  class="mx-auto my-12"
                  max-width="374"
              >
                <template v-slot:loader="{ isActive }">
                  <v-progress-linear
                      :active="isActive"
                      color="deep-purple"
                      height="4"
                      indeterminate
                  ></v-progress-linear>
                </template>
                <v-img v-if="missingStore.detailViewData"
                       height="250"
                       :src="missingStore.detailViewData.missingPetImages[0].imageUrl"
                       cover
                ></v-img>
                <v-card-item v-if="missingStore.detailViewData">
                  <v-card-title>{{ missingStore.detailViewData.title }}</v-card-title>

                  <v-card-subtitle>
                    <span class="me-1">{{ missingStore.detailViewData.contact1 }}</span>
                    <br>
                    <span class="me-1">{{ missingStore.detailViewData.contact2 }}</span>

                    <v-icon
                        color="error"
                        icon="mdi-fire-circle"
                        size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <!--                  <v-row-->
                  <!--                      align="center"-->
                  <!--                      class="mx-0"-->
                  <!--                  >-->
                  <!--                    <v-rating-->
                  <!--                        :model-value="4.5"-->
                  <!--                        color="amber"-->
                  <!--                        density="compact"-->
                  <!--                        size="small"-->
                  <!--                        half-increments-->
                  <!--                        readonly-->
                  <!--                    ></v-rating>-->

                  <!--                    <div class="text-grey ms-4">-->
                  <!--                      4.5 (413)-->
                  <!--                    </div>-->
                  <!--                  </v-row>-->

                  <div v-if="missingStore.detailViewData" class="my-4 text-subtitle-1">
                    <!--                    $ • Italian, Cafe-->
                    {{ missingStore.detailViewData.content }}
                  </div>

                  <div v-if="missingStore.detailViewData">
                    {{ missingStore.detailViewData.description }}
                  </div>
                </v-card-text>

                <v-divider class="mx-4 mb-1"></v-divider>

                <v-card-title>반려동물 정보</v-card-title>
                <v-col v-if="missingStore.detailViewData">
                  <v-row>
                    <v-card-text>
                      <p style="font-size: 20px">이름</p>
                      {{ missingStore.detailViewData.petName }}
                    </v-card-text>

                    <v-card-text>
                      <p style="font-size: 20px">나이</p>
                      {{ missingStore.detailViewData.age }}
                    </v-card-text>

                    <v-card-text>
                      <p style="font-size: 20px">성별</p>
                      {{ missingStore.detailViewData.gender }}
                    </v-card-text>
                  </v-row>

                  <v-col class="pet-box" cols="12">
                    <p style="font-size: 20px">반려동물 설명</p>
                    <v-col class="petDis">
                      {{ missingStore.detailViewData.petDescription }}

                    </v-col>

                  </v-col>
                </v-col>

                <v-card-actions>
                  <v-btn
                      color="deep-purple-lighten-2"
                      text="게시글 보러가기"
                      block
                      border
                      @click="reserve"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-col>

  </v-container>

</template>

<style scoped>

.top-item {
  border: 1px solid black;
  border-radius: 20px;
  height: 100%;
}

.left-item {
  border-radius: 20px;
}

.right-item {
  border-radius: 20px;
}

.petDis {
  justify-content: center;
  text-align: center;
  border: 1px solid #808080;
}

.pet-box {
  justify-content: center;
  text-align: center;
}
</style>