"use client";

import { useRenePresets } from "@/store/rene";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PresetSelector() {
  const { reneseqPresets, activePresetName, loadPreset } = useRenePresets();
  return (
    <div className="flex flex-row w-full items-center justify-start pb-4">
        <div className="text-[10px] text-neutral-400">BANK :: </div>
        <Select
        value={activePresetName ?? undefined}
        onValueChange={(value) => loadPreset(value)}
        >
        <SelectTrigger className="cursor-pointer px-2 border-none bg-transparent! hover:bg-neutral-700! focus:ring-0 focus-visible:ring-0 focus-visible:outline-none text-[10px]" size="sm">
            <pre>[<SelectValue placeholder={activePresetName ?? "[Init Preset]"} />]</pre>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            {reneseqPresets.map((preset) => (
                <SelectItem key={preset.name} value={preset.name} className="text-[10px]">{preset.name}</SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
        </Select>
    </div>
  )
}
