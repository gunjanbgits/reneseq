import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Information() {
  return (
    <Dialog>
        <DialogTrigger className="cursor-pointer fixed top-4 right-2 z-50" asChild>
          <Button variant="secondary" size="icon-sm">і</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-4 text-neutral-300">
            <DialogTitle>Info</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-neutral-200 text-center">
            <p className="mb-2">
            René Quant is a small tool built for exploring scales, chords, and pattern mappings for the Make Noise René 2 and similar Cartesian sequencers.
            </p>
            <p className="mb-2">
            It is an independent creative tool intended for personal and educational use.
            </p>
            <p className="my-4 text-[10px] text-neutral-400">
            René Quant is not affiliated with or endorsed by Make Noise Co.
            All product names, logos, and references to Make Noise René are trademarks of their respective owners.
            </p>
          </div>
          <div className="text-center flex flex-row items-center justify-between border-t border-neutral-800 pt-4">
            <p className="text-[10px] text-neutral-400">
                Made by <a href="https://gunjanb.space" className="text-neutral-300" target="_blank">GunjanB</a>
            </p>
            <p className="text-[10px] text-neutral-400">
                <a href="https://github.com/GunjanB/reneseq" className="text-neutral-300" target="_blank">GitHub</a>
            </p>
          </div>
          <DialogFooter className="hidden">
            <DialogClose asChild>
              <Button variant="outline">Cool!</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
