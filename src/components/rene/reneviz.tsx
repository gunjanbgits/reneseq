"use client";

const grid = 16;
import { cn } from "@/lib/utils";
import { Scale, Chord, ChordType } from "tonal";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridDisplay, Step } from "./gridDisplay";
import { useReneStore } from "@/store/rene";

export default function ReneVizEditor({ index, rootNote, type, name }: { index: number, rootNote: string, type: string, name: string }) {
    const { sequence, setSequence } = useReneStore();
    const labels = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'I', 'II', 'III', 'IV'];
    const [rootNoteValue, setRootNoteValue] = useState(rootNote);
    const [typeValue, setTypeValue] = useState(type);
    const [nameValue, setNameValue] = useState(name);
    const [tab, setTab] = useState("scales");
    const [scale, setScale] = useState(Scale.get(rootNoteValue + " major"));
    const [scaleType, setScaleType] = useState("major");
    const types = ChordType.names();
    const [chordType, setChordType] = useState("major");
    const details = types.map(typeName => {
      const ct = ChordType.get(typeName);
      return {
        name: ct.name,           // human readable, e.g. "major seventh"
        aliases: ct.aliases,     // array of symbol forms, e.g. ["maj7", "M7", "Δ7"]
        intervals: ct.intervals  // interval pattern, e.g. ["1P","3M","5P","7M"]
      };
    });
    // console.log(details);
    useEffect(() => {
        setScale(Scale.get(rootNoteValue + " " + scaleType));
        setSequence(sequence.map((seq, i) => i === index ? { ...seq, rootNote: rootNoteValue, type: tab === "scales" ? "scale" : "chord", name: nameValue } : seq));
    }, [rootNoteValue, scaleType, tab, chordType]);

    return (
        <div className="py-16 w-full">
            <div className="mx-auto my-8 p-2">
                <div className="flex justify-between items-top gap-8">
                    <div className="flex flex-col gap-4">
                            <div>
                                <Label className="text-[10px] uppercase tracking-wide font-medium pb-1">Root Note</Label>
                                <RootNoteSelector rootNote={rootNoteValue} setRootNote={setRootNoteValue} />
                            </div>
                            <Tabs defaultValue={tab} onValueChange={setTab}>
                                <TabsList>
                                    <TabsTrigger value="scales">Scales</TabsTrigger>
                                    <TabsTrigger value="chords">Chords</TabsTrigger>
                                </TabsList>
                                <TabsContent value="scales" className="border-1 rounded-lg border-neutral-100 p-2 bg-neutral-200">
                                    <ScaleTypeSelector scaleType={scaleType} setScaleType={setScaleType} />
                                </TabsContent>
                                <TabsContent value="chords" className="border-1 rounded-lg border-neutral-100 p-2 bg-neutral-200">
                                    <ChordTypeSelector chordType={chordType} setChordType={setChordType} />
                                </TabsContent>
                            </Tabs>
                            {/* <div>Normalized: {scale.normalized}</div>
                            <div>Chroma: {scale.chroma}</div> */}
                    </div>
                    <div>
                        {tab === "chords" ? (
                            <ChordGridDisplay labels={labels} chordType={chordType} rootNote={rootNoteValue} />
                        ) : (
                            <GridDisplay scale={scale.chroma} scaleType={scaleType} scaleNotes={scale.notes} rootNote={rootNoteValue} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChordGridDisplay({ labels, chordType, rootNote }: { labels: string[], chordType: string, rootNote: string }) {
    const chordNotes = Chord.get(rootNote + " " + chordType).notes;
    // console.log(chordNotes);
    
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
    
    // Helper function to check if a label matches any chord note (considering enharmonic equivalents)
    const isNoteInChord = (label: string, chordNotes: string[]) => {
        // Handle labels that contain both sharp and flat (e.g., "C#/Db")
        const notesToCheck = label.includes('/') ? label.split('/') : [label];
        
        return notesToCheck.some(labelNote => {
            // Get all enharmonic equivalents for this label note
            const equivalents = enharmonicMap[labelNote] || [labelNote];
            // Check if any chord note matches any equivalent of this label note
            return chordNotes.some(chordNote => {
                const chordEquivalents = enharmonicMap[chordNote] || [chordNote];
                return equivalents.some(eq => chordEquivalents.includes(eq));
            });
        });
    };
    
    return (
        <div>
            <div className="flex flex-col gap-0 py-1 items-center justify-center">
                <div className="text-xs font-mono text-neutral-900 uppercase">{rootNote} {chordType}</div>
                <div className="text-xs font-mono text-neutral-500">{chordNotes.join(",")}</div>
            </div>
            <div className="flex flex-wrap-reverse gap-0 w-48 h-48">
                {labels.map((note, index) => (
                    <div key={index} className="w-12 h-12 p-0.5">
                        <Step root={rootNote} count={index + 1} note={note} active={isNoteInChord(note, chordNotes)} />
                    </div>
                ))}
            </div>
        </div>
    );
}


function RootNoteSelector({ rootNote, setRootNote }: { rootNote: string, setRootNote: (rootNote: string) => void }) {
    const chromaticNotes = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
    return (
        <div className="flex flex-row gap-1 p-2 bg-neutral-200 rounded-lg w-fit">
            {chromaticNotes.map((note) => (
                <div  key={note} className={cn("flex flex-row justify-center h-10", note.toLowerCase().includes("#") ? "items-start" : "items-end")}>
                    <Badge className="cursor-pointer text-[12px] font-mono" variant={(rootNote === note.slice(0, 2) ? "default" : "secondary")} onClick={() => setRootNote(note.slice(0, 2))}>{note}</Badge>
                </div>
            ))}
        </div>
    );
}

function ScaleTypeSelector({ scaleType, setScaleType }: { scaleType: string, setScaleType: (scaleType: string) => void }) {
    const scaleTypes = ['major', 'minor', 'pentatonic', 'harmonic minor', 'harmonic major', 'melodic minor', 'melodic major', 'diminished', 'augmented'];
    const interestingScales = [
        "major",
        "minor",
        "minor pentatonic",
        "major pentatonic",
        "dorian",
        "mixolydian",
        "lydian",
        "phrygian",
        "harmonic minor",
        "melodic minor",
        "whole tone",
        "diminished",
        "augmented",
        "phrygian dominant",
        "enigmatic"
      ];
      
    const scaleTypeAll = Scale.names();
    // console.log(scaleTypeAll);
    return (
        <div className="flex flex-row gap-2 flex-wrap pt-1 w-fit">
            {interestingScales.map((type) => (
                <Badge className="cursor-pointer text-[12px] font-mono whitespace-nowrap capitalize" variant={(scaleType === type ? "default" : "secondary")} key={type} onClick={() => setScaleType(type)}>{type}</Badge>
            ))}
        </div>
    );
}

function ChordTypeSelector({ chordType, setChordType }: { chordType: string, setChordType: (chordType: string) => void }) {

    const chordTypeAll = ChordType.names();
    
    // Create chord type details with aliases for display
    const chordTypeDetails = chordTypeAll.map(typeName => {
        const ct = ChordType.get(typeName);
        return {
            name: ct.name,           // full name for comparison
            aliases: ct.aliases,     // array of symbol forms
            displayLabel: ct.aliases.length > 0 ? ct.aliases[0] : ct.name // use first alias or fallback to name
        };
    });
    
    return (
        <div className="flex flex-row gap-2 flex-wrap pt-1">
            {chordTypeDetails.map((typeDetail) => (
                <Badge 
                    className="cursor-pointer text-[12px] font-mono whitespace-nowrap" 
                    variant={(chordType === typeDetail.name ? "default" : "secondary")} 
                    key={typeDetail.name} 
                    onClick={() => setChordType(typeDetail.name)}
                >
                    {typeDetail.displayLabel}
                </Badge>
            ))}
        </div>
    );
}
