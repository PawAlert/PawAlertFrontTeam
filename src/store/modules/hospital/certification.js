import {defineStore} from 'pinia';
import {fetchHospitalCertification, fetchShelterCertification} from "@/api/hospital/api_certification";
import {fetchHospitalCreate} from "@/api/hospital/api_hospital";
import {fetchShelterSignup} from "@/api/hospital/api_shelter";

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
        // 병원 등록 요청
        async fetchCreateHospital(data) {
            try {
                const response = await fetchHospitalCreate(data);
                console.log('병원 등록 응답:', response);
                return response;
            }catch (error) {
                console.error('병원 등록 실패:', error);
                throw error;
            }
        },
        // 보호소 인증 요청
        async fetchCertificationShelter(data) {
            try {
                const response = await fetchShelterCertification(data); // 보호소 인증 요청 함수 호출
                console.log('보호소 인증 응답:', response);
                return response;
            } catch (error) {
                console.error('보호소 인증 실패:', error);
                throw error;
            }
        },
        // 보호센터 회원가입 요청
        async fetchSignupShelter(data) {
            try {
                const response = await fetchShelterSignup(data);
                console.log('보호센터 등록 응답:', response);
                return response;
            }catch (error) {
                console.error('보호센터 등록 실패:', error);
                throw error;
            }
        },

    }
});
