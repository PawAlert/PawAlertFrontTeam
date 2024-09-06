<template>
  <v-container fluid class="fill-height">
    <v-row>
      <!--  약관동의 첫번쨰-->
      <v-col class="mt-16 d-flex">
        <v-row class="d-flex">
          <v-col cols="auto">
            <v-img
                :width="50"
                height="50"
                src="@/assets/images/paw 2.png">
            </v-img>
          </v-col>
          <v-col>
            <v-typography style="font-size: 25px; font-weight: bold">회원가입 약관동의</v-typography>
          </v-col>
        </v-row>
      </v-col>
      <!--약관동의 첫번째 스크롤-->
      <v-col class="mt-5" cols="12">
        <v-card style="width: 100%; height: 200px" max-height="400"
                class=" d-flex align-center justify-center mt-5 scroll-card">
          <v-card-text>
            <div>
              {{ termsContent }}
            </div>
          </v-card-text>
        </v-card>
        <v-row class="mt-5">
          <v-checkbox v-model="check1"></v-checkbox>
          <v-typography class="mt-4" style="font-weight: bold; font-size: 15px; color: #333333; ">회원가입 약관에 동의합니다.
          </v-typography>
        </v-row>
      </v-col>

      <!--  약관동의 두번째-->
      <v-col class="mt-5 d-flex">
        <v-row class="d-flex">
          <v-col cols="auto">
            <v-img
                :width="50"
                height="50"
                src="@/assets/images/paw 2.png">
            </v-img>
          </v-col>
          <v-col>
            <v-typography style="font-size: 25px; font-weight: bold">고유식별정보 수집 및 이용안내</v-typography>
          </v-col>
        </v-row>
      </v-col>
      <!--약관동의 두번째 스크롤-->
      <v-col cols="12">
        <v-card style="width: 100%; height: 200px" max-height="400" class="scroll-card">
          <v-card-text>
            <div>
              {{ termsContent }}
            </div>
          </v-card-text>
        </v-card>
        <v-row class="mt-2">
          <v-checkbox v-model="check2"></v-checkbox>
          <v-typography class="mt-4" style="font-weight: bold; font-size: 15px; color: #333333; ">고유식별정보 수집 및 이용안내 약관에
            동의합니다.
          </v-typography>
        </v-row>
      </v-col>

      <!--세번째 약관동의-->
      <v-col class="mt-5 d-flex">
        <v-row class="d-flex">
          <v-col cols="auto">
            <v-img
                :width="50"
                height="50"
                src="@/assets/images/paw 2.png">
            </v-img>
          </v-col>
          <v-col>
            <v-typography style="font-size: 25px; font-weight: bold">개인정보 수집·이용 동의</v-typography>
            <v-typography style="color: #DB7D7D; font-size: 20px">[필수]</v-typography>
          </v-col>
        </v-row>
      </v-col>

      <!--세번째 약관동의 -->

      <v-col cols="12">
        <v-table style="width: 1280px">
          <thead>
          <tr>
            <th class="text-left">
              항목
            </th>
            <th class="text-left">
              수집·이용목적
            </th>
            <th class="text-left">
              보유·이용기간
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in items"
              :key="item.name"
          >
            <td>{{ item.항목 }}</td>
            <td>{{ item.이용목적 }}</td>
            <td>{{ item.이용기간 }}</td>
          </tr>
          </tbody>
        </v-table>
        <v-row class="mt-5">
          <v-checkbox v-model="check3"></v-checkbox>
          <v-typography class="mt-4" style="font-weight: bold; font-size: 15px; color: #333333; ">행정정보 공동 이용 동의에 동의합니다.
          </v-typography>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center mt-5">
      <v-col cols="auto mt-5" class="d-flex align-center justify-center">
        <v-checkbox @change="check(check4)" v-model="check4"></v-checkbox>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="auto">
        <v-typography style="font-weight: bold; font-size: 25px; color: #333333;">
          위 내용을 읽었으며 모두 동의합니다.
        </v-typography>
      </v-col>
    </v-row>
    <v-col class="d-flex align-center justify-center" v-if="!isNextStep" cols="12">
      <!-- 에러 메시지 -->
      <v-typography style="color: red; font-weight: bold; font-size: 20px; text-align: center;">
        모든 약관에 동의해야 다음 단계로 진행할 수 있습니다.
      </v-typography>

    </v-col>

    <v-col class="d-flex align-center justify-center mt-5" cols="12">
      <!-- 버튼 -->
      <v-btn
          @click="nextCheck"
          width="260px"
          height="54px"
          style="background-color: #00813E; color: white; font-size: 20px; margin-bottom: 16px;"
      >
        다음단계
      </v-btn>
    </v-col>

  </v-container>
</template>

<style scoped>
.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

.scroll-card {
  overflow-y: auto; /* 수직 스크롤 활성화 */
}

.text-left {
  font-size: 20px;
}

td {
  font-size: 15px;
}


</style>
<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['agreement-step']);

const check1 = ref(false);
const check2 = ref(false);
const check3 = ref(false);
const check4 = ref(false); // `check4` 초기화 추가

const check = (check4) => {
  if (check4) {
    check1.value = true;
    check2.value = true;
    check3.value = true;
  } else {
    check1.value = false;
    check2.value = false;
    check3.value = false;
  }
};

const isNextStep = ref(true);

const nextCheck = () => {
  if (check1.value && check2.value && check3.value) {
    isNextStep.value = true; // 모든 체크가 완료된 경우
    emit('agreement-step', true);
  } else {
    isNextStep.value = false; // 체크가 하나라도 안 되어 있는 경우
  }
};

// check1,2,3 이 전부 true 이면 자동으로 check4 도 true로 변경
watch([check1, check2, check3], ([newCheck1, newCheck2, newCheck3]) => {
  if (newCheck1 && newCheck2 && newCheck3) {
    check4.value = true;
  }
});



const items = [
  {
    항목: "이름, 아이디, 비밀번호, 핸드폰번호, 전화번호, 집주소, 연계정보(CI), 중복가입확인정보(DI)",
    이용목적: "등록대상동물의 변경신고 및 관리",
    이용기간: "2년 (회원탈퇴 시까지)"
  }
];


</script>