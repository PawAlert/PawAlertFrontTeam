<script setup>
import {defineProps, onMounted, ref, watch} from 'vue';
import {useCertificationStore} from "@/store/modules/hospital/certification";
import {createRouter as $router, useRouter} from 'vue-router';
const router = useRouter();

const store = useCertificationStore();


const props = defineProps({
  shelterData: {
    type: Object,
    default: () => ({}), // 데이터 기본값 설정
  },
});

const shelterName = ref('');
const jurisdiction = ref('');
const email = ref('');
const password = ref('');
const contactPhone = ref('');
const show1 = ref(false)
const show2 = ref(true)


onMounted(() => {
  shelterName.value = props.shelterData.shelterName;
  jurisdiction.value = props.shelterData.jurisdiction;
});

const addressData = ref({
  postcode: "",
  address: "",
  extraAddress: "",
  detailAddress: "",
  latitude: 0,
  longitude: 0,
});


// 함수 내부에서 모든 데이터 수집
const collectFormData = () => {
  return {
    shelterName: shelterName.value,
    jurisdiction: jurisdiction.value,
    email: email.value,
    password: password.value,
    contactPhone: contactPhone.value,
    locataionRecord: {
      postcode: addressData.value.postcode,
      address: addressData.value.address,
      addressDetail: addressData.value.detailAddress,
      latitude: addressData.value.latitude,
      longitude: addressData.value.longitude
    }
  };
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

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
}

const submit = async () => {
  const response = await store.fetchSignupShelter(collectFormData());
  console.log(response);
  if(response.status === 201) {
    alert("인증이 완료되었습니다.")
    await router.push({name: 'Login'});
  }
}

</script>
<script>
export default {
  data() {
    return {
      show1: false,
      show2: true,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
}
</script>
<template>
  <v-container fluid class="fill-height d-flex">
    <v-col class="d-flex flex-column">
      <v-col class="d-flex">
        <v-img :width="50" height="50" src="@/assets/images/paw 2.png"></v-img>
        <v-typography style="margin-left: 10px; font-size: 20px; width: 100%; font-weight: bold" class="mt-3">회원가입 완료하기
        </v-typography>
      </v-col>
      <v-col cols="12" class="d-flex flex-column">
        <v-row class="d-flex flex-column">
          <v-form @submit.prevent="submit">
            <!-- 보호센터 이름 -->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">보호센터 이름</v-typography>
              <v-text-field
                  style="color: #333333; border: 1px solid #D7D7D7; background-color: #EDEDED; width: 400px; height: 50px; border-radius: 10px"
                  class="custom-text-field"
                  v-model="shelterName"
                  disabled
              ></v-text-field>
            </v-col>

            <!-- 관할구역 -->
            <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
              <v-typography style="font-size: 18px; font-weight: bold;">관할구역</v-typography>
              <v-text-field
                  style="color: #333333; border: 1px solid #D7D7D7; background-color: #EDEDED; width: 400px; height: 50px; border-radius: 10px"
                  v-model="jurisdiction"
                  disabled
              ></v-text-field>
            </v-col>

            <v-form @submit.prevent="submit">
              <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
                <v-typography style="font-size: 18px; font-weight: bold;">이메일</v-typography>
                <v-text-field
                    variant="outlined"
                    v-model="email"
                    style="background-color: #FFFFFF; border: 1px solid #FFFFFF; width: 400px; height: 50px;"
                    placeholder="로그인 이메일을 입력해주세요"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
                <v-typography style="font-size: 18px; font-weight: bold;">패스워드</v-typography>
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    hint="8자 이상 적어주세요"
                    name="input-10-1"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>


              <v-col cols="12" sm="6" md="5" class="d-flex flex-column mb-1">
                <v-typography style="font-size: 18px; font-weight: bold;">연락처</v-typography>
                <v-text-field
                    v-model="contactPhone"
                    variant="outlined"
                    style="background-color: #FFFFFF; border: 1px solid #FFFFFF; width: 400px; height: 50px;"
                    placeholder="보호센터 연락처를 입력해주세요"
                ></v-text-field>
              </v-col>


              <v-col class="address-field-t mb-1">
                <v-col cols="12" sm="6" md="5" class="mt-2">
                  <v-typography style="font-size: 18px; font-weight: bold;">보호센터 위치</v-typography>
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

                <v-col class="address-field " cols="12" sm="6" md="5">
                  <v-text-field
                      v-model="addressData.address"
                      readonly
                      label="주소"
                      dense
                  ></v-text-field>
                </v-col>

                <v-col class="address-field" cols="12" sm="6" md="5">
                  <v-text-field
                      v-model="addressData.detailAddress"
                      label="상세주소"
                      placeholder="상세주소"
                      dense
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                      @Click="submit"
                      style="width: 260px; height: 50px; background-color: #00813E; color: #FFFFFF; border-radius: 10px;">
                    인증하기
                  </v-btn>
                </v-col>
              </v-col>
            </v-form>
          </v-form>
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

.address-field-t {
  margin-left: -10px;
}

.address-field {
  margin-top: -20px;
}
</style>