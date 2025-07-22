import {create} from 'zustand';

import type { DocumentAndCenterSchema } from '@/lib/schemas/pages/document-and-prefrence-schema';
import { persist, createJSONStorage } from 'zustand/middleware'
import { secureStorage } from '@/store/secure-storage';

type DocumentAndCenterStore = {
    documentAndCenter: DocumentAndCenterSchema | null;
    setDocumentAndCenter: (data: DocumentAndCenterSchema) => void;
};

export const useDocumentAndCenterStore = create<DocumentAndCenterStore>()(
  persist(
    (set) => ({
      documentAndCenter: null,
      setDocumentAndCenter: (data) => set({ documentAndCenter: data }),
    }),
    {
      name: 'document-and-center-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
