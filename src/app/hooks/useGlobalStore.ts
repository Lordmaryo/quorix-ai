import { create } from "zustand";

interface UseGlobalStore {
  isOpen: boolean;
  suggestedPrompt: string;
  setSuggestedPrompt: (prompt: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const UseGlobalStore = create<UseGlobalStore>((set) => ({
  isOpen: false,
  suggestedPrompt: "",

  setSuggestedPrompt: (prompt: string) => set({ suggestedPrompt: prompt }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
