<template>
  <v-container>
    <v-form @submit.prevent="submitMissingReport">
      <!-- 기본 정보 입력 -->
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model="missingReportData.title"
              label="제목"
              required
          ></v-text-field>

          <v-textarea
              v-model="missingReportData.description"
              label="상세 내용을 입력해주세요"
              required
          ></v-textarea>

          <v-textarea
              v-model="missingReportData.content"
              label="실종 당시 상세 설명"
              required
          ></v-textarea>

          <!-- 날짜 선택 -->
          <v-text-field
              prepend-icon="mdi-calendar"
              readonly
              @click="showDatePicker = true"
              :value="formattedDate"
              placeholder="날짜를 선택해주세요"
          ></v-text-field>

          <!-- Date Picker Dialog -->
          <v-dialog v-model="showDatePicker" width="400px">
            <v-card>
              <v-card-title class="headline grey lighten-2">날짜 선택</v-card-title>
              <v-date-picker
                  v-model="selectedDate"
                  @update:model-value="updateDate"
              ></v-date-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="showDatePicker = false">취소</v-btn>
                <v-btn text @click="updateDate">확인</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <!-- 반려동물 정보 카드 -->
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card>
            <v-row>
              <!-- 이미지 업로드 영역 -->
              <v-col cols="4">
                <div class="image-upload-container" @click="triggerFileInput">
                  <v-img
                      v-if="imageFiles.length > 0"
                      :src="getImageUrl(imageFiles[0])"
                      width="100%"
                      height="100%"
                      cover
                  ></v-img>
                  <div v-else class="placeholder">
                    <v-icon size="100" class="imageupload" color="grey">mdi-camera</v-icon>
                  </div>
                </div>
              </v-col>

              <!-- 반려동물 정보 입력 폼 -->
              <v-col cols="8">
                <v-card-text>
                  <v-text-field
                      v-model="missingReportData.petName"
                      label="반려동물 이름"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="missingReportData.species"
                      label="품종"
                      placeholder="강아지, 고양이 등"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="missingReportData.petColor"
                      label="색상"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="missingReportData.age"
                      label="나이"
                      type="number"
                      min="0"
                  ></v-text-field>
                  <v-select
                      v-model="missingReportData.petGender"
                      :items="['Male', 'Female']"
                      label="성별"
                  ></v-select>
                  <v-text-field
                      v-model="missingReportData.microchipId"
                      label="마이크로칩 ID">
                  </v-text-field>
                  <v-textarea
                      v-model="missingReportData.petDescription"
                      label="반려동물 설명"
                      placeholder="저희 강아지는 사람을 잘 따르는 편이에요."
                  ></v-textarea>
                  <v-text-field
                      v-model="missingReportData.rewardAmount"
                      label="보상금"
                      type="number"
                      min="0">
                  </v-text-field>
                  <v-text-field
                      v-model="missingReportData.rewardDescription"
                      label="보상금 설명"
                      placeholder="발견시 보상금 지급"
                  ></v-text-field>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- 이미지 업로드 영역 -->
      <v-row class="mt-4">
        <v-col cols="12" class="d-flex align-center">
          <!-- 업로드 아이콘 -->
          <div class="upload-icon-container mr-4" @click="triggerFileInput">
            <v-icon size="80" color="grey">mdi-camera</v-icon>
            <span class="upload-text">사진 추가</span>
          </div>

          <!-- 업로드된 이미지 목록 -->
          <div class="d-flex flex-wrap iconupload">
            <div
                v-for="(file, index) in imageFiles"
                :key="index"
                class="ma-2"
            >
              <v-img
                  :src="getImageUrl(file)"
                  width="100"
                  height="100"
                  cover
                  class="rounded"
              ></v-img>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 주소 입력 컴포넌트 -->
      <div>
        <!-- 우편번호 및 주소 입력 필드 -->
        <v-text-field
            v-model="addressData.postcode"
            label="우편번호"
            readonly
            placeholder="우편번호"
        ></v-text-field>
        <v-btn @click="execDaumPostcode">우편번호 찾기</v-btn>

        <v-text-field
            v-model="addressData.address"
            label="주소"
            readonly
            placeholder="주소"
        ></v-text-field>

        <v-text-field
            v-model="addressData.extraAddress"
            label="참고항목"
            readonly
            placeholder="참고항목"
        ></v-text-field>

        <v-text-field
            v-model="addressData.detailAddress"
            label="상세주소"
            placeholder="상세주소"
        ></v-text-field>
      </div>

      <!-- 숨겨진 파일 입력 -->
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          style="display: none"
          @change="handleImageUpload"
      />
      <v-btn
          color="primary"
          @click="submitMissingReport"
      >
        제출하기
      </v-btn>
    </v-form>

  </v-container>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {useMissingStore} from "@/store/modules/missing";
import {createMissingReportRequest} from "@/api/api_missing";

const missingStore = useMissingStore();

const missingReportData = ref({
  title: "",
  description: "",
  status: "MISSING",
  content: "",
  dateLost: null,
  latitude: 37.497951,
  longitude: 127.027618,
  microchipId: "",
  petName: "",
  species: "",
  petColor: "",
  age: 0,
  petGender: "",
  petDescription: "",
  rewardAmount: 0,
  rewardDescription: "",
  addressDetail1: "",
});

const addressData = ref({
  postcode: "",
  address: "",
  extraAddress: "",
  detailAddress: "",
});

const imageFiles = ref([]);
const showDatePicker = ref(false);
const selectedDate = ref(null);

onMounted(() => {
  if (!window.daum || !window.daum.Postcode) {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => console.log("Daum Postcode API 스크립트 로드 완료");
    document.head.appendChild(script);
  }
});

// 카카오 지도 API 스크립트 로드
onMounted(() => {
  if (!window.daum || !window.daum.Postcode) {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => console.log("Daum Postcode API 스크립트 로드 완료");
    document.head.appendChild(script);
  }

  // 카카오 지도 API 스크립트 로드
  const kakaoScript = document.createElement("script");
  kakaoScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services`;
  kakaoScript.onload = () => console.log("Kakao Maps API 스크립트 로드 완료");
  document.head.appendChild(kakaoScript);
});

// 주소 변경 시 좌표 업데이트
watch(addressData, (newAddressData) => {
  console.log("주소 변경 감지:", newAddressData); // 주소 변경 감지 로그
  missingReportData.value.address = `${newAddressData.address} ${newAddressData.extraAddress}`;
  missingReportData.value.addressDetail1 = newAddressData.detailAddress;

  if (newAddressData.address) {
    // 주소로 좌표를 얻기 위해 Kakao 지도 API의 Geocoder 사용
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(newAddressData.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const {x, y} = result[0];
        missingReportData.value.longitude = parseFloat(x); // 경도 업데이트
        missingReportData.value.latitude = parseFloat(y);  // 위도 업데이트
        console.log("좌표 업데이트 성공:", {latitude: y, longitude: x}); // 좌표 업데이트 성공 로그
      }
    });
  }
}, {deep: true});
watch(addressData, (newAddressData) => {
  missingReportData.value.address = `${newAddressData.address} ${newAddressData.extraAddress}`;
  missingReportData.value.addressDetail1 = newAddressData.detailAddress;
}, {deep: true});

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const handleImageUpload = (e) => {
  imageFiles.value = Array.from(e.target.files);
};

const updateDate = () => {
  if (selectedDate.value) {
    missingReportData.value.dateLost = new Date(selectedDate.value);
  }
  showDatePicker.value = false;
};


const getImageUrl = (file) => {
  return file ? URL.createObjectURL(file) : '';
};

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

// 제출버튼
const submitMissingReport = async () => {
  if (!missingReportData.value.title || !missingReportData.value.description) {
    alert('제목과 상세 내용은 필수 입력 사항입니다.');
    return;
  }

  try {
    // 서버로 전송할 데이터 구성
    const payload = {
      ...missingReportData.value,
      ...addressData.value,
    };

    // API 요청 호출
    const response = await missingStore.createMissingReport(payload, imageFiles.value);
    console.log('서버 응답:', response);
    alert('신고가 성공적으로 제출되었습니다.');
  } catch (error) {
    console.error('서버로 데이터 전송 중 오류 발생:', error.message);
    alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

</script>

<style scoped>
.mt-2 {
  margin-top: 8px;
}

.mt-4 {
  margin-top: 16px;
}

.image-upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
  position: relative;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.upload-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
}

.upload-text {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}

#map {
  width: 100%;
  height: 400px;
}
</style>