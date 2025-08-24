import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCryptoData = (assetId: string) => {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=7&interval=daily`,
    fetcher,
    { refreshInterval: 60000 },
  );

  const priceData =
    data?.prices?.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: price,
    })) || [];

  return {
    data: priceData,
    isLoading: !error && !data,
    error,
  };
};
