export default function Header() {
    return (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full z-50 bg-neutral-900 h-16">
            <div className="text-[14px] text-neutral-500">
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                </div>
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░ ◊{" "}
                    <span className="text-red-600">Rene2 Quant</span> ◊
                    ░░░░░░░░░░░░░░░░░░░░░
                </div>
                <div className="uppercase text-center text-nowrap w-full">
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                </div>
            </div>
        </div>
    );
}