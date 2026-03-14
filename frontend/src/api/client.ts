import axios from 'axios';

const client = axios.create({
  baseURL: '/api/v1',
});

export const uploadMRI = (patientId: string, imageUrl: string) => {
  return client.post('/mri/upload', { patient_id: patientId, image_url: imageUrl });
};

export const getPatients = () => {
  return client.get('/patients/');
};

export default client;
