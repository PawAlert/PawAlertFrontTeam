import {API_HOSPITAL} from "@/config/url";

export const fetchHospitalCreate = async (data) => {
    return await fetch(API_HOSPITAL.H_CREATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}