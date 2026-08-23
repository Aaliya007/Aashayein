import { apiClient } from './client';

export const getAshas = async () => {
  const response = await apiClient.get('/ashas');
  return response.data;
};

export const getCases = async () => {
  const response = await apiClient.get('/asha/cases');
  return response.data;
};

export const getHighPriorityCases = async () => {
  const response = await apiClient.get('/asha/cases', {
    params: {
      priorityLevel: 'HIGH',
    },
  });

  return response.data;
};

export const getCriticalCases = async () => {
  const response = await apiClient.get('/asha/cases', {
    params: {
      priorityLevel: 'CRITICAL',
    },
  });

  return response.data;
};

export const getFacilities = async () => {
  const response = await apiClient.get('/facilities');
  return response.data;
};

export const getReferrals = async () => {
  const response = await apiClient.get('/referrals');
  return response.data;
};

export const getPendingReferrals = async () => {
  const response = await apiClient.get('/referrals', {
    params: {
      status: 'PENDING',
    },
  });

  return response.data;
};