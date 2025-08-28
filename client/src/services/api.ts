import axios from 'axios';
// const apiClient = axios.create({ baseURL: 'https://sklgmsapi.koltech.dev/api' });

const apiClient = axios.create({ baseURL: 'http://localhost:5001/api' });

export const submitKycDocument = (formData: FormData) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    };

    return apiClient.post('/users/kyc', formData, config);
};

// Sumsub KYC API
export const getSumsubAccessToken = () => {
    const token = localStorage.getItem('token');
    return apiClient.get('/sumsub/access-token', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

export const getSumsubVerificationStatus = () => {
    const token = localStorage.getItem('token');
    return apiClient.get('/sumsub/verification-status', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

export default apiClient;