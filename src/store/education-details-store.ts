import {create} from 'zustand';
import type { EducationDetailSchema10Th ,EducationDetailSchema12Th,EducationDetailSchemaGraduation } from '@/lib/schemas/pages/educationDetails.schema';
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/store/secure-storage';

interface EducationDetailsState10Th {
  educationDetails: EducationDetailSchema10Th | null;
  setEducationDetails: (data: EducationDetailSchema10Th) => void;
}

export const useEducationDetailsStore10Th = create<EducationDetailsState10Th>()(
  persist(
    (set) => ({
      educationDetails: null,
      setEducationDetails: (data) => set({ educationDetails: data }),
    }),
    {
      name: 'education-details-storage-10th',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

interface EducationDetailsState12Th {
  educationDetails: EducationDetailSchema12Th | null;
  setEducationDetails: (data: EducationDetailSchema12Th) => void;
}

export const useEducationDetailsStore12Th = create<EducationDetailsState12Th>()(
  persist(
    (set) => ({
      educationDetails: null,
      setEducationDetails: (data) => set({ educationDetails: data }),
    }),
    {
      name: 'education-details-storage-12th',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

interface EducationDetailsStateGraduation {
  educationDetails: EducationDetailSchemaGraduation | null;
  setEducationDetails: (data: EducationDetailSchemaGraduation) => void;
}

export const useEducationDetailsStoreGraduation = create<EducationDetailsStateGraduation>()(
  persist(
    (set) => ({
      educationDetails: null,
      setEducationDetails: (data) => set({ educationDetails: data }),
    }),
    {
      name: 'education-details-storage-graduation',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
