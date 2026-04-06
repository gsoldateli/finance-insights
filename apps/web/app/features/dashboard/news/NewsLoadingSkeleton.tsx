import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

const NewsLoadingSkeleton = () => {
    return (<div className="grid grid-cols-1 gap-6">

        <NewsCardSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
        </div>
    </div>)
}



export function NewsCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="aspect-video w-full" />

            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-6 w-3/3" />
                <Skeleton className="h-6 w-3/3" />
            </CardContent>
        </Card>
    )
}


export default NewsLoadingSkeleton;