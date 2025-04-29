import { Contract, Provider } from 'starknet';

// Contract address for ZeroXBridgeL2 on Sepolia
export const ZERO_X_BRIDGE_L2_ADDRESS = '0x02ec896773943d0f8e99ea6236a530c70ad377b9b5abf1ca1bcd7c9ba6646f79';

export const ZERO_X_BRIDGE_L2_ABI = [
    {
        "name": "burn",
        "type": "function",
        "inputs": [
            {
                "name": "amount",
                "type": "core::integer::u256"
            },
            {
                "name": "asset",
                "type": "felt"
            }
        ],
        "outputs": [],
        "state_mutability": "external"
    }
];

export const getZeroXBridgeL2Contract = (provider: Provider) => {
    return new Contract(ZERO_X_BRIDGE_L2_ABI, ZERO_X_BRIDGE_L2_ADDRESS, provider);
}; 