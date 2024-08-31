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
              v-model="missingReportData.content"
              label="상세 내용을 입력해주세요"
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
                  <v-textarea
                      v-model="missingReportData.petDescription"
                      label="반려동물 설명"
                  ></v-textarea>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- 이미지 업로드 영역 -->
      <v-row class="mt-4">
        <v-col cols="12" class="d-flex align-cente">
          <!-- 업로드 아이콘 -->
          <div class="upload-icon-container mr-4" @click="triggerFileInput">
            <v-icon size="80" color="grey">mdi-camera</v-icon>
            <span class="upload-text">사진 추가</span>
          </div>

          <!-- 업로드된 이미지 목록 -->
          <div class="d-flex flex-wrap iconupload">
            <div
                v-for="(file, index) in imageFiles.slice(0)"
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

      <!-- 숨겨진 파일 입력 -->
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          style="display: none"
          @change="handleImageUpload"
      />

      <!-- 제출 버튼 -->
      <v-row class="mt-4">
        <v-col cols="12">
          <v-btn color="primary" type="submit">제출하기</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMissingStore } from "@/store/modules/missing";

const missingStore = useMissingStore();

const missingReportData = ref({
  title: "",
  content: "",
  dateLost: null,
  latitude: 37.5665,
  longitude: 126.9780,
  description: "",
  status: "MISSING",
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
const selectedDate = ref(null);

const formattedDate = computed(() => {
  return missingReportData.value.dateLost
      ? new Date(missingReportData.value.dateLost).toLocaleDateString()
      : '';
});

function triggerFileInput() {
  document.querySelector('input[type="file"]').click();
}

function handleImageUpload(e) {
  imageFiles.value = [...imageFiles.value, ...Array.from(e.target.files)];
}

function updateDate() {
  if (selectedDate.value) {
    missingReportData.value.dateLost = new Date(selectedDate.value);
  }
  showDatePicker.value = false;
}

function submitMissingReport() {
  missingStore.createMissingReport(missingReportData.value, imageFiles.value);
}

function getImageUrl(file) {
  return file ? URL.createObjectURL(file) : '';
}
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

</style>