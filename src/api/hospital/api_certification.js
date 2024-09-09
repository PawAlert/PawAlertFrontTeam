import {API_CERTIFICATION} from "@/config/url";

export const fetchHospitalCertification = async (data) => {
    return await fetch(API_CERTIFICATION.C_HOSPITAL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const fetchShelterCertification = async (data) => {
    return await fetch(API_CERTIFICATION.C_SHELTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}