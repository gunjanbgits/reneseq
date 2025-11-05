export default function Header() {
    return (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full z-50 bg-neutral-900 h-24 md:h-24">
            <div className="text-[14px] md:text-[16px] text-neutral-300 flex flex-col items-center justify-center leading-[1.5]">
                <pre className="uppercase text-center text-nowrap w-full">
                ▓▓▓▒▒░░░░░░░░░░░░░░░░░░══╣ <span className="text-red-500 animate-pulse">♥</span> ╠══░░░░░░░░░░░░░░░░░░▒▒▓▓▓
                </pre>
                <pre className="uppercase text-center text-nowrap w-full font-mono">
                ▓▓▓▒▒░░░░░░░══╣ ◁ ◊ ▷ <span className="text-red-500">René Quant</span> ◁ ◊ ▷  ╠══░░░░░░░▒▒▓▓▓
                </pre>
                <pre className="uppercase text-center text-nowrap w-full">
                ▓▓▓▒▒░░░░░░░░░░░░░░░░░░══╣ Ψ ╠══░░░░░░░░░░░░░░░░░░▒▒▓▓▓
                </pre>
            </div>
        </div>
    );
}