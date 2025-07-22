import {create} from 'zustand';
import type { EducationDetailsSchema } from '@/lib/schemas/pages/educationDetails.schema';
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/store/secure-storage';

interface EducationDetailsState {
  educationDetails: EducationDetailsSchema | null;
  setEducationDetails: (data: EducationDetailsSchema) => void;
}

export const useEducationDetailsStore = create<EducationDetailsState>()(
  persist(
    (set) => ({
      educationDetails: null,
      setEducationDetails: (data) => set({ educationDetails: data }),
    }),
    {
      name: 'education-details-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
