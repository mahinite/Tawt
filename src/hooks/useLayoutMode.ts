import { useEffect, useState } from "react";

export type LayoutMode =
    | "compact"
    | "regular"
    | "wide"
    | "ultrawide";

function getLayoutMode(width: number): LayoutMode {
    if (width < 640) return "compact";
    if (width < 1024) return "regular";
    if (width < 1440) return "wide";
    return "ultrawide";
}

export function useLayoutMode() {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>(
        getLayoutMode(window.innerWidth)
    );

    useEffect(() => {
        const handleResize = () => {
            setLayoutMode(getLayoutMode(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return layoutMode;
}