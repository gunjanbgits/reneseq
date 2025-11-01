"use client";



import { useReneStore } from "@/store/rene";
import { Button } from "../ui/button";
import { Scale, ChordType } from "tonal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import QuantGridBig from "./gridDisplay";

export default function ReneQuantEdit({ index, rootNote, type, name }: { index: number, rootNote: string, type: string, name: string }) {
    const { sequence, setSequence } = useReneStore();
    
    const [rootNoteValue, setRootNoteValue] = useState(rootNote);
    const [tab, setTab] = useState(type === "chord" ? "chords" : "scales");
    const [seqName, setSeqName] = useState(name);

    // Handle tab changes - set appropriate default values
    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        if (newTab === "scales" && tab === "chords") {
            // Switching from chords to scales - set default scale
            setSeqName("major");
        } else if (newTab === "chords" && tab === "scales") {
            // Switching from scales to chords - set default chord
            setSeqName("major");
        }
    };

    // Sync local state when props change (when switching to a different sequence)
    useEffect(() => {
        setRootNoteValue(rootNote);
        setTab(type === "chord" ? "chords" : "scales");
        setSeqName(name);
    }, [index, rootNote, type, name]);

    // Auto-update sequence when any value changes
    useEffect(() => {
        updateSequence();
    }, [rootNoteValue, tab, seqName]);

    function updateSequence() {
        setSequence(sequence.map((seq, i) => i === index ? { 
            ...seq, 
            rootNote: rootNoteValue, 
            type: tab === "scales" ? "scale" : "chord", 
            name: seqName 
        } : seq));
    }
    
    return (
        <div className="flex flex-col large:flex-row">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center justify-center mt-2">
                    <QuantGridBig rootNote={rootNoteValue} name={seqName} type={tab === "scales" ? "scale" : "chord"} />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <RootNoteSelector rootNote={rootNoteValue} setRootNote={setRootNoteValue} />
                </div>
                <Tabs className="w-full pt-2" defaultValue={tab} onValueChange={handleTabChange}>
                    <TabsList className="w-full">
                        <TabsTrigger value="scales">Scales</TabsTrigger>
                        <TabsTrigger value="chords">Chords</TabsTrigger>
                    </TabsList>
                    <TabsContent value="scales">
                        <ScaleTypeSelector scaleType={tab === "scales" ? seqName : "major"} setScaleType={setSeqName} />
                    </TabsContent>
                    <TabsContent value="chords">
                        <ChordTypeSelector chordType={tab === "chords" ? seqName : "major"} setChordType={setSeqName} />
                    </TabsContent>
                </Tabs>
            </div>
            <div className="mt-0 absolute top-2 left-2 z-50">
                    <Button onClick={updateSequence} size="icon" className="cursor-pointer text-neutral-400" variant="secondary">
                    ✧
                    </Button>
            </div>
        </div>
    );
}



function RootNoteSelector({ rootNote, setRootNote }: { rootNote: string, setRootNote: (rootNote: string) => void }) {
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = [
        { note: 'C#/Db', after: 'C' },
        { note: 'D#/Eb', after: 'D' },
        { note: 'F#/Gb', after: 'F' },
        { note: 'G#/Ab', after: 'G' },
        { note: 'A#/Bb', after: 'A' },
    ];
    
    return (
        <div className="relative flex flex-row justify-center items-end gap-0 w-full pb-0 pt-10">
            {whiteKeys.map((note, index) => {
                // Find black keys that come after this white key
                const followingBlackKey = blackKeys.find(bk => bk.after === note);
                
                return (
                    <div key={note} className="relative flex items-end gap-1">
                        {/* White key */}
                        <Button 
                            size="sm" 
                            className="cursor-pointer rounded-xl font-mono text-[16px] font-bold h-16 w-12 border border-neutral-900" 
                            variant={rootNote === note ? "destructive" : "outline"}
                            onClick={() => setRootNote(note)}
                        >
                            {note}
                        </Button>
                        {/* Black key positioned between this and next white key */}
                        {followingBlackKey && (
                            <div className="absolute -top-8 left-full -translate-x-1/2 z-20">
                                <Button 
                                    className="cursor-pointer rounded-xl font-mono text-[9px] w-7 h-12 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 shadow-lg" 
                                    variant={rootNote === followingBlackKey.note.slice(0, 2) ? "destructive" : "default"}
                                    onClick={() => setRootNote(followingBlackKey.note.slice(0, 2))}
                                >
                                    <div className="flex flex-col items-center leading-none opacity-90 -space-y-0.5">
                                        <span>{followingBlackKey.note.slice(0, 2)}</span>
                                        <span>⁄</span>
                                        <span>{followingBlackKey.note.slice(-2)}</span>
                                    </div>
                                </Button>
                            </div>
                        )}
                    </div>
                );
            })}
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
        <div className="flex flex-wrap gap-1">
            {interestingScales.map((type) => (
                <Button size="sm" className="cursor-pointer whitespace-nowrap capitalize" variant={(scaleType === type ? "destructive" : "outline")} key={type} onClick={() => setScaleType(type)}>{type}</Button>
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
        <div className="flex flex-wrap gap-1">
            {chordTypeDetails.map((typeDetail) => (
                <Button 
                    className="cursor-pointer whitespace-nowrap" 
                    variant={(chordType === typeDetail.name ? "destructive" : "outline")} 
                    key={typeDetail.name} 
                    size="sm"
                    onClick={() => setChordType(typeDetail.name)}
                >
                    {typeDetail.displayLabel}
                </Button>
            ))}
        </div>
    );
}
