"use client";

import { Scale, Chord } from "tonal";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";


export default function QuantGridBig({ rootNote, name, type }: { rootNote: string, name: string, type: string }) {
    const labels = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
    
    // Get notes based on type (scale or chord)
    const scale = Scale.get(rootNote + " " + name);
    const chord = Chord.get(rootNote + " " + name);
    const activeNotes = type === "chord" ? chord.notes : scale.notes;

    return (
        <div className="flex flex-row items-top justify-between gap-4 w-full px-3">
            <div className="flex flex-col items-left justify-top pb-2">
                <Label className="text-[14px] capitalize">{rootNote} {name}</Label>
                <Label className="text-[12px] capitalize text-neutral-300">{activeNotes.join(", ")}</Label>
            </div>
            <div className="flex flex-col items-center justify-top gap-2">
                <div className="flex flex-wrap-reverse gap-0 w-48 h-36">
                    {labels.map((note, index) => (
                        <div key={index} className="w-12 h-12 border border-neutral-900">
                            <Step root={rootNote} count={index + 1} note={note} active={isNoteActive(note, activeNotes)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Step({ count, note, active, root }: { count: number, note: string, active: boolean, root: string }) {
    // Check if this note is the root note (considering enharmonic equivalents)
    const isRoot = isNoteActive(note, [root]);
    
    return (
        <div className={cn(
            "relative flex flex-row items-center justify-center gap-1 h-full w-full p-0.5 text-neutral-100",
            isRoot ? "bg-blue-500 border-neutral-900" : active ? "bg-red-500 border-red-300" : "bg-neutral-800 border-neutral-900"
        )}>
            {/* <p className="text-sm">{count}</p> */}
            <div className={cn("text-[10px]", note.includes("#") ? "text-neutral-400" : "text-neutral-100")}>{note}</div>
        </div>
    );
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