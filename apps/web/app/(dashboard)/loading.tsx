// apps/web/components/news-skeleton.tsx

export default function NewsSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border-none shadow-md bg-white">
            {/* Área da Imagem (h-80 como no seu código) */}
            <div className="h-80 bg-slate-200 animate-pulse" />

            <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    {/* Badge Skeleton */}
                    <div className="h-5 w-24 bg-slate-200 rounded-full animate-pulse" />
                    {/* Time Skeleton */}
                    <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                </div>

                {/* Title Skeleton (3 linhas para garantir o espaço) */}
                <div className="space-y-2">
                    <div className="h-7 w-full bg-slate-200 rounded animate-pulse" />
                    <div className="h-7 w-5/6 bg-slate-200 rounded animate-pulse" />
                </div>

                {/* Paragraph Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}