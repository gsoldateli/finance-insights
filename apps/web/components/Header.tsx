import { TrendingUp } from "lucide-react";

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between layout-container">
                <div className="flex items-center gap-2 font-bold text-xl text-[#144bb8]">
                    <TrendingUp className="h-6 w-6" />
                    <span>Finance Insights</span>
                </div>
            </div>
        </header>
    )
}