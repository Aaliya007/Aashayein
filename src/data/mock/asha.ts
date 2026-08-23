import type { Case } from '@/types/case';
import type { HealthcareFacility } from '@/types/facility';
import type { Patient } from '@/types/patient';
import type { Referral } from '@/types/referral';
import type { User } from '@/types/user';
import type { Visit } from '@/types/visit';

export const mockPatientUsers: User[] = [
  { id: 11, name: 'Ram Kaur', mobile: '9876501234', email: 'ram.kaur@example.com', role: 'patient', village: 'Rampur', district: 'Amritsar', createdAt: '2025-01-15T08:00:00Z' },
  { id: 12, name: 'Baljit Singh', mobile: '9876501235', email: 'baljit@example.com', role: 'patient', village: 'Dharampura', district: 'Amritsar', createdAt: '2025-02-04T08:00:00Z' },
  { id: 13, name: 'Meena Devi', mobile: '9876501236', email: 'meena@example.com', role: 'patient', village: 'Rampur', district: 'Amritsar', createdAt: '2025-03-20T08:00:00Z' },
  { id: 14, name: 'Sukhdev Kaur', mobile: '9876501237', email: 'sukhdev@example.com', role: 'patient', village: 'Khera', district: 'Amritsar', createdAt: '2025-04-11T08:00:00Z' },
];

export const mockPatients: Patient[] = [
  { id: 1, userId: 11, name: 'Ram Kaur', mobile: '9876501234', dateOfBirth: '1963-06-18', gender: 'female', address: 'Ward 2, Village Rampur', latitude: 31.634, longitude: 74.872, emergencyContact: '9876500991', createdAt: '2025-01-15T08:00:00Z' },
  { id: 2, userId: 12, name: 'Baljit Singh', mobile: '9876501235', dateOfBirth: '1974-11-09', gender: 'male', address: 'Near Gurudwara, Dharampura', latitude: 31.620, longitude: 74.851, emergencyContact: '9876500992', createdAt: '2025-02-04T08:00:00Z' },
  { id: 3, userId: 13, name: 'Meena Devi', mobile: '9876501236', dateOfBirth: '1996-03-24', gender: 'female', address: 'Ward 4, Village Rampur', latitude: 31.631, longitude: 74.868, emergencyContact: '9876500993', createdAt: '2025-03-20T08:00:00Z' },
  { id: 4, userId: 14, name: 'Sukhdev Kaur', mobile: '9876501237', dateOfBirth: '1958-08-12', gender: 'female', address: 'Main Road, Khera', createdAt: '2025-04-11T08:00:00Z' },
];

export const mockCases: Case[] = [
  { id: 101, healthRequestId: 1, patientId: 1, ashaId: 1, symptoms: 'High fever, headache and weakness', duration: '3 days', summary: 'Persistent fever reported with weakness. Home visit and observation needed.', priorityScore: 9, priorityLevel: 'CRITICAL', status: 'ASSIGNED', createdAt: '2026-08-20T08:30:00Z', updatedAt: '2026-08-22T06:30:00Z' },
  { id: 102, healthRequestId: 2, patientId: 2, ashaId: 1, symptoms: 'Persistent cough and fatigue', duration: '2 weeks', summary: 'Cough has not improved with home care. Follow-up visit is due.', priorityScore: 6, priorityLevel: 'HIGH', status: 'VISITED', createdAt: '2026-08-18T10:00:00Z', updatedAt: '2026-08-21T13:15:00Z' },
  { id: 103, healthRequestId: 3, patientId: 3, ashaId: 1, symptoms: 'Antenatal follow-up and nausea', duration: '1 week', summary: 'Routine antenatal follow-up requested.', priorityScore: 3, priorityLevel: 'LOW', status: 'PENDING', createdAt: '2026-08-19T09:00:00Z', updatedAt: '2026-08-20T09:00:00Z' },
  { id: 104, healthRequestId: 4, patientId: 4, ashaId: 1, symptoms: 'Joint pain and limited movement', duration: '1 month', summary: 'Referral requested for persistent joint pain.', priorityScore: 7, priorityLevel: 'HIGH', status: 'REFERRED', createdAt: '2026-08-14T11:00:00Z', updatedAt: '2026-08-20T15:30:00Z' },
  { id: 105, healthRequestId: 5, patientId: 2, ashaId: 1, symptoms: 'Seasonal allergy symptoms', duration: '4 days', summary: 'Resolved after follow-up and advice.', priorityScore: 2, priorityLevel: 'LOW', status: 'CLOSED', createdAt: '2026-08-10T10:00:00Z', updatedAt: '2026-08-17T10:00:00Z' },
];

export const mockVisits: Visit[] = [
  { id: 501, caseId: 101, ashaId: 1, temperature: 101.2, condition: 'Needs monitoring', symptoms: 'Fever and headache continue', notes: 'Hydration advised. Revisit if fever persists.', visitedAt: '2026-08-21T09:30:00Z' },
  { id: 502, caseId: 102, ashaId: 1, temperature: 99.1, condition: 'Stable', symptoms: 'Cough remains, fatigue reduced', notes: 'Follow-up planned in two days.', visitedAt: '2026-08-20T11:00:00Z', facilityId: 2 },
  { id: 503, caseId: 105, ashaId: 1, temperature: 98.4, condition: 'Improved', symptoms: 'Allergy symptoms reduced', notes: 'Case closed after review.', visitedAt: '2026-08-17T10:00:00Z' },
];

export const mockAshaFacilities: HealthcareFacility[] = [
  { id: 1, name: 'Amritsar District Hospital', type: 'Hospital', address: 'Court Road, Amritsar', district: 'Amritsar', latitude: 31.634, longitude: 74.872, phone: '0183-2400000', isActive: true },
  { id: 2, name: 'Rampur Primary Health Centre', type: 'PHC', address: 'Main Road, Rampur', district: 'Amritsar', latitude: 31.628, longitude: 74.865, phone: '9876509876', isActive: true },
];

export const mockReferrals: Referral[] = [
  { id: 701, caseId: 104, patientId: 4, facilityId: 1, ashaId: 1, reason: 'Persistent joint pain requiring clinical assessment.', status: 'PENDING', createdAt: '2026-08-20T15:30:00Z', updatedAt: '2026-08-20T15:30:00Z' },
];
