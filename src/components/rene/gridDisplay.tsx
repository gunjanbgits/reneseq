"use client";

import { Scale, Chord, ChordType } from "tonal";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";


export default function QuantGridBig({ rootNote, name, type, setRootNote }: { rootNote: string | null, name: string, type: string, setRootNote: (rootNote: string | null) => void }) {
    const labels = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
    const scaleRange = ['I', 'II', 'III', 'IV']
    
    // If rootNote or name is null, render a blank grid
    let activeNotes: string[] = [];
    if (rootNote && name) {
        // Get notes based on type (scale or chord)
        const scale = Scale.get(rootNote + " " + name);
        const chord = Chord.get(rootNote + " " + name);
        activeNotes = type === "chord" ? chord.notes : scale.notes;
    }

    return (
        <div className="flex flex-row items-top justify-between gap-4 w-full px-0 pb-4">
            <div className="flex flex-col items-left justify-top text-[11px] pt-1">
                {rootNote && name ? (
                    <>
                        <div className="capitalize">░  {rootNote} {type === "chord" ? ChordType.get(name).name : name}</div>
                        {type === "chord" ? <div className="text-neutral-300">░ Aliases: {ChordType.get(name).aliases.join(", ")}</div> : null}
                        <div className="capitalize text-neutral-300">░  {activeNotes.join(", ")}</div>
                    </>
                ) : (
                    <pre className="uppercase text-neutral-300 leading-tight animate-pulse">
                        ░  Select a Root Note <br />
                        ░  & Scale or Chord type
                    </pre>
                )}
            </div>
            <div className="flex flex-col items-center justify-top gap-2">
                <div className="flex flex-wrap-reverse gap-0 w-48 h-36">
                    {labels.map((note, index) => (
                        <div key={index} className="w-12 h-12 border border-neutral-900">
                            <Step root={rootNote} count={index + 1} note={note} active={isNoteActive(note, activeNotes)} setRootNote={setRootNote} />
                        </div>
                    ))}
                    {/* {scaleRange.map((note, index) => (
                        <div key={index} className="w-12 h-12 border border-neutral-900">
                            <Step root={rootNote} count={index + 1} note={note} active={isNoteActive(note, activeNotes)} setRootNote={setScaleRangeNotes} />
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}

function Step({ count, note, active, root, setRootNote }: { count: number, note: string, active: boolean, root: string | null, setRootNote: (rootNote: string | null) => void }) {
    // Check if this note is the root note (considering enharmonic equivalents)
    const isRoot = root ? isNoteActive(note, [root]) : false;
    
    return (
        <div className={cn(
            "relative flex flex-row items-center justify-center gap-1 h-full w-full p-0.5 text-neutral-100 hover:cursor-pointer",
            isRoot ? "bg-radial from-red-400 to-red-600" : active ? "bg-red-500 border-red-300" : "bg-neutral-800 border-neutral-900"
        )} onClick={() => setRootNote(note.includes("/") ? note.slice(0, 2) : note)}>
            {/* <p className="text-sm">{count}</p> */}
            <div className={cn("text-[10px]", note.includes("#") ? "text-neutral-100" : "text-neutral-100", isRoot ? "text-[12px] font-bold underline underline-offset-5" : "text-[10px]")}>{note}</div>
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