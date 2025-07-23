'use client'

import { InsideZeroX } from "./InsideZeroX";
import { FeaturesList } from "./ComingSoonFeatures";


 const Page = () => {
return(
    <div className="w-full min-h-screen h-full bg-black px-4 py-8 flex flex-col items-center ">
    <InsideZeroX />
    <FeaturesList />
    </div>
)
}

export default Page