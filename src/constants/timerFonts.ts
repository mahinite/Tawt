export const TIMER_FONTS = [
    {
        id: "space-grotesk",
        name: "Space Grotesk",
        cssVariable: '"Space Grotesk", sans-serif',
        weight: 600,
    },
    {
        id: "sora",
        name: "Sora",
        cssVariable: '"Sora", sans-serif',
        weight: 500,
    },
    {
        id: "azeret-mono",
        name: "Azeret Mono",
        cssVariable: '"Azeret Mono", monospace',
        weight: 700,
    },
] as const;

export type TimerFontId = (typeof TIMER_FONTS)[number]["id"];