import { JSX } from "react";
import { BCHIcon, BTCIcon, ETCIcon, ETHIcon, FCTIcon, LSKIcon, LTCIcon, USKIcon, XEMIcon, XRPIcon } from "./Coins";

type CoinData = {
    name: string, icon: () => JSX.Element, price: string, performance: number
}

export const coinData: CoinData[] = [
    {
        name: 'BTC',
        icon: BTCIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'BCH',
        icon: BCHIcon,
        price: '48,782',
        performance: +0.66
    },
    {
        name: 'ETH',
        icon: ETHIcon,
        price: '22,882',
        performance: -4.66
    },
    {
        name: 'LTC',
        icon: LTCIcon,
        price: '1,882',
        performance: +0.66
    },
    {
        name: 'ETC',
        icon: ETCIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'XRP',
        icon: XRPIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'FCT',
        icon: FCTIcon,
        price: '721,882',
        performance: +0.66
    },
    {
        name: 'LSK',
        icon: LSKIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'XEM',
        icon: XEMIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'XEM',
        icon: XEMIcon,
        price: '721,882',
        performance: -4.66
    },
    {
        name: 'USK',
        icon: USKIcon,
        price: '721,882',
        performance: +0.66
    },
]