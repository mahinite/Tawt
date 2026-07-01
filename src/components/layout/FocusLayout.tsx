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
                <div className="flex flex-col flex-1">

                    {/* Mode Region */}
                    <div className="flex justify-center pt-18">
                        {mode}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-5" />

                    {/* Timer Region */}
                    <div className="flex flex-col items-center justify-center flex-1 gap-6">
                        {timer}
                        {cycle}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-4" />

                    {/* Action Region */}
                    <div className="flex justify-center pb-18">
                        {controls}
                    </div>

                    {/* Task Region */}
                    <div className="flex justify-center pb-24">
                        {task}
                    </div>

                    {/* Utility Region */}
                    <div>
                        {/* Reserved for branding, audio, future utilities */}
                    </div>

                </div>
            );

        case "regular":
            return (
                <div className="flex flex-col flex-1">

                    {/* Mode Region */}
                    <div className="flex justify-center pt-20">
                        {mode}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-8" />

                    {/* Timer Region */}
                    <div className="flex flex-col items-center justify-center flex-1 gap-6">
                        {timer}
                        {cycle}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-6" />

                    {/* Action Region */}
                    <div className="flex justify-center pb-16">
                        {controls}
                    </div>

                    {/* Task Region */}
                    <div className="flex justify-center pb-26">
                        {task}
                    </div>

                    {/* Utility Region */}
                    <div />

                </div>
            );

        case "wide":
            return (
                <div className="flex flex-col flex-1">

                    {/* Mode Region */}
                    <div className="flex justify-center pt-24">
                        {mode}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-8" />

                    {/* Timer Region */}
                    <div className="flex flex-col items-center justify-center flex-1 gap-7">
                        {timer}
                        {cycle}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-6" />

                    {/* Action Region */}
                    <div className="flex justify-center pb-15">
                        {controls}
                    </div>

                    {/* Task Region */}
                    <div className="flex justify-center pb-24">
                        {task}
                    </div>

                    {/* Utility Region */}
                    <div />

                </div>
            );

        case "ultrawide":
        default:
            return (
                <div className="flex flex-col flex-1">

                    {/* Mode Region */}
                    <div className="flex justify-center pt-40">
                        {mode}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-10" />

                    {/* Timer Region */}
                    <div className="flex flex-col items-center justify-center flex-1 gap-6">
                        {timer}
                        {cycle}
                    </div>

                    {/* Region Spacer */}
                    <div className="h-6" />

                    {/* Action Region */}
                    <div className="flex justify-center pb-10">
                        {controls}
                    </div>

                    {/* Task Region */}
                    <div className="flex justify-center pb-58">
                        {task}
                    </div>

                    {/* Utility Region */}
                    <div />

                </div>
            );
    }
}