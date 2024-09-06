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


  <!-- Stepper 컴포넌트 -->
  <v-stepper hide-actions style="width: 1280px; border-radius: 10px" alt-labels v-model="currentStep"
             :items="['회원가입', '약관동의', '인증하기', '정보입력', '완료하기']">

    <template v-slot:item.1>
      <Signup @next-step="handleNextStep" />
    </template>

    <template v-slot:item.2>
      <v-card>
        <OfficialGroup @agreement-step="agreementStep" />
      </v-card>
    </template>

    <template v-slot:item.3>
      <v-card v-if="currentStepType === 'official'">
        <SignupHospital @agreement-step="agreementStep" />
      </v-card>

      <v-card v-else-if="currentStepType === 'general'">
        <SignupShelter @agreement-step="agreementStep" />
      </v-card>
    </template>

    <template v-slot:item.4>
      <v-card title="Step Four" flat>Step 4 내용...</v-card>
    </template>

    <template v-slot:item.5>
      <v-card title="Step Five" flat>완료 단계...</v-card>
    </template>
  </v-stepper>

</template>

<script>
import { defineComponent, ref, watch, onMounted, onUpdated } from "vue";
import Signup from "@/views/Signup.vue";
import OfficialGroup from "@/views/OfficialGroup.vue";
import SignupShelter from "@/views/SignupShelter.vue";
import SignupHospital from "@/views/SignupHospital.vue";

export default defineComponent({
  name: 'SignupStart',
  components: { SignupHospital, SignupShelter, OfficialGroup, Signup },
  setup() {


    const currentStep = ref(1);
    const currentStepType = ref('');
    const steps = [1, 2, 3, 4, 5];
    const stepLabels = ['회원가입', '약관동의', '인증하기', '정보입력', '완료하기'];


    const handleNextStep = (stepType) => {
      console.log('handleNextStep called with:', stepType);
      if (stepType === 'official' || stepType === 'general') {
        currentStepType.value = stepType;
        currentStep.value = 2;
      }
    };

    const agreementStep = (stepOk) => {
      if (stepOk) {
        currentStep.value = 3;
      }
    };


    return {
      currentStep,
      currentStepType,
      steps,
      stepLabels,
      handleNextStep,
      agreementStep
    };
  },
});
</script>