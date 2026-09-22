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
    return (
        <div className="flex flex-col flex-1 min-h-0" data-layout={layoutMode}>
            <div className="flex justify-center pt-region-top">{mode}</div>
            <div className="h-region-gap" />
            <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-region-gap-cycle">
                {timer}
                {cycle}
            </div>
            <div className="h-region-gap-tight" />
            <div className="flex justify-center pb-region-bottom-ctl">{controls}</div>
            <div className="h-region-gap-xs" />
            <div className="flex justify-center pb-region-bottom-task min-h-0">{task}</div>
            <div />
        </div>
    );
}