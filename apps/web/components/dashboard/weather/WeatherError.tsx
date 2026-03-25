'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { useTransition } from "react"

export const WeatherError = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleRetry = () => {
        startTransition(() => {
            router.refresh()
        })
    }
    console.log({ isPending })
    return (
        <CardContent className="p-6">
            <p className="text-red-500 mb-2">Error loading weather.</p>
            <Button
                onClick={handleRetry}
                disabled={isPending}
            >
                {isPending ? "Loading..." : "Try again"}
            </Button>
        </CardContent>
    )
}