import Image from "next/image";
import pointer from "../../public/up-pointer.png"
import pointerdown from "../../public/down-pointer.png"

const AboutTech = () => {
    return (
        <div>
            <div>
                <h1 className="text-[48px] text-center bg-gradient-to-r from-black from-30% via-[#A26DFF] via-50% to-black to-70% bg-clip-text text-transparent">
                    Our <span>Technology</span>
                </h1>
                <p className="text-white-2 text-center">Terms and their explanations</p>
            </div>

            <div className="text-white-style flex items-center py-20">
                <div className="leading-[3rem]">
                    <div className="flex items-center gap-4">
                        <p className="text-custom-purple text-[12px]">How ZeroXBridge differs</p>
                        <Image src={pointer} width={14} height={14} alt="up-pointer" />
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-[12px]">What is ZK Proofs</p>
                        <Image src={pointerdown} width={14} height={14} alt="up-pointer" />
                    </div>
                    <div className="flex items-center gap-4 leading-snug">
                        <p className="w-[40%] text-[12px]">Key differences between
                            ZeroXBridge and
                            Traditional Bridges</p>
                        <Image src={pointerdown} width={14} height={14} alt="up-pointer" />
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-[12px]">Security Benefits</p>
                        <Image src={pointerdown} width={14} height={14} alt="up-pointer" />
                    </div>
                </div>
                <div className="w-[50%]">
                    <p className="text-xl font-semibold text-white-2">ZeroXBridge continues to stand out from others, and here are some ways:</p>
                    <ul className="list-disc pl-6 space-y-4 mt-4">
                        <li className="text-white-2">
                            Traditional bridges fragment liquidity across multiple chains, reducing efficiency. ZeroXBridge maintains liquidity cohesion by enabling cross-chain transactions daily without worry of efficiency problems.
                        </li>
                        <li className="text-white-2">
                            Centralized bridges introduce single point of failure and custodial risks. ZeroXBridge uses decentralized, trustless zk-STARK proof to ensure security and transparency.
                        </li>
                        <li className="text-white-2">
                            Traditional bridges require moving assets between chains, thereby exposing them to security risks like hacks and exploits. ZeroXBridge eliminates this by keeping your collateral securely locked on Ethereum while unlocking liquidity on Starknet.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutTech;