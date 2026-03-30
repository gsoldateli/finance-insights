import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const WeatherInfoSkeleton = () => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-[56px] w-[56px] rounded-lg bg-blue-50/50" />
                    <div className="text-right flex flex-col items-end gap-1 mt-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12 mt-1" />
                    </div>
                </div>
                <Skeleton className="h-3 w-16 mb-2 mt-5" />
                <div className="flex items-baseline gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </CardContent>
        </Card>
    );
};
