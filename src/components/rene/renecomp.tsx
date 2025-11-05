"use client";

import { useState } from "react";
import ReneQuantGrid from "./quantGrid";
import { Button } from "@/components/ui/button";
import { useReneStore, useRenePresets } from "@/store/rene";
import { cn } from "@/lib/utils";
import ReneQuantEdit from "./quantEdit";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ChordType } from "tonal";

export default function ReneComp() {
    const { sequence, setSequence } = useReneStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { reneseqPresets, setReneseqPresets } = useRenePresets();
    
    // Ensure we always have exactly 16 sequences
    const displaySequence = sequence.length === 16 ? sequence : [
        ...sequence,
        ...Array(16 - sequence.length).fill(null).map(() => ({
            type: null,
            name: null,
            rootNote: null
        }))
    ];
    return (
        <>
            <div className="w-full p-0">
                <div
                    className="grid grid-cols-4 grid-rows-4 gap-4 md:gap-4 max-w-[23rem] md:max-w-[35rem] mx-auto"
                    onClick={() => setActiveIndex(null)}
                >
                    {displaySequence.map((seq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "cursor-pointer p-0 flex flex-col justify-start items-center h-20 md:h-32"
                            )}
                        >
                            <ReneQuantGrid
                                rootNote={seq.rootNote}
                                name={seq.name}
                                type={seq.type}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(index);
                                }}
                            />
                            <div className="flex flex-row items-center justify-center w-20 md:w-32">
                                <p className="text-[9px] text-neutral-400 text-nowrap pt-0">
                                    {seq.rootNote && seq.name ? `${seq.rootNote} ${seq.name}` : ''}
                                    {/* {seq.type === 'chord' ? ` [ ${seq.name} ]` : ''} */}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <Drawer
                    open={activeIndex !== null}
                    onOpenChange={(open) => {
                        if (!open) {
                            setActiveIndex(null);
                        }
                    }}
                >
                    <DrawerContent className="bg-neutral-900 rounded-none">
                        <DrawerClose className="absolute top-2 right-0 z-50" asChild>
                            <Button
                                variant="secondary"
                                className="cursor-pointer text-neutral-400 hover:text-neutral-100 text-[10px] px-2"
                            >
                                [ CLOSE ]
                            </Button>
                        </DrawerClose>
                        <DrawerHeader className="flex-row items-center justify-center h-4 py-4">
                            <DrawerTitle className="hidden text-center text-[8px] capitalize">
                                {activeIndex !== null &&
                                    displaySequence[activeIndex] &&
                                    displaySequence[activeIndex].rootNote &&
                                    displaySequence[activeIndex].name &&
                                    `${displaySequence[activeIndex].rootNote} ${displaySequence[activeIndex].name}`}
                            </DrawerTitle>
                        </DrawerHeader>
                        {activeIndex !== null && displaySequence[activeIndex] && (
                            <div className="pb-16 px-2 max-w-lg mx-auto overflow-y-auto">
                                <ReneQuantEdit
                                    index={activeIndex}
                                    rootNote={displaySequence[activeIndex].rootNote}
                                    type={displaySequence[activeIndex].type}
                                    name={displaySequence[activeIndex].name}
                                />
                            </div>
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

