"use client";

import { useState } from "react";
import ReneQuantGrid from "./quantGrid";
import { Button } from "@/components/ui/button";
import { useReneStore } from "@/store/rene";
import { cn } from "@/lib/utils";
import ReneQuantEdit from "./quantEdit";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

export default function ReneComp() {
    const { sequence, setSequence } = useReneStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // console.log(activeIndex);
    const deleteGridButton = (index: number) => {
        setSequence(sequence.filter((_, i) => i !== index));
        // Reset active index if we deleted the active sequence
        if (activeIndex === index) {
            setActiveIndex(null);
        } else if (activeIndex !== null && activeIndex > index) {
            // Adjust active index if we deleted a sequence before the active one
            setActiveIndex(activeIndex - 1);
        }
    };
    return (
        <>
            <div className="w-full p-4">
                <div
                    className="flex flex-wrap gap-x-2 gap-y-4 md:gap-y-8 max-w-[19rem] md:max-w-2xl mx-auto"
                    onClick={() => setActiveIndex(null)}
                >
                    {sequence.map((seq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "cursor-pointer p-0 flex flex-col justify-start"
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
                            <div className="flex flex-row items-top justify-between capitalize w-24 md:w-32 pt-0">
                                <p className="text-[9px] md:text-[13px] text-neutral-400 text-wrap pt-1.5">
                                    {seq.rootNote} {seq.name}
                                </p>
                                <div>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer text-neutral-500 md:text-[20px]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteGridButton(index);
                                        }}
                                    >
                                        ×
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <AddGridButton setActiveIndex={setActiveIndex} />
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
                        <DrawerClose className="absolute top-2 right-2 z-50" asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="cursor-pointer"
                            >
                                ×
                            </Button>
                        </DrawerClose>
                        <DrawerHeader className="flex-row items-center justify-center h-4 py-4">
                            <DrawerTitle className="hidden text-center text-[8px] capitalize">
                                {activeIndex !== null &&
                                    sequence[activeIndex] &&
                                    `${sequence[activeIndex].rootNote} ${sequence[activeIndex].name}`}
                            </DrawerTitle>
                        </DrawerHeader>
                        {activeIndex !== null && sequence[activeIndex] && (
                            <div className="pb-16 px-2 max-w-lg mx-auto overflow-y-auto">
                                <ReneQuantEdit
                                    index={activeIndex}
                                    rootNote={sequence[activeIndex].rootNote}
                                    type={sequence[activeIndex].type}
                                    name={sequence[activeIndex].name}
                                />
                            </div>
                        )}
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

function AddGridButton({
    setActiveIndex,
}: {
    setActiveIndex: (index: number) => void;
}) {
    const { sequence, setSequence } = useReneStore();

    const addNewSequence = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newSequence = { name: "major", rootNote: "C", type: "scale" };
        const newIndex = sequence.length;
        setSequence([...sequence, newSequence]);
        // Auto-select the newly added sequence for immediate editing
        setActiveIndex(newIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer w-24 h-24 md:w-32 md:h-32"
                onClick={addNewSequence}
            >
                <div className="text-[24px] text-neutral-400">+</div>
            </Button>
        </div>
    );
}
