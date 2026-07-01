import React from "react";
import type { LayoutMode } from "../../hooks/useLayoutMode";

interface FocusLayoutProps {
    layoutMode: LayoutMode;

    mode: React.ReactNode;
    cycle: React.ReactNode;
    timer: React.ReactNode;
    controls: React.ReactNode;
    task: React.ReactNode;
}

export function FocusLayout({
    layoutMode,
    mode,
    cycle,
    timer,
    controls,
    task,
}: FocusLayoutProps) {

    switch (layoutMode) {

        case "compact":
            return (
                <div className="flex flex-col items-center justify-center flex-1 gap-3">
                    {mode}
                    {cycle}
                    {timer}
                    {controls}
                    {task}
                </div>
            );

        case "regular":
            return (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    {mode}
                    {timer}
                    {cycle}
                    {controls}
                    {task}
                </div>
            );

        case "wide":
            return (
                <div className="flex flex-col items-center justify-center flex-1 gap-5">
                    {mode}
                    {timer}
                    {cycle}
                    {controls}
                    {task}
                </div>
            );

        case "ultrawide":
        default:
            return (
                <div className="flex flex-col items-center justify-center flex-1 gap-6">
                    {mode}
                    {timer}
                    {cycle}
                    {controls}
                    {task}
                </div>
            );
    }
}