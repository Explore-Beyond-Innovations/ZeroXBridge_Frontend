"use client";
import React from "react";
import { Manrope, Roboto_Serif } from "next/font/google";
import Image from "next/image";
import blocky from "@/public/blocky.svg";
import ugo from "@/public/ugo-x.svg";
import x from "@/public/XLogo.svg";
import github from "@/public/GithubLogo.svg";
import blur1 from "@/public/aboutTeamBlur.svg";
import blur2 from "@/public/aboutTeamBlur2.svg";
import blur3 from "@/public/topBlur.svg";



const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});
const roboto = Roboto_Serif({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const AboutTeam = () => {
    return (
        <div className="relative overflow-hidden  py-40">
            <div className="absolute -top-[250px] left-1/2 -translate-x-1/2   z-10">
                <Image
                    src={blur3}
                    alt="Glow Effect"
                    width={700}
                    height={600}
                />
            </div>
            <div className="relative  max-w-[85%] w-[85%]   overflow-hidden  border-[5px] mx-auto z-10 rounded-[30px] h-[574px] border-[#A26DFF] flex flex-col pt-10 items-center">
                <div className="absolute top-[0px] left-0 z-0">
                    <Image
                        src={blur1}
                        alt="Glow Effect"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="absolute top-[0px] right-0 z-0">
                    <Image
                        src={blur2}
                        alt="Glow Effect"
                        width={500}
                        height={500}
                    />
                </div>


                <p
                    className={`font-bold bg-gradient-to-r  from-[#26183E] via-[#A26DFF] to-[#26183E] text-transparent bg-clip-text text-[48px] ${manrope.className}`}
                >
                    Meet the Team
                </p>{" "}
                <p
                    className={`text-[20px] font-normal rgba(212, 212, 212, 1) ${roboto.className}`}
                >
                    ZeroXBridge’s Team leads
                </p>
                <div className="flex items-center  gap-[100px] mt-10 justify-center">
                    <div className="flex flex-col items-center  justify-center">
                        <Image
                            src={ugo}
                            height={228}
                            width={228}
                            className="rounded-full"
                            alt="ugo-x"
                            priority
                        />
                        <p className={`mt-4 text-[#A26DFF] font-bold text-[16px]  ${manrope.className}`}>Ugo-X</p>
                        <p className={`${roboto.className} text-[14px] font-normal `}>Blockchain Developer</p>
                        <p className={`mb-4 text-[#8B8B8B] ${roboto.className} `}>Co-Founder</p>
                        <div className="flex gap-[18px]">
                            <a href="https://x.com/iUgo_X" target="_blank" >
                                <p className={`flex gap-[4px] justify-center items-center text-[#8B8B8B] text-[12px] ${roboto.className}`}> <Image
                                    src={x}
                                    height={16}
                                    width={16}
                                    className="rounded-full"
                                    alt="ugo-x"
                                    priority
                                /> @iUgo_X</p>
                            </a>
                            <a href="https://github.com/Ugo-X" target="_blank" >
                                <p className={`flex gap-[4px] justify-center items-center text-[#8B8B8B] text-[12px] ${roboto.className} `}>
                                    <Image
                                        src={github}
                                        height={16}
                                        width={16}
                                        className="rounded-full"
                                        alt="ugo-x"
                                        priority
                                    /> @Ugo_X</p> </a>
                        </div>

                    </div>
                    <div className="flex flex-col items-center  justify-center">
                        <Image
                            src={blocky}
                            height={228}
                            width={228}
                            className="rounded-full"
                            alt="blocky"
                            priority
                        /> <p className={`mt-4 text-[#A26DFF] font-bold text-[16px]  ${manrope.className}`}>BlockJ</p>
                        <p className={`${roboto.className} text-[14px] font-normal `}>Blockchain Developer</p>
                        <p className={`mb-4 text-[#8B8B8B] ${roboto.className} `}>Co-Founder</p>
                        <div className="flex gap-[18px]">
                            <a href="https://x.com/BlockyJ_" target="_blank" >
                                <p className={`flex gap-[4px] justify-center items-center text-[#8B8B8B] text-[12px] ${roboto.className}`}> <Image
                                    src={x}
                                    height={16}
                                    width={16}
                                    className="rounded-full"
                                    alt="ugo-x"
                                    priority
                                /> @Blockchain_J</p>
                            </a>
                            <a href="https://github.com/JoE11-y" target="_blank" >
                                <p className={`flex gap-[4px] justify-center items-center text-[#8B8B8B] text-[12px] ${roboto.className} `}>
                                    <Image
                                        src={github}
                                        height={16}
                                        width={16}
                                        className="rounded-full"
                                        alt="ugo-x"
                                        priority
                                    /> @BlockyJ</p> </a>
                        </div>
                    </div>

                </div>
            </div >

        </div>

    );
};

export default AboutTeam;
