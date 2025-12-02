'use client';
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            className="bg-[var(--color-light-blue)] text-[var(--color-dark-blue)] dark:bg-[var(--color-light-body)] dark:text-[#F3722C]"
            onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }}
            >
            {resolvedTheme === 'dark' ? (
                <SunIcon className="size-4 text-[#F3722C]" />
            ) : (
                <MoonIcon className="size-4 text-[var(--color-dark-blue)]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}