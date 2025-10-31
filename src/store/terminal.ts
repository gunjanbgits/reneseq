import { create } from 'zustand'

interface TerminalState {
  isLoaded: boolean
  setLoaded: (loaded: boolean) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  barLoaded: boolean
  setBarLoaded: (loaded: boolean) => void
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isLoaded: false,
  setLoaded: (loaded: boolean) => set({ isLoaded: loaded }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),  
  barLoaded: false,
  setBarLoaded: (loaded: boolean) => set({ barLoaded: loaded }),
}))

