import {defineStore} from 'pinia';
import {fetchHospitalCertification, fetchShelterCertification} from "@/api/api_certification";

// 인증 관련 스토어 정의
export const useCertificationStore = defineStore('certification', {
    actions: {
        // 병원 인증 요청
        async fetchCertificationHospital(data) {
            try {
                return await fetchHospitalCertification(data); // 병원 인증 요청 함수 호출
            } catch (error) {
                console.error('병원 인증 실패:', error);
                throw error;
            }
        },
        // 보호소 인증 요청
        async fetchCertificationShelter(data) {
            try {
                const response = await fetchShelterCertification(data); // 보호소 인증 요청 함수 호출
                console.log('보호소 인증 성공:', response);
                return response;
            } catch (error) {
                console.error('보호소 인증 실패:', error);
                throw error;
            }
        }
    }
});
