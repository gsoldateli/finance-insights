import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TrendingCoinsListSkeleton = () => {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="hover:border-[#144bb8]/40 transition-colors cursor-pointer group">
                    <CardContent className="px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-20 mb-1" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                        </div>
                        <div className="text-right flex items-center">
                            <div className="mr-2">
                                <Skeleton className="h-4 w-16 mb-1" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                            <Skeleton className="h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}