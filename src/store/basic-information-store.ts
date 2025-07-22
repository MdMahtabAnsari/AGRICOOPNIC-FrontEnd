import {create} from 'zustand';
import type { BasicInformationSchema } from '@/lib/schemas/pages/basicInformation.schema';
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/store/secure-storage';

interface BasicInformationState {
  basicInformation: BasicInformationSchema | null;
  setBasicInformation: (data: BasicInformationSchema) => void;
}

export const useBasicInformationStore = create<BasicInformationState>()(
  persist<BasicInformationState>(
    (set) => ({
      basicInformation: null,
      setBasicInformation: (data: BasicInformationSchema) => set({ basicInformation: data }),
    }),
    {
      name: 'basic-information-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => secureStorage)
    }
  )
);


interface EmailVerifiedState{
    isVerified:boolean
    setVerified:(data:boolean)=>void
}

export const useEmailVerifiedStore = create< EmailVerifiedState>((set) => ({
 isVerified: false,
  setVerified: (data) => set({ isVerified: data }),
}));
