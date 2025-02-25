'use client'

import { useState } from "react";
import Chart from "./chart";
import { DownArrow, FilterIcon, NotificationIcon, UpArrow } from "./Coins";
import { coinData } from "./data";

type Interval = {
    name: string, secondsValue: number
}

export default function TradingChartComponent(){
    
    const intervals: Interval[] = [
        { name: '1min', secondsValue: 60},
        { name: '5min', secondsValue: 60 * 5 },
        { name: '15min', secondsValue: 60 * 15 },
        { name: '1 hr', secondsValue: 60 * 60 },
        { name: '4 hr', secondsValue: 60 * 60 * 4 }
    ]

    const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[3])


    return (
        <div className="flex justify-start items-start bg-[#21192F] w-full h-fit mt-3 mx-auto rounded-2xl">
            <div className="text-white text-xl py-12 w-[75%]">
                <h1 className="text-white flex items-center pl-11 gap-2">
                    BTC 
                    <span className="text-base text-[#808080]">/IPY</span>
                    <span className="text-base text-[#808080]">&#x2228;</span>
                </h1>

                <div className="py-3 mt-6 bg-[#3B2A65] w-full">
                    <div className="flex justify-between w-full pl-10 pr-16">
                        <p className="flex items-center gap-2">
                            <span>721,882</span>
                            <span className="text-[#EE2E6B]">-4</span>
                            <DownArrow />
                        </p>
                        <p className="flex items-center gap-2">
                            <span>High</span>
                            <span>725,974</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span>24h Volume</span>
                            <span>677.7 BTC</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span>Price Alert</span>
                            <NotificationIcon/>
                        </p>
                    </div>
                </div>
                <div className="flex justify-start gap-8 px-10 text-base text-[#808080] mt-2">
                    {/* <p>1min</p>
                    <p>5min</p>
                    <p>15min</p>
                    <p>1 hr</p>
                    <p>4 hr</p> */}
                    {
                        intervals.map((int, idx) => (
                            <p 
                                key={idx} 
                                className={`${int.secondsValue === selectedInterval.secondsValue ? 'text-white border-b border-[#A370F1]':''} cursor-pointer`}
                                onClick={() => setSelectedInterval(int)}
                            >
                                {int.name}
                            </p>
                        ))
                    }
                </div>
                <div className="pl-12 w-full">
                    <Chart selectedInterval={selectedInterval} />
                </div>
            </div>

            <div className="flex flex-col border-l-[0.1px] border-[#8280FF] text-white py-12 w-[25%]">
                <div className="flex justify-between items-center text-xl px-5">
                    <h2 className="flex gap-2 justify-start items-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0V12H0L12 0Z" fill="url(#paint0_linear_127_2178)"/>
                            <defs>
                                <linearGradient id="paint0_linear_127_2178" x1="19.6897" y1="9.99721" x2="4.73906" y2="19.4753" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6226EF"/>
                                    <stop offset="1" stopColor="#A370F1"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        Market Cap
                    </h2>
                    <FilterIcon />
                </div>

                <div className="flex flex-col mt-[22px] w-full">

                    {
                        coinData.map((coinObject, index) => {
                            const Icon = coinObject.icon
                            return (
                                <div 
                                    key={index} 
                                    className={`flex justify-between 
                                        gap-4 border-b-[0.4px] border-[#8280FF] py-3 px-4
                                        ${coinObject.name === 'BTC' && 'bg-[#3B2A65]'}
                                        `}
                                >
                                    <div className="flex gap-2 items-center text-[18px]">
                                        <Icon />
                                        {coinObject.name}
                                    </div>
                                    <p className="flex justify-start gap-2 text-[16px]">
                                        <span className="flex gap-2 items-center">
                                            ¥ {coinObject.price}
                                        </span>
                                        <span className="flex gap-2 items-center">
                                            <span className={`${coinObject.performance < 0 ? 'text-[#EE2E6B]':'text-[#01C0AA]'}`}>
                                                {coinObject.performance < 0 ? `${coinObject.performance}`:`+${coinObject.performance}`}
                                            </span>
                                            <span>
                                                {coinObject.performance < 0 ? (
                                                    <DownArrow />
                                                ) : (
                                                    <UpArrow />
                                                )}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}