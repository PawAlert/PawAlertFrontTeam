<script setup>
import {ref, onMounted, watch} from 'vue';
import {useMissingStore} from "@/store/modules/missing";
import {createMissingReportRequest} from "@/api/api_missing";

const missingStore = useMissingStore();
const previewImages = ref([]);
const fileInput = ref(null);
const imageFiles = ref([]); // 실제 업로드할 이미지 파일들을 저장할 배열

const triggerFileInput = () => {
  fileInput.value.click();
};

// 이미지 업로드 핸들러
const handleImageUpload = (event) => {
  const files = event.target.files; // 업로드된 파일들 가져오기
  previewImages.value = []; // 미리보기 배열 초기화
  imageFiles.value = []; // 이미지 파일 배열 초기화

  for (const file of files) {
    const imageUrl = URL.createObjectURL(file); // 파일을 URL로 변환
    previewImages.value.push(imageUrl); // 미리보기 URL 배열에 추가
    imageFiles.value.push(file); // 실제 파일 배열에 추가
  }
};

const addressData = ref({
  postcode: "",
  address: "",
  extraAddress: "",
  addressDetail: "",
  latitude: 0,
  longitude: 0,
});


const missingPostData = ref({
  title: "",
  content: "",
  dateLost: new Date(),
  contact1: "",
  contact2: "",
  description: "",
  status: "MISSING",
  microchipId: "",
  petName: "",
  species: "",
  petColor: "",
  age: 0,
  petGender: "",
  petDescription: "",
  locataionRecord: {
    postcode: "",
    address: "",
    addressDetail: "",
    latitude: 0,
    longitude: 0
  }
});

const selectGender = () => {
  console.log(gender.value);
  missingPostData.value.petGender = gender.value;
};
const selectSpecies = () => {
  console.log(species.value);
  missingPostData.value.species = species.value;
};

// 위치정보
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

      // Kakao Maps Geocoder로 주소를 위도와 경도로 변환
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const {x, y} = result[0];
          addressData.value.longitude = parseFloat(x);
          addressData.value.latitude = parseFloat(y);
          console.log("좌표 변환 성공:", {latitude: y, longitude: x});
        } else {
          console.error("좌표 변환 실패:", status);
        }
      });
    },
  }).open();
};


const submit = async () => {
  // addressData의 값을 missingPostData에 복사
  missingPostData.value.locataionRecord = {
    postcode: addressData.value.postcode,
    address: addressData.value.address,
    addressDetail: addressData.value.addressDetail,
    latitude: addressData.value.latitude,
    longitude: addressData.value.longitude
  };

  console.log('Submitting data:', missingPostData.value);  // 데이터 로깅

  try {
    // API 요청 호출
    const response = await missingStore.createMissingReport(missingPostData.value, imageFiles.value);
    console.log('서버 응답:', response);

    // 성공 처리 (예: 사용자에게 성공 메시지 표시, 다른 페이지로 리다이렉트 등)

  } catch (error) {
    console.error('실종 신고 생성 중 오류 발생:', error);
    // 오류 처리 (예: 사용자에게 오류 메시지 표시)
  }
};


watch(
    () => missingPostData.value.dateLost,
    (newDate) => {
      console.log('Selected date:', newDate); // 선택된 날짜 확인

      if (newDate instanceof Date) {
        // Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환 (로깅이나 전송 시에만 사용)
        const formattedDate = newDate.toISOString().split('T')[0];
        console.log('Formatted date:', formattedDate); // 변환된 값 확인

        // 하지만 'v-date-picker'는 Date 객체를 계속 사용해야 함
      } else {
        console.error('Error: Selected date is not a Date object');
      }
    }
);


const gender = ref('center');
const species = ref('center');
const icon = ref('justify');
const toggle_none = ref(null);
const toggle_one = ref(0);
const toggle_exclusive = ref(2);
const toggle_multiple = ref([0, 1, 2]);


</script>


<template>
  <v-container fluid class="black-background">
    <!-- 파란색 배경 -->
    <div class="blue-background">
      <v-col>
        <div style="margin-left: 20px; margin-top: 70px;">
          <p style="font-size: 10px; color: #808080;  ">반려동물찾아요 / 글작성</p>
          <p style="font-size: 50px; font-weight: bold; color: black">Info</p>
        </div>
        <v-form @submit.prevent="submit">
          <v-row>
            <v-col>
              <v-col>
                <v-col>
                  <p class="title-text"> 제목 </p>
                  <v-text-field
                      v-model="missingPostData.title"
                      style="width: 540px"
                      class="mt-4"
                      placeholder="게시글 제목을 입력해주세요"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <p class="title-text"> 긴급 연락처 </p>
                  <v-text-field
                      v-model="missingPostData.contact1"
                      style="width: 540px"
                      class="mt-4"
                      placeholder="010-1111-1111"
                  ></v-text-field>

                  <p class="title-text"> 긴급 연락처2 </p>
                  <v-text-field
                      v-model="missingPostData.contact2"
                      style="width: 540px"
                      class="mt-4"
                      placeholder="010-1111-1111"
                  ></v-text-field>
                </v-col>
                <!--              위치 찾기-->
                <v-col class="d-flex flex-column">
                  <v-col>
                    <v-typography style="font-size: 18px; font-weight: bold;">실종 위치</v-typography>
                    <v-btn class="ml-16" @click="execDaumPostcode">우편번호 찾기</v-btn>
                  </v-col>

                  <v-text-field
                      style="width: 540px"
                      v-model="addressData.postcode"
                      label="우편번호"
                      readonly
                      placeholder="우편번호"
                      dense
                  ></v-text-field>
                </v-col>

                <v-col class="address-field " cols="12" sm="6" md="5">
                  <v-text-field
                      style="width: 540px"
                      v-model="addressData.address"
                      readonly
                      label="주소"
                      dense
                  ></v-text-field>
                </v-col>

                <v-col class="address-field" cols="12" sm="6" md="5">
                  <v-text-field
                      style="width: 540px"
                      v-model="addressData.addressDetail"
                      label="상세주소"
                      placeholder="상세주소"
                      dense
                  ></v-text-field>
                </v-col>

                <v-col>
                  <p class="title-text"> 실종 날짜 </p>
                  <v-date-picker
                      v-model="missingPostData.dateLost"
                      style="width: 540px"
                      class="mt-4"
                      placeholder="날짜를 입력해주세요"
                  ></v-date-picker>
                </v-col>


                <v-col>
                  <p class="title-text"> 게시글 추가정보 </p>
                  <v-textarea
                      clearable
                      rows="5"
                      outlined
                      max-length="500"
                      v-model="missingPostData.description"
                      style="width: 540px"
                      class="mt-4"
                      placeholder="추가설명을 입력해주세요"
                  ></v-textarea>
                </v-col>
              </v-col>


            </v-col>

            <v-col class="right-column">
              <v-col>
                <p class="title-text"> 반려동물 이름 </p>
                <v-text-field
                    v-model="missingPostData.petName"
                    style="width: 540px"
                    class="mt-4"
                    placeholder="반려동물 이름을 입력해주세요"
                ></v-text-field>
              </v-col>
              <v-col>

                <p class="title-text"> 나이 </p>
                <v-text-field
                    v-model="missingPostData.age"
                    style="width: 540px"
                    class="mt-4"
                    placeholder="나이"
                ></v-text-field>
              </v-col>


              <v-col>
                <p class="title-text"> 마이크로칩 </p>
                <v-text-field
                    v-model="missingPostData.microchipId"
                    style="width: 540px"
                    class="mt-4"
                    placeholder="마이크로칩"
                ></v-text-field>
              </v-col>
              <v-col>
                <p class="title-text"> 색상 </p>
                <v-text-field
                    v-model="missingPostData.petColor"
                    style="width: 540px"
                    class="mt-4"
                    placeholder="색상"
                ></v-text-field>
              </v-col>
              <v-col>
                <p class="title-text"> 추가정보 </p>
                <v-textarea
                    v-model="missingPostData.petDescription"
                    style="width: 540px"
                    class="mt-4"
                    placeholder="추가정보"
                ></v-textarea>
              </v-col>
              <v-col>
                <!--성별-->
                <v-col class="title-text d-flex">
                  <v-col>
                    <p class="title-text"> 성별 </p>
                    <p>Text Options</p>
                    <v-btn-toggle
                        v-model="gender"
                        color="grey"
                        rounded="0"
                        group
                        @Click="selectGender"
                    >
                      <v-btn value="남자">
                        남자
                      </v-btn>
                      <v-btn value="여자">
                        여자
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>

                  <v-col>
                    <p class="title-text"> 종 선택 </p>
                    <p>Text Options</p>
                    <v-btn-toggle
                        v-model="species"
                        color="grey"
                        rounded="0"
                        group
                        @Click="selectSpecies"
                    >
                      <v-btn value="강아지">
                        강아지
                      </v-btn>
                      <v-btn value="고양이">
                        고양이
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-col>
              </v-col>

              <!--              이미지 업로드-->
              <v-row class="ml-5">
                <v-btn @click="triggerFileInput" style="width: 100px; height: 100px; background-color: grey"
                       class="d-flex justify-center align-center">
                  <v-col>
                    <v-icon size="50px" color="grey">mdi-camera</v-icon>
                    <div>사진추가</div>
                  </v-col>
                </v-btn>

                <v-col style="width: 50px; height: 550px" class="d-flex">
                  <v-col style="width: 50px; height: 550px"
                         v-for="(image, index) in previewImages" key="index"
                  >
                    <v-img :src="image" style="width: 80px; height: 80px; background-color: #333333" cover></v-img>
                  </v-col>
                </v-col>
              </v-row>

              <!-- 숨겨진 파일 입력 필드 -->
              <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  style="display: none"
                  @change="handleImageUpload"
              />


              <v-btn type="submit" color="primary">작성하기</v-btn>

            </v-col>
          </v-row>
        </v-form>
      </v-col>


    </div>
  </v-container>
</template>


<style scoped>
.black-background {
  background-color: #CFCBCB; /* 검정색 배경 */
  width: 100%;
  min-height: 100vh; /* 화면 전체 높이를 최소 높이로 설정 */
  position: relative; /* 자식 요소의 기준 */
  display: flex;

}

.blue-background {
  background-color: #FCFBF6; /* 파란색 배경 */
  width: 97.5%; /* 파란색 배경의 너비 */
  max-width: 100%; /* 최대 너비 제한 */
  min-height: 95vh; /* 파란색 배경의 최소 높이 */
  position: relative; /* 부모 요소 기준으로 절대 위치 */
  margin: auto;
  overflow: hidden; /* 화면을 벗어나는 요소 숨김 */
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
}

.title-text {
  font-size: 20px;
  color: #222222;
}

.address-field {
  width: 500px;
}
</style>