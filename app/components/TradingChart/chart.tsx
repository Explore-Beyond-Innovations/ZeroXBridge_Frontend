'use client'

import { CandlestickData, CandlestickSeries, ColorType, createChart, HistogramData, HistogramSeries, IChartApi, Time } from "lightweight-charts"
import React, { useEffect, useRef, useState } from "react"
import { DetailsIcon } from "./Coins"

type ChartProps = {
    selectedInterval: {
        name: string, secondsValue: number
    },
    isDarkMode: boolean
}

const toTime = (timestamp: number): Time => timestamp as Time

const generateMockData = () => {
    const intervalInSeconds = 300; // 5 minutes
    const numberOfPoints = 30 * 24 * 12;
    const startTime = Date.now() / 1000 - numberOfPoints * intervalInSeconds;
    const data: CandlestickData[] = [];
    let previousClose = 720000;

    for (let i = 0; i < numberOfPoints; i++) {
        const time = toTime(Math.floor(startTime + i * intervalInSeconds));
        const open = previousClose;
        const close = open + (Math.random() - 0.5) * 2000;
        const high = Math.max(open, close) + Math.random() * 1000;
        const low = Math.min(open, close) - Math.random() * 1000;
        
        data.push({ time, open, high, low, close });
        previousClose = close;
    }
    return data;
};

export default function Chart({ selectedInterval, isDarkMode }: ChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null)

    const chartRef = useRef<IChartApi | null>(null)
    const [scrollPos, setScrollPos] = useState(0)
    const [dataLength, setDataLength] = useState(0)
    
    useEffect(() => {
        
        const candleStickData = generateMockData()
        setDataLength(candleStickData.length)

        const volumeData: HistogramData[] = candleStickData.map(candle => ({
            time: candle.time,
            value: Math.floor(Math.random() * 100) + 30,
            color: '#EFF2FC'
        }))

        if (!chartContainerRef.current) return

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#808080'
            },
            width: chartContainerRef.current.clientWidth - 10,
            height: 440,
            timeScale: {
                timeVisible: true,
                barSpacing: 16,
                borderVisible: false,
                rightOffset: -4,
                fixLeftEdge: true,
                lockVisibleTimeRangeOnResize: true
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: true }
            }
        })

        chartRef.current = chart

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#CCB7FF',
            downColor: '#8280FF',
            borderVisible: false,
            wickUpColor: '#CCB7FF',
            wickDownColor: '#8280FF'
        })
        
        const volumeSeries = chart.addSeries(HistogramSeries, {
            color: '#EFF2FC',
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',  // Give volume its own scale
            priceLineVisible: false
        })

        // Configure the main price scale (candlesticks)
        chart.priceScale('right').applyOptions({
            scaleMargins: {
                top: 0.1,  // Leave space at the top
                bottom: 0.2  // Leave room for volume
            },
            borderVisible: false
        })
        
        // Configure the volume scale
        chart.priceScale('volume').applyOptions({
            scaleMargins: {
                top: 0.9,  // Position volume at the bottom
                bottom: 0  // Align with bottom of chart
            },
            borderVisible: false,
            visible: false  // Hide the volume scale
        })

        const secondsToHours = (secondsValue: number) => {
            const hoursValue = secondsValue / 3600
            return hoursValue
        }

        chart?.timeScale()?.setVisibleLogicalRange({
            from: candleStickData.length - (12 * (9 * secondsToHours(selectedInterval.secondsValue)) + 3),
            to: candleStickData.length
        })
        
        candleSeries.setData(candleStickData)
        volumeSeries.setData(volumeData)

        const handleRangeChange = () => {
            const currentPos = chart.timeScale().scrollPosition()
            setScrollPos(currentPos)
        }
        chart.timeScale().subscribeVisibleLogicalRangeChange(handleRangeChange)

        return () => {
            chart.timeScale().unsubscribeVisibleLogicalRangeChange(handleRangeChange);
            chart.remove();
        }
    }, [selectedInterval])

    const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPos = Number(e.target.value)
        setScrollPos(newPos)

        chartRef.current?.timeScale().scrollToPosition(newPos, false)
    }

    return (
        <div className="flex flex-col w-full">
            {/* Chart Container */}
            <div 
                ref={chartContainerRef}
                className="w-full h-fit py-4"
            >
            </div>

            {/* 'Scroll bar' under the chart */}
            <div className="flex justify-start gap-6 items-center w-full">
                <div className={`${isDarkMode ? 'bg-[#FAFBFF]' : 'bg-[#D5BDFF]'} px-6 flex items-center h-6 rounded -mt-1 w-full`}>
                    <input 
                        type="range" 
                        className={`custom-range ${isDarkMode ? 'bg-[#FAFBFF]' : 'bg-[#FAFBFF]'}`}
                        min={-dataLength}
                        max={0}
                        step={1}
                        value={scrollPos}
                        onChange={handleScrollChange}
                    />
                </div>
                <DetailsIcon />
            </div>
        </div>
    )
}