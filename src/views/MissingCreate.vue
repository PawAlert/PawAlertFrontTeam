<script setup>
import { ref } from "vue";
import { useMissingStore } from "@/store/modules/missing";

const missingStore = useMissingStore();

const addressOptions = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시',
  '울산광역시', '세종특별자치시', '경기도', '강원도', '충청북도', '충청남도',
  '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도'
];

const missingReportData = ref({
  title: "",
  content: "",
  dateLost: null, // 초기값을 null로 설정
  latitude: "",
  longitude: "",
  description: "",
  status: "Missing",
  microchipId: "",
  petName: "",
  species: "",
  petColor: "",
  age: 0,
  petGender: "",
  petDescription: "",
  rewardAmount: 0,
  rewardDescription: "",
  address: "",
  addressDetail1: "",
  addressDetail2: "",
});

const imageFiles = ref([]);
const showDatePicker = ref(false);
const selectedDate = ref(null); // 초기값을 null로 설정

function handleImageUpload(e) {
  imageFiles.value = Array.from(e.target.files);
}

function updateDate(date) {
  if (date) {
    // 선택된 날짜를 Date 객체로 저장
    missingReportData.value.dateLost = new Date(date);
    selectedDate.value = new Date(date);
  }
  showDatePicker.value = false;
}

function submitMissingReport() {
  missingStore.createMissingReport(missingReportData.value, imageFiles.value);
}
</script>

<template>
  <v-container>
    <v-form @submit.prevent="submitMissingReport">
      <v-text-field
          v-model="missingReportData.title"
          label="제목"
          required
      ></v-text-field>

      <v-textarea
          v-model="missingReportData.content"
          label="상세 내용을 입력해주세요"
          required
      ></v-textarea>

      <!-- 날짜 선택 -->
      <v-text-field
          prepend-icon="mdi-calendar"
          readonly
          @click="showDatePicker = true"
          :value="missingReportData.dateLost ? missingReportData.dateLost.toLocaleDateString() : ''"
          placeholder="날짜를 선택해주세요"
      ></v-text-field>

      <!-- Date Picker Dialog -->
      <v-dialog
          v-model="showDatePicker"
          width="400px"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">날짜 선택</v-card-title>
          <v-date-picker
              v-model="selectedDate"
              @update:model-value="updateDate"
              :style="{ minWidth: '300px' }"
          ></v-date-picker>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="showDatePicker = false">취소</v-btn>
            <v-btn text @click="updateDate(selectedDate.value)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<style scoped>
</style>
