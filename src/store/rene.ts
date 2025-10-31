import { create } from 'zustand'

interface ReneState {
  sequence: { type: string, name: string, rootNote: string }[]
  setSequence: (sequence: { type: string, name: string, rootNote: string }[]) => void
}

export const useReneStore = create<ReneState>((set) => ({
  sequence: [],
  setSequence: (sequence: { type: string, name: string, rootNote: string }[]) => set({ sequence }),
}))