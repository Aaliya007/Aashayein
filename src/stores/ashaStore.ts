import { mockAshaFacilities, mockCases, mockPatientUsers, mockPatients, mockReferrals, mockVisits } from '@/data/mock/asha';
import type { Visit } from '@/types/visit';
import { create } from 'zustand';

type NewVisit = Omit<Visit, 'id' | 'visitedAt' | 'ashaId'> & { visitedAt?: string };

interface AshaState {
  cases: typeof mockCases;
  patients: typeof mockPatients;
  patientUsers: typeof mockPatientUsers;
  visits: typeof mockVisits;
  facilities: typeof mockAshaFacilities;
  referrals: typeof mockReferrals;
  addVisit: (visit: NewVisit) => Visit;
}

export const useAshaStore = create<AshaState>((set, get) => ({
  cases: mockCases,
  patients: mockPatients,
  patientUsers: mockPatientUsers,
  visits: mockVisits,
  facilities: mockAshaFacilities,
  referrals: mockReferrals,
  addVisit: (visit) => {
    const created: Visit = { ...visit, id: Math.max(0, ...get().visits.map((item) => item.id)) + 1, ashaId: 1, visitedAt: visit.visitedAt ?? new Date().toISOString() };
    set((state) => ({ visits: [created, ...state.visits], cases: state.cases.map((item) => item.id === created.caseId ? { ...item, status: 'in_progress', updatedAt: created.visitedAt } : item) }));
    return created;
  },
}));
