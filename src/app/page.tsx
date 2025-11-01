import ReneComp from "@/components/rene/renecomp";
import { Information } from "@/components/rene/about";

export default function Home() {
  return (
    <div className="flex min-h-screen items-top justify-center bg-neutral-50 font-sans dark:bg-neutral-900 pt-16 md:pt-24">
      <Information />
      <ReneComp />
    </div>
  );
}
