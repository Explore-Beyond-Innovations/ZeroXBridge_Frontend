'use client'

import { InsideZeroX } from "./InsideZeroX";
import { FeaturesList } from "./ComingSoonFeatures";


 const Page = () => {
return(
    <div className="w-full min-h-screen h-full bg-[#0a0a0a] px-4 py-8 2xl:px-[20px] flex flex-col items-center ">
    <InsideZeroX />
    <FeaturesList />
    </div>
)
}

export default Page