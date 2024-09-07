<script setup>
import {defineProps, onMounted, ref} from 'vue';
import router from "@/router/router";

const props = defineProps({
  hospitalData: {
    type: Object,
    default: () => ({}), // 데이터 기본값 설정
  },
});

const hospitalName = ref();
const licenseNumber = ref('');

onMounted(() => {
  hospitalName.value = props.hospitalData.hospitalName;
  licenseNumber.value = props.hospitalData.licenseNumber;
});

const addressData = ref({
  postcode: "",
  address: "",
  extraAddress: "",
  detailAddress: "",
  latitude: 0,
  longitude: 0,
});

const execDaumPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let extraAddr = "";
      let addr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = `(${extraAddr})`;
        }
      }

      addressData.value.postcode = data.zonecode;
      addressData.value.address = addr;
      addressData.value.extraAddress = extraAddr;
    },
  }).open();
};

</script>

<template>
  <v-container fluid class="fill-height d-flex">
    <v-col class="mt-15 d-flex flex-column">
      <v-col class="d-flex">
        <v-img :width="50" height="50" src="@/assets/images/paw 2.png"></v-img>
        <v-typography style="margin-left: 10px; font-size: 20px; width: 100%; font-weight: bold" class="mt-3">인증하기
        </v-typography>
      </v-col>
      <v-col cols="12" class="d-flex flex-column">
        <v-row class="d-flex flex-column">
          <!-- 동물병원 이름 -->
          <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
            <v-typography style="font-size: 18px; font-weight: bold;">동물병원 이름</v-typography>
            <v-text-field
                style="color: #333333; border: 1px solid #D7D7D7; background-color: #EDEDED; width: 400px; height: 50px; border-radius: 10px"
                class="custom-text-field"
                v-model="hospitalName"
                disabled
            ></v-text-field>
          </v-col>

          <!-- 인허가번호 -->
          <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
            <v-typography style="font-size: 18px; font-weight: bold;">인허가 번호</v-typography>
            <v-text-field
                style="color: #333333; border: 1px solid #D7D7D7; background-color: #EDEDED; width: 400px; height: 50px; border-radius: 10px"
                v-model="licenseNumber"
                disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
            <v-typography style="font-size: 18px; font-weight: bold;">이메일</v-typography>
            <v-text-field
                variant="outlined"
                style="background-color: #FFFFFF; border: 1px solid #FFFFFF; width: 400px; height: 50px;"
                placeholder="이메일을 입력해주세요"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
            <v-typography style="font-size: 18px; font-weight: bold;">연락처</v-typography>
            <v-text-field
                variant="outlined"
                style="background-color: #FFFFFF; border: 1px solid #FFFFFF; width: 400px; height: 50px;"
                placeholder="병원 연락처를 입력해주세요"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="mt-2 address-section">
            <v-typography style="font-size: 18px; font-weight: bold;">병원 위치</v-typography>
            <v-btn class="ml-16" @click="execDaumPostcode">우편번호 찾기</v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column address-field">
            <v-text-field
                v-model="addressData.postcode"
                label="우편번호"
                readonly
                placeholder="우편번호"
                dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column address-field">
            <v-text-field
                v-model="addressData.address"
                label="주소"
                dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column address-field">
            <v-text-field
                v-model="addressData.detailAddress"
                label="상세주소"
                placeholder="상세주소"
                dense
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="5" class="d-flex flex-column">
            <v-btn style="width: 260px; height: 50px; background-color: #00813E; color: #FFFFFF; border-radius: 10px;">
              인증하기
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<style scoped>
.fill-height {
  font-family: 'Noto Sans KR', sans-serif;
  height: 100vh; /* 뷰포트 높이에 맞춤 */
}

</style>