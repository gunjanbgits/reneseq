import ReneComp from "@/components/rene/renecomp";
import { Information } from "@/components/rene/about";
import { PresetSelector } from "@/components/rene/presetSelector";

export default function Home() {
  return (
    <div className="flex items-top justify-center bg-neutral-50 font-sans dark:bg-neutral-900 pt-24">
      <Information />
      <div className="flex flex-col items-center justify-center">
        <PresetSelector />
        <ReneComp />
      </div>
    </div>
  );
}
