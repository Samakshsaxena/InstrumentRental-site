'use client';
import { WavyBackground } from "./ui/wavy-background"
import { AnimatedTooltip } from "./ui/animated-tooltip"

const people = [
    {
        id: 1,
        name: "Arjit Singh",
        designation: "Guitar",
        image:
            "HD-wallpaper-arjith-singh-bollywood-singerITG-1745563735262.avif",
    },
    {
        id: 2,
        name: "Prateek Kuahd",
        designation: "Piano",
        image:
            "Prateek-Kuhad_1-Large.jpeg",
    },
    {
        id: 3,
        name: "Talwinder",
        designation: "Drum Set",
        image:
            "LKO_Talwiinder6_1733810743483_1733810764045.jpeg",
    },
    {
        id: 4,
        name: "Sunidhi Chauhan",
        designation: "Violin",
        image:
            "Sunidhi_Chauhan_performing_in_Delhi.jpg",
    },
    {
        id: 5,
        name: "Shreya Ghoshal",
        designation: "Guitar    ",
        image:
            "202505093399948.webp",
    },
    {
        id: 6,
        name: "Sonu Nigam",
        designation: "Guitar",
        image:
            "Tri_Nation_Mega_Concert_Sonu_Nigam_(8388639915).jpg",
    },
];


function Featured_musicians() {
    return (
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
            <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
                <p className="text-2xl md:text-4xl lg:text-5xl text-white font-bold inter-var text-center ml-10">
                    Meet the talented musicians who rent from us
                </p>
                <div className="flex flex-row items-center justify-center mb-10 w-full mt-15">
                    <AnimatedTooltip items={people} />
                </div>

            </WavyBackground>


        </div>
    )
}

export default Featured_musicians