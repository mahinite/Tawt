import { useEffect, useState } from "react";

export type LayoutMode = "compact" | "regular" | "wide" | "ultrawide";

const WIDTH_REGULAR = 640;
const WIDTH_WIDE = 1024;
const WIDTH_ULTRAWIDE = 1440;
const SHORT_HEIGHT_PX = 600;
const DEFAULT_MODE: LayoutMode = "regular";

function getLayoutMode(width: number, height: number): LayoutMode {
    if (height < SHORT_HEIGHT_PX) return "compact";
    if (width < WIDTH_REGULAR) return "compact";
    if (width < WIDTH_WIDE) return "regular";
    if (width < WIDTH_ULTRAWIDE) return "wide";
    return "ultrawide";
}

export function useLayoutMode() {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
        if (typeof window === "undefined") return DEFAULT_MODE;
        return getLayoutMode(window.innerWidth, window.innerHeight);
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        let rafId: number | null = null;

        const handleResize = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                setLayoutMode(getLayoutMode(window.innerWidth, window.innerHeight));
            });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafId !== null) window.cancelAnimationFrame(rafId);
        };
    }, []);

    return layoutMode;
}