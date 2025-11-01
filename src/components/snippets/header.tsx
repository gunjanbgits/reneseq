export default function Header() {
    return (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full z-50 bg-neutral-900 h-16 md:h-24">
            <div className="text-[14px] md:text-[16px] text-neutral-300 flex flex-col items-center justify-center">
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                </div>
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░ ◊ ▷{" "}
                    <span className="text-red-600 font-bold">René Quant</span> ◁ ◊
                    ░░░░░░░░░░░░░░░░░░░░░
                </div>
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                </div>
            </div>
        </div>
    );
}