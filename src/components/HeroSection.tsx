import Link from "next/link"
import { Spotlight } from "./ui/Spotlight"
import { Button } from "./ui/moving-border"
function HeroSection() {
    return (
        <div className="h-auto md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto scroll-py-10 md:py-0">
            <div className="p-4 relative z-10 w-full text-center mt-50">
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60"
                    fill="white"
                />
                <h1 className="mt-10 md:mt-0 text-2xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to bg-neutral-400">Play Without Limits, Rent the Sound You Love</h1>
                <p className="mt-10 font-normal text-base md:text-2xl text-neutral-300 max-w-lg mx-auto"> Discover a wide range of professionally maintained musical instruments — from guitars to grand pianos — available to rent at affordable prices. Whether you're a beginner, a performer, or just exploring, we've got the gear to match your rhythm.
                    No long-term commitments. Just pure music.
                </p>
                <div className="mt-9 mb-9">
                    <Link href={"/browse"}>
                    <Button
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 pointer cursor-pointer w-auto"
                    >
                        Start your musical journey today
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSection