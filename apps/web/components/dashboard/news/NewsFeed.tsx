import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

import Link from "next/link";
import { GET_NEWS_QUERY } from "./news.gql";
import { api } from "@/lib/api-client";



const NewsFeed = async () => {
    const data = await api.request(GET_NEWS_QUERY);

    const [primaryNews, ...secondaryNews] = data.getNews;

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Main News Card */}
            {primaryNews ? (
                <Link href={primaryNews?.url ?? ''} className='block'>
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                        <img src={primaryNews?.imageUrl ?? ''} alt={primaryNews?.title} className="w-full h-80 object-cover" />
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none uppercase text-[10px]">{primaryNews?.source}</Badge>
                                <span className="text-xs text-slate-400">{formatDistanceToNow(primaryNews?.publishedAt ?? 0, { addSuffix: true })}</span>
                            </div>
                            <h3 className="text-2xl font-bold leading-tight hover:text-[#144bb8] transition-colors">
                                {primaryNews?.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {primaryNews?.summary}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ) : (
                <div className="col-span-1 md:col-span-3 flex items-center justify-center h-64">
                    <p className="text-slate-500">No news available at the moment.</p>
                </div>
            )}

            {/* Secondary News Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {secondaryNews.map((news) => {
                    if (!news) return null;
                    return <Link key={news.id} href={news.url} className='block'>
                        <SecondaryNewsCard
                            category={news.source}
                            title={news.title}
                            img={news?.imageUrl ?? ''}
                            publishedAt={news?.publishedAt}
                        />
                    </Link>
                }
                )}
            </div>
        </div>
    );
}

const SecondaryNewsCard = ({ category, title, img, publishedAt }: { category: string, title: string, img: string, publishedAt: string }) => (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
        <div className={`h-48 bg-cover bg-center transition-transform group-hover:scale-105`} style={{ backgroundImage: `url(${img})` }} />
        <CardContent className="p-5 space-y-2">
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] uppercase">{category}</Badge>
                <span className="text-[10px] text-slate-400">{formatDistanceToNow(publishedAt, { addSuffix: true })}</span>
            </div>
            <h3 className="font-bold leading-snug group-hover:text-[#144bb8] transition-colors line-clamp-2">
                {title}
            </h3>
        </CardContent>
    </Card>
);

export default NewsFeed;