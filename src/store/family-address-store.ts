import {create} from 'zustand'

import type { FamilyAndAddressSchema } from '@/lib/schemas/pages/familyAndAddress.schema'
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/store/secure-storage'

interface FamilyAndAddressState{
    familyAndAddress:FamilyAndAddressSchema|null;
    setFamilyAndAddress:(data: FamilyAndAddressSchema) => void;
}

export const useFamilyAndAddressStore = create<FamilyAndAddressState>()(
  persist(
    (set) => ({
      familyAndAddress: null,
      setFamilyAndAddress: (data) => set({ familyAndAddress: data }),
    }),
    {
      name: 'family-and-address-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
