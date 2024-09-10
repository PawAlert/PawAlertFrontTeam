import {API_SHELTER} from "@/config/url";

export const fetchShelterSignup = async (data) => {
    return await fetch(API_SHELTER.H_SIGNUP_CREATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}