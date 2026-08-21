import { mockAshaFacilities, mockCases, mockPatientUsers, mockPatients, mockReferrals, mockVisits } from '@/data/mock/asha';
import { mockVaccinations } from '@/data/mock/vaccinations';
import type { Visit } from '@/types/visit';
import type { Case } from '@/types/case';
import type { Patient } from '@/types/patient';
import type { User } from '@/types/user';
import { create } from 'zustand';

type NewVisit = Omit<Visit, 'id' | 'visitedAt' | 'ashaId'> & { visitedAt?: string };

export interface NewPatientVisit {
  patient: Pick<Patient, 'dateOfBirth' | 'gender' | 'address' | 'emergencyContact'>;
  user: Pick<User, 'name' | 'mobile' | 'email' | 'village' | 'district'>;
  visit: Omit<NewVisit, 'caseId'>;
}

interface AshaState {
  cases: typeof mockCases;
  patients: typeof mockPatients;
  patientUsers: typeof mockPatientUsers;
  visits: typeof mockVisits;
  facilities: typeof mockAshaFacilities;
  referrals: typeof mockReferrals;
  vaccinations: typeof mockVaccinations;
  addVisit: (visit: NewVisit) => Visit;
  addPatientVisit: (input: NewPatientVisit) => { patient: Patient; case: Case; visit: Visit };
}

export const useAshaStore = create<AshaState>((set, get) => ({
  cases: mockCases,
  patients: mockPatients,
  patientUsers: mockPatientUsers,
  visits: mockVisits,
  facilities: mockAshaFacilities,
  referrals: mockReferrals,
  vaccinations: mockVaccinations,
  addVisit: (visit) => {
    const created: Visit = { ...visit, id: Math.max(0, ...get().visits.map((item) => item.id)) + 1, ashaId: 1, visitedAt: visit.visitedAt ?? new Date().toISOString() };
    set((state) => ({ visits: [created, ...state.visits], cases: state.cases.map((item) => item.id === created.caseId ? { ...item, status: 'in_progress', updatedAt: created.visitedAt } : item) }));
    return created;
  },
  addPatientVisit: (input) => {
    const now = new Date().toISOString();
    const userId = Math.max(0, ...get().patientUsers.map((item) => item.id)) + 1;
    const patientId = Math.max(0, ...get().patients.map((item) => item.id)) + 1;
    const caseId = Math.max(0, ...get().cases.map((item) => item.id)) + 1;
    const visitId = Math.max(0, ...get().visits.map((item) => item.id)) + 1;
    const user: User = { id: userId, role: 'patient', createdAt: now, ...input.user };
    const patient: Patient = { id: patientId, userId, createdAt: now, ...input.patient };
    const createdCase: Case = {
      id: caseId,
      healthRequestId: Math.max(0, ...get().cases.map((item) => item.healthRequestId)) + 1,
      patientId,
      ashaId: 1,
      symptoms: input.visit.symptoms,
      duration: 'Initial visit',
      summary: input.visit.notes?.trim() || input.visit.condition,
      priorityScore: 3,
      status: 'in_progress',
      createdAt: now,
      updatedAt: now,
    };
    const visit: Visit = { id: visitId, caseId, ashaId: 1, visitedAt: now, ...input.visit };
    set((state) => ({
      patientUsers: [...state.patientUsers, user],
      patients: [...state.patients, patient],
      cases: [createdCase, ...state.cases],
      visits: [visit, ...state.visits],
    }));
    return { patient, case: createdCase, visit };
  },
}));
