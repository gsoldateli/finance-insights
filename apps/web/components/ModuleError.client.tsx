'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { useTransition } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ModuleErrorProps {
    message?: string
    moduleName: string
    customRetry?: () => void
}

export const ModuleError = ({
    message = "Error loading data",
    moduleName,
    customRetry
}: ModuleErrorProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleRetry = () => {
        if (customRetry) {
            return customRetry()
        }
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <CardContent className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-destructive/20 rounded-xl bg-destructive/5">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />

            <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-lg">Error on {moduleName}</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                    {message}
                </p>
            </div>

            <Button
                variant="outline"
                onClick={handleRetry}
                disabled={isPending}
                className="gap-2 min-w-[120px]"
            >
                {isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                    "Tentar novamente"
                )}
            </Button>
        </CardContent>
    )
}