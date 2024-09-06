<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
            v-model="selectedAreaCode"
            :items="areaCodes"
            label="지역번호"
            outlined
        />
        <v-text-field
            v-model="phone"
            label="전화번호"
            placeholder="전화번호를 입력하세요"
            :rules="[phoneNumberRule]"
            outlined
            clearable
            prepend-icon="mdi-phone"
            :value="formattedPhone"
            @input="onInput"
        />
        <p>입력된 전화번호: {{ fullPhoneNumber }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedAreaCode: '010', // 기본값으로 010 설정
      phone: '',
      areaCodes: ['010', '031', '032', '033', '034'], // 지역번호 목록
    };
  },
  computed: {
    formattedPhone() {
      // 전화번호에서 하이픈을 자동으로 추가
      const cleaned = this.phone.replace(/\D/g, ''); // 숫자만 남기기
      const match = cleaned.match(/(\d{4})(\d{4})/); // 7605-8782 형태로 나누기
      if (match) {
        return `${match[1]}-${match[2]}`;
      }
      return cleaned;
    },
    fullPhoneNumber() {
      // 최종적으로 선택된 지역번호와 포맷된 전화번호를 결합
      return `${this.selectedAreaCode}-${this.formattedPhone}`;
    },
  },
  methods: {
    onInput(value) {
      // 입력값을 그대로 모델에 반영
      this.phone = value;
    },
    phoneNumberRule(value) {
      // 전화번호 검증 규칙
      const phoneRegex = /^\d{4}-\d{4}$/; // 7605-8782 형태
      return phoneRegex.test(value) || '올바른 전화번호를 입력하세요.';
    },
  },
};
</script>

<style scoped>
/* 스타일 추가 */
</style>
npm