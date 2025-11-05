"use client";

import { Scale, Chord } from "tonal";
import { cn } from "@/lib/utils";


export default function ReneQuantGrid({ rootNote, name, type, onClick }: { rootNote: string | null, name: string | null, type: string | null, onClick: (e: React.MouseEvent) => void }) {
    const labels = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'I', 'II', 'III', 'IV'];
    
    // If any prop is null, render a blank grid
    let activeNotes: string[] = [];
    if (rootNote && name && type) {
        // Get notes based on type (scale or chord)
        const scale = Scale.get(rootNote + " " + name);
        const chord = Chord.get(rootNote + " " + name);
        activeNotes = type === "chord" ? chord.notes : scale.notes;
    }


    // Enharmonic equivalents mapping
    const enharmonicMap: { [key: string]: string[] } = {
        'C': ['C', 'B#', 'Dbb'],
        'C#': ['C#', 'Db', 'B##'],
        'Db': ['Db', 'C#', 'B##'],
        'D': ['D', 'C##', 'Ebb'],
        'D#': ['D#', 'Eb', 'Fbb'],
        'Eb': ['Eb', 'D#', 'Fbb'],
        'E': ['E', 'D##', 'Fb'],
        'F': ['F', 'E#', 'Gbb'],
        'F#': ['F#', 'Gb', 'E##'],
        'Gb': ['Gb', 'F#', 'E##'],
        'G': ['G', 'F##', 'Abb'],
        'G#': ['G#', 'Ab'],
        'Ab': ['Ab', 'G#'],
        'A': ['A', 'G##', 'Bbb'],
        'A#': ['A#', 'Bb', 'Cbb'],
        'Bb': ['Bb', 'A#', 'Cbb'],
        'B': ['B', 'A##', 'Cb'],
        // Add missing enharmonic equivalents
        'B#': ['B#', 'C'],
        'E#': ['E#', 'F'],
        'F##': ['F##', 'G'],
        'C##': ['C##', 'D'],
        'G##': ['G##', 'A'],
        'D##': ['D##', 'E'],
        'A##': ['A##', 'B']
    };

    // Helper function to check if a label matches any active note (considering enharmonic equivalents)
    const isNoteActive = (label: string, activeNotes: string[]) => {
        // Handle labels that contain both sharp and flat (e.g., "C#/Db")
        const notesToCheck = label.includes('/') ? label.split('/') : [label];
        
        return notesToCheck.some(labelNote => {
            // Get all enharmonic equivalents for this label note
            const equivalents = enharmonicMap[labelNote] || [labelNote];
            // Check if any active note matches any equivalent of this label note
            return activeNotes.some(activeNote => {
                const activeEquivalents = enharmonicMap[activeNote] || [activeNote];
                return equivalents.some(eq => activeEquivalents.includes(eq));
            });
        });
    };

    return (
        <div onClick={onClick}>
            <div className="flex flex-col items-center justify-top">
                <div className="flex flex-wrap-reverse gap-0 w-20 h-20 md:w-32 md:h-32">
                    {labels.map((note, index) => (
                        <div key={index} className="w-5 h-5 md:w-8 md:h-8">
                            <Step root={rootNote} count={index + 1} note={note} active={isNoteActive(note, activeNotes)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Step({ count, note, active, root }: { count: number, note: string, active: boolean, root: string | null }) {
    return (
        <div className={cn("relative flex flex-row items-center justify-center gap-2 h-full w-full p-0.5 border-1 md:border-2 border-neutral-900 text-xs font-mono text-neutral-200", active ? "bg-red-500" : "bg-neutral-300/10")}>
            {/* <p className="text-sm">{count}</p> */}
            {/* <div>{note}</div> */}
            {/* <div className={cn("w-2 h-2 absolute top-1 right-1 rounded-full", root === note.slice(0, 2) ? "bg-neutral-100" : "")}></div> */}
        </div>
    );
}