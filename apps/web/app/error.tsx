'use client';

import React, { useEffect } from 'react';
import {
    RefreshCw,
    LineChart,

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorPageProps {
    error?: Error & { digest?: string };
    unstable_retry: () => void
}

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-6 py-6">
                <div className="max-w-2xl w-full text-center">
                    {/* Hero Error Section */}
                    <div className="relative mb-12">
                        <div className="flex items-center justify-center">
                            <LineChart className="h-16 w-16 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                            Oops! It looks like our charts got a bit lost.
                        </h1>
                        <div className="max-w-lg mx-auto">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Don't worry, your data is safe. Sometimes the market is unpredictable, but we’re already adjusting the sails. Shall we try again?
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                            <Button onClick={() => unstable_retry()} size="lg" className="font-bold gap-2 px-8">
                                <RefreshCw className="h-5 w-5" />
                                Try Again
                            </Button>

                        </div>

                        <div className="pt-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                Error Code: {error?.digest}
                            </span>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}
