import {create} from 'zustand';
import { useBasicInformationStore } from '@/store/basic-information-store';
import { useFamilyAndAddressStore } from '@/store/family-address-store';
import { useEducationDetailsStore } from '@/store/education-details-store';
import { useDocumentAndCenterStore } from '@/store/document-and-center-store';


interface FormStepState {
  step: number;
  disabled: boolean;
  prevDisabled: boolean;
  incrementStep: () => void;
  decrementStep: () => void;
  setDisabled:(data:boolean)=>void;
  setPrevDisabled: (data:boolean) => void;
}

export const useFormStepStore = create<FormStepState>((set, get) => ({
  step: 1,
  disabled: true,
  prevDisabled: false,
  setPrevDisabled: (prevDisabled) => set({ prevDisabled }),
  incrementStep: () => {
    const currentStep = get().step;
    const basicInfo = useBasicInformationStore.getState().basicInformation;
    const familyAndAddress = useFamilyAndAddressStore.getState().familyAndAddress;
    const educationDetails = useEducationDetailsStore.getState().educationDetails;
    const documentAndCenter = useDocumentAndCenterStore.getState().documentAndCenter;
    
    if (currentStep === 1 ) {
      if (basicInfo) {
        set(() => ({ step: 2 }));
      }
    }
    else if(currentStep==2){
      if(familyAndAddress){
        set(() => ({ step: 3 }));
      }
    }
    else if (currentStep === 3) {
      if (educationDetails) {
        set(() => ({ step: 4 }));
      }
    }
    else if (currentStep === 4) {
      if (documentAndCenter) {
        set(() => ({ step: 5 }));
      }
      
    }
  },
  decrementStep: () => {
    const prevDisabled = get().prevDisabled;
    if (prevDisabled) return;
    set((state) => ({ step: state.step > 1 ? state.step - 1 : 1 }));
  },
  setDisabled: (disabled) => set({ disabled }),
}));