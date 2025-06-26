"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        quote: "The guitar was in excellent condition, and the sound quality was top-notch. Perfect for my weekend gigs Highly recommended!",
        name: "Aarav M.",
        title: " Guitar",
    },
    {
        quote: "I needed drums for my college fest, and the set delivered was just awesome. Smooth booking and fast delivery too!",
        name: "Naina R.",
        title: "Drum Kit",
    },
    {
        quote: "The violin was perfect for my exam prep. Clean, balanced, and easy to play. I’ll rent again for sure!",
        name: "Simran K.",
        title: "Violin",
    },
]

function User_review() {
    return (
        <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            <div className="">
                <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-bold inter-var text-center relative z-10">
                    Real Experiences. Real Music.
                </h1>

                <div className="h-[30rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden mt-2">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="normal"
                    />
                </div>
            </div>

        </div>
    );

}
export default User_review

