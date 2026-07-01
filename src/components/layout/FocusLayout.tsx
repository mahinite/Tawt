import React from "react";

interface FocusLayoutProps {
    mode: React.ReactNode;
    cycle: React.ReactNode;
    timer: React.ReactNode;
    controls: React.ReactNode;
    task: React.ReactNode;
}

export function FocusLayout({
    mode,
    cycle,
    timer,
    controls,
    task,
}: FocusLayoutProps) {
    return (
        <div
            className="
            focus-layout
            flex
            flex-col
            items-center
            justify-center
            flex-1

            gap-6
            max-[850px]:gap-5
            max-[750px]:gap-4
            max-[650px]:gap-3
        "
        >

            {mode}

            {cycle}

            {timer}

            {controls}

            {task}

        </div>
    );
}