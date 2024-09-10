<script setup>

import router from "@/router/router";
import {useCertificationStore} from "@/store/modules/hospital/certification";
import {ref} from 'vue';

const store = useCertificationStore();

const emit = defineEmits(['certification-step']);

const dataShelter = ref({
  shelterName: "",
  jurisdiction: ""
})

const submit = async () => {
  const data = {
    shelterName: dataShelter.value.shelterName,
    jurisdiction: dataShelter.value.jurisdiction
  };

  try {
    const response = await store.fetchCertificationShelter(data);
    if (response.status === 200) {
      console.log("data = ", data)
      alert("인증이 완료되었습니다.")
      emit('certification-step', 'shelter', data);
    } else {
      alert("인증에 실패하였습니다.")
    }
  } catch (e) {
    console.error('요청 중 예외 발생:', e);
  }
}


</script>

<template>

  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-col class="mt-15 ml-16 d-flex flex-column">
      <v-col class="d-flex">
        <v-img :width="50" height="50" src="@/assets/images/paw 2.png"></v-img>
        <v-typography style="margin-left: 10px; font-size: 20px; width: 100%; font-weight: bold" class="mt-3">인증하기
        </v-typography>
      </v-col>

      <v-form @submit.prevent="submit">
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-row class="d-flex justify-center align-center">
            <!-- 보호센터 이름 -->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column align-center mb-4">
              <v-typography style="font-size: 18px; font-weight: bold;">보호센터 이름</v-typography>
              <v-text-field
                  v-model="dataShelter.shelterName"
                  class="custom-text-field"
                  placeholder="보호센터 이름을 입력해주세요"
              ></v-text-field>
            </v-col>

            <!-- 인허가번호 -->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column align-center mb-4">
              <v-typography style="font-size: 18px; font-weight: bold;">관할구역</v-typography>
              <v-text-field
                  v-model="dataShelter.jurisdiction"
                  class="custom-text-field"
                  placeholder="관할구역을 입력해주세요."
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column align-center mb-4">
              <v-btn @click="submit"
                     style="width: 260px; height: 50px; background-color: #00813E; color: #FFFFFF; border-radius: 10px; ">
                인증하기
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-form>
    </v-col>

  </v-container>


</template>

<style scoped>
.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

.custom-text-field {
  width: 400px !important; /* 텍스트 필드의 너비를 320px로 설정 */
  height: 60px !important; /* 텍스트 필드의 높이를 60px로 설정 */
  margin-top: 20px;
  background-color: #FFFFFF;
  max-width: 100%; /* 반응형을 위해 최대 너비를 100%로 설정 */
}

.mb-4 {
  margin-bottom: 16px; /* 하단 여백을 추가하여 각 항목 사이의 간격을 조정 */
}

</style>