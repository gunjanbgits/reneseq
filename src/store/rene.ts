import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ReneSequenceStep = { type: string | null, name: string | null, rootNote: string | null };

interface ReneState {
  sequence: ReneSequenceStep[]
  setSequence: (sequence: ReneSequenceStep[]) => void
}

interface ReneSeqPreset {
  name: string;
  sequence: ReneSequenceStep[];
}

interface RenePresetsState {
  reneseqPresets: ReneSeqPreset[];
  activePresetName: string | null;
  setReneseqPresets: (reneseqPresets: ReneSeqPreset[]) => void;
  setActivePreset: (name: string | null) => void;
  loadPreset: (name: string) => void;
  savePreset: (name: string, sequence?: ReneSequenceStep[]) => void;
  createPresetFromCurrent: (name: string) => void;
  deletePreset: (name: string) => void;
  renamePreset: (oldName: string, newName: string) => void;

  // New: reset helpers
  resetAllPresetsToDefaults: () => void;
  resetPresetToDefault: (name: string) => void;
}

// Initialize with 16 empty steps
const emptyStep: ReneSequenceStep = { type: null, name: null, rootNote: null };
const emptySequence16 = (): ReneSequenceStep[] => Array(16).fill(null).map(() => ({ ...emptyStep }));

const normalizeTo16 = (sequence: ReneSequenceStep[]): ReneSequenceStep[] => {
  const seq = sequence.slice(0, 16);
  if (seq.length < 16) {
    return seq.concat(Array(16 - seq.length).fill(null).map(() => ({ ...emptyStep })));
  }
  return seq;
}

const emptyPreset: ReneSeqPreset = {
  name: 'Init',
  sequence: emptySequence16(),
}


//// Presets //////
const cIonianPopPalette: ReneSeqPreset = {
  name: 'C Ionian Pop Palette',
  sequence: normalizeTo16([
    { type: 'chord', name: 'maj7', rootNote: 'C' },
    { type: 'chord', name: 'm7',   rootNote: 'D' },
    { type: 'chord', name: 'm7',   rootNote: 'E' },
    { type: 'chord', name: 'maj7', rootNote: 'F' },
    { type: 'chord', name: '7',    rootNote: 'G' },
    { type: 'chord', name: 'm7',   rootNote: 'A' },
    { type: 'chord', name: 'm7b5', rootNote: 'B' },
    { type: 'chord', name: 'M',    rootNote: 'C' },
    { type: 'chord', name: 'sus4', rootNote: 'G' },
    { type: 'chord', name: 'm9',   rootNote: 'E' },
    { type: 'chord', name: '6',    rootNote: 'F' },
    { type: 'chord', name: 'm9',   rootNote: 'D' },
    { type: 'chord', name: '9',    rootNote: 'G' },
    { type: 'chord', name: 'm11',  rootNote: 'A' },
    { type: 'chord', name: 'maj9', rootNote: 'F' },
    { type: 'chord', name: 'maj13',rootNote: 'C' },
  ]),
}

const aAeolianCinematic: ReneSeqPreset = {
  name: 'A Aeolian Cinematic',
  sequence: normalizeTo16([
    { type: 'chord', name: 'm7',    rootNote: 'A' },
    { type: 'chord', name: 'm7b5',  rootNote: 'B' },
    { type: 'chord', name: 'maj7',  rootNote: 'C' },
    { type: 'chord', name: 'm7',    rootNote: 'D' },
    { type: 'chord', name: 'm7',    rootNote: 'E' },
    { type: 'chord', name: 'maj7',  rootNote: 'F' },
    { type: 'chord', name: '7',     rootNote: 'G' },
    { type: 'chord', name: '7',     rootNote: 'E' },   // V of A minor
    { type: 'chord', name: 'm9',    rootNote: 'A' },
    { type: 'chord', name: 'm9',    rootNote: 'D' },
    { type: 'chord', name: 'sus4',  rootNote: 'G' },
    { type: 'chord', name: 'maj9',  rootNote: 'C' },
    { type: 'chord', name: '6',     rootNote: 'F' },
    { type: 'chord', name: 'dim7',  rootNote: 'B' },
    { type: 'chord', name: '7b9',   rootNote: 'E' },
    { type: 'chord', name: 'm6',    rootNote: 'A' },
  ]),
}

const gMixolydianGroove: ReneSeqPreset = {
  name: 'G Mixolydian Groove',
  sequence: normalizeTo16([
    { type: 'chord', name: '7',     rootNote: 'G' },
    { type: 'chord', name: 'maj7',  rootNote: 'C' },
    { type: 'chord', name: 'm7',    rootNote: 'D' },
    { type: 'chord', name: 'maj7',  rootNote: 'F' },   // ♭VIImaj7 color
    { type: 'chord', name: 'm7',    rootNote: 'A' },
    { type: 'chord', name: 'M',     rootNote: 'Bb' },  // modal mixture color
    { type: 'chord', name: '7',     rootNote: 'D' },   // secondary dom
    { type: 'chord', name: '7sus4', rootNote: 'G' },
    { type: 'chord', name: '6',     rootNote: 'C' },
    { type: 'chord', name: '11',    rootNote: 'G' },
    { type: 'chord', name: 'm9',    rootNote: 'D' },
    { type: 'chord', name: 'maj9',  rootNote: 'Bb' },
    { type: 'chord', name: 'm11',   rootNote: 'A' },
    { type: 'chord', name: 'maj9',  rootNote: 'C' },
    { type: 'chord', name: '9',     rootNote: 'G' },
    { type: 'chord', name: 'sus2',  rootNote: 'D' },
  ]),
}

const dDorianModal: ReneSeqPreset = {
  name: 'D Dorian Modal Flow',
  sequence: normalizeTo16([
    { type: 'chord', name: 'm7',    rootNote: 'D' },
    { type: 'chord', name: 'm7',    rootNote: 'E' },
    { type: 'chord', name: 'maj7',  rootNote: 'F' },
    { type: 'chord', name: '7',     rootNote: 'G' },
    { type: 'chord', name: 'm7',    rootNote: 'A' },
    { type: 'chord', name: 'm7b5',  rootNote: 'B' },
    { type: 'chord', name: 'maj7',  rootNote: 'C' },
    { type: 'chord', name: 'm9',    rootNote: 'D' },
    { type: 'chord', name: '9',     rootNote: 'G' },
    { type: 'chord', name: 'm11',   rootNote: 'E' },
    { type: 'chord', name: '6',     rootNote: 'F' },
    { type: 'chord', name: 'maj9',  rootNote: 'C' },
    { type: 'chord', name: 'm11',   rootNote: 'A' },
    { type: 'chord', name: '11',    rootNote: 'D' },
    { type: 'chord', name: '7#11',  rootNote: 'G' },
    { type: 'chord', name: 'maj9',  rootNote: 'C' },
  ]),
}

const eLydianDreamscape: ReneSeqPreset = {
  name: 'E Lydian Dreamscape',
  sequence: normalizeTo16([
    { type: 'chord', name: 'maj7',    rootNote: 'E' },
    { type: 'chord', name: 'm7',      rootNote: 'F#' },
    { type: 'chord', name: 'm7',      rootNote: 'G#' },
    { type: 'chord', name: 'maj7#5',  rootNote: 'A' },   // bright color
    { type: 'chord', name: '7',       rootNote: 'B' },
    { type: 'chord', name: 'm7',      rootNote: 'C#' },
    { type: 'chord', name: 'm7b5',    rootNote: 'D#' },
    { type: 'chord', name: 'maj9',    rootNote: 'E' },
    { type: 'chord', name: 'maj9#11', rootNote: 'E' },   // Lydian color
    { type: 'chord', name: '6',       rootNote: 'E' },
    { type: 'chord', name: '7#11',    rootNote: 'B' },
    { type: 'chord', name: 'm9',      rootNote: 'F#' },
    { type: 'chord', name: 'm9',      rootNote: 'C#' },
    { type: 'chord', name: 'sus4',    rootNote: 'B' },
    { type: 'chord', name: 'm11',     rootNote: 'G#' },
    { type: 'chord', name: 'maj13',   rootNote: 'E' },
  ]),
}

const fHarmonicMinorColors: ReneSeqPreset = {
  name: 'F Harmonic Minor Colors',
  sequence: normalizeTo16([
    { type: 'chord', name: 'm',     rootNote: 'F' },
    { type: 'chord', name: 'dim',   rootNote: 'G' },
    { type: 'chord', name: 'aug',   rootNote: 'Ab' },
    { type: 'chord', name: 'm',     rootNote: 'Bb' },
    { type: 'chord', name: '7',     rootNote: 'C' },     // V of Fm
    { type: 'chord', name: 'M',     rootNote: 'Db' },
    { type: 'chord', name: 'dim7',  rootNote: 'E' },     // leading-tone dim7
    { type: 'chord', name: 'm6',    rootNote: 'F' },
    { type: 'chord', name: '7b9',   rootNote: 'C' },
    { type: 'chord', name: 'm9',    rootNote: 'Bb' },
    { type: 'chord', name: 'm#5',   rootNote: 'Ab' },
    { type: 'chord', name: '7sus4', rootNote: 'C' },
    { type: 'chord', name: 'm11',   rootNote: 'F' },
    { type: 'chord', name: 'b9sus', rootNote: 'G' },     // Phrygian-ish color
    { type: 'chord', name: 'alt7',  rootNote: 'C' },
    { type: 'chord', name: 'm13',   rootNote: 'F' },
  ]),
}



const defaultPresets: ReneSeqPreset[] = [emptyPreset, cIonianPopPalette, aAeolianCinematic, gMixolydianGroove, dDorianModal, eLydianDreamscape, fHarmonicMinorColors];
const defaultActivePresetName: string | null = emptyPreset.name;
const defaultActiveSequence: ReneSequenceStep[] = emptyPreset.sequence;

export const useReneStore = create<ReneState>((set) => ({
  sequence: defaultActiveSequence.length ? defaultActiveSequence : emptySequence16(),
  setSequence: (sequence: ReneSequenceStep[]) => set({ sequence: normalizeTo16(sequence) }),
}))

export const useRenePresets = create<RenePresetsState>()(
  persist(
    (set, get) => ({
      reneseqPresets: defaultPresets,
      activePresetName: defaultActivePresetName,

      setReneseqPresets: (reneseqPresets: ReneSeqPreset[]) => set({ reneseqPresets }),

      setActivePreset: (name: string | null) => {
        set({ activePresetName: name });
        if (name) {
          const preset = get().reneseqPresets.find(p => p.name === name);
          if (preset) {
            useReneStore.getState().setSequence(preset.sequence);
          }
        }
      },

      loadPreset: (name: string) => {
        const preset = get().reneseqPresets.find(p => p.name === name);
        if (!preset) return;
        set({ activePresetName: name });
        useReneStore.getState().setSequence(preset.sequence);
      },

      savePreset: (name: string, sequence?: ReneSequenceStep[]) => {
        const normalized = normalizeTo16(sequence ?? useReneStore.getState().sequence);
        const presets = get().reneseqPresets;
        const idx = presets.findIndex(p => p.name === name);
        const updated: ReneSeqPreset = { name, sequence: normalized };
        let nextPresets: ReneSeqPreset[];
        if (idx >= 0) {
          nextPresets = presets.slice();
          nextPresets[idx] = updated;
        } else {
          nextPresets = presets.concat(updated);
        }
        set({ reneseqPresets: nextPresets, activePresetName: name });
      },

      createPresetFromCurrent: (name: string) => {
        get().savePreset(name, useReneStore.getState().sequence);
      },

      deletePreset: (name: string) => {
        const presets = get().reneseqPresets.filter(p => p.name !== name);
        const wasActive = get().activePresetName === name;
        set({ reneseqPresets: presets, activePresetName: wasActive ? null : get().activePresetName });
      },

      renamePreset: (oldName: string, newName: string) => {
        const presets = get().reneseqPresets.map(p => p.name === oldName ? { ...p, name: newName } : p);
        const isActive = get().activePresetName === oldName;
        set({ reneseqPresets: presets, activePresetName: isActive ? newName : get().activePresetName });
      },

      // Reset all user data back to the initial constants
      resetAllPresetsToDefaults: () => {
        set({ reneseqPresets: defaultPresets, activePresetName: defaultActivePresetName });
        useReneStore.getState().setSequence(defaultActiveSequence);
      },

      // Reset a single preset back to its initial constant by name (if it exists in defaults)
      resetPresetToDefault: (name: string) => {
        const original = defaultPresets.find(p => p.name === name);
        if (!original) return;
        const presets = get().reneseqPresets;
        const idx = presets.findIndex(p => p.name === name);
        const nextPresets = idx >= 0 ? Object.assign(presets.slice(), { [idx]: original }) : presets.concat(original);
        set({ reneseqPresets: nextPresets });
        if (get().activePresetName === name) {
          useReneStore.getState().setSequence(original.sequence);
        }
      },
    }),
    {
      name: 'reneseq-presets',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        reneseqPresets: state.reneseqPresets,
        activePresetName: state.activePresetName,
      }),
      onRehydrateStorage: () => (state) => {
        const active = state?.activePresetName;
        if (active) {
          const preset = state?.reneseqPresets.find(p => p.name === active);
          if (preset) {
            useReneStore.getState().setSequence(preset.sequence);
          }
        }
      },
      // migrate: (persisted, fromVersion) => persisted,
    }
  )
)