<template>
  <v-col class="d-flex align-center justify-center" cols="12" sm="12" md="12">
    <div class="d-flex">
      <v-img
          :width="50"
          height="50"
          src="@/assets/images/paw 2.png"
      >
      </v-img>
      <v-typography style="font-size: 30px; font-weight: bold">동물 실종 알림 시스템</v-typography>
    </div>
  </v-col>
  <v-col class="d-flex align-center justify-center">
    <v-typography style="font-size: 40px; color: #2D2D2D; font-weight: bold">회원가입</v-typography>
  </v-col>

  <v-stepper hide-actions style="width: 1280px; border-radius: 10px" alt-labels v-model="currentStep"
             :items="['회원가입', '약관동의', '인증하기', '정보입력', '완료하기']">
    <!-- 처음 선택 -->
    <template v-slot:item.1>
      <Signup @next-step="handleNextStep"/>
    </template>

    <!-- 약관동의 -->
    <template v-slot:item.2>
      <v-card>
        <OfficialGroup @agreement-step="agreementStep"/>
      </v-card>
    </template>

    <!-- 인증하기 -->
    <template v-slot:item.3>
      <v-card>
        <GroupChoice @choiceGroup-step="choiceGroup"/>
      </v-card>
    </template>

    <!-- 정보입력 단계 -->
    <template v-slot:item.4>
      <v-card v-if="currentStepType === 'official'">
        <!-- 이벤트 수신기 추가 -->
        <SignupHospital @agreement-step="agreementStep" @certification-step="certificationStep"/>
      </v-card>

      <v-card v-else-if="currentStepType === 'shelter'">
        <SignupShelter @agreement-step="agreementStep"/>
      </v-card>

      <v-card v-else-if="currentStepType === 'general'">
        <v-btn>general</v-btn>
      </v-card>
    </template>

    <!-- 완료하기 단계 -->
    <template v-slot:item.5>
      <v-card v-if="currentStepType === 'hospital'">
        <HospitalInfo :hospitalData="hospitalData" />
      </v-card>
    </template>
  </v-stepper>
</template>

<script>
import {defineComponent, ref} from "vue";
import Signup from "@/views/Signup.vue";
import OfficialGroup from "@/views/OfficialGroup.vue";
import SignupShelter from "@/views/SignupShelter.vue";
import SignupHospital from "@/views/hospital/signup/SignupHospital.vue";
import GroupChoice from "@/views/GroupChoice.vue";
import HospitalInfo from "@/views/hospital/signup/HospitalInfo.vue";

export default defineComponent({
  name: 'SignupStart',
  components: {HospitalInfo, GroupChoice, SignupHospital, SignupShelter, OfficialGroup, Signup},
  setup() {

    const currentStep = ref(1);
    const currentStepType = ref('');
    const steps = [1, 2, 3, 4, 5];
    const stepLabels = ['회원가입', '약관동의', '인증하기', '정보입력', '완료하기'];
    const hospitalData = ref('');

    const handleNextStep = (stepType) => {
      console.log('handleNextStep called with:', stepType);
      if (stepType === 'official' || stepType === 'general') {
        currentStepType.value = stepType;
        currentStep.value = 2;
      }
    };

    const choiceGroup = (stepType) => {
      console.log('choiceGroup called with:', stepType);
      if (stepType === 'official' || stepType === 'shelter') {
        currentStepType.value = stepType;
        currentStep.value = 4;
      }
    }

    const agreementStep = (stepOk) => {
      if (stepOk) {
        if (currentStepType.value === 'general') {
          currentStep.value = 4;
        } else {
          currentStep.value = 3;
        }
      }
    };

    const certificationStep = (stepType, data) => {
      if (stepType === 'hospital') {
        currentStepType.value = stepType;
        currentStep.value = 5;
        hospitalData.value = data;
        console.log(data)
      }
    };

    return {
      currentStep,
      currentStepType,
      steps,
      stepLabels,
      hospitalData,
      certificationStep,
      choiceGroup,
      handleNextStep,
      agreementStep,
    };
  },
});
</script>
