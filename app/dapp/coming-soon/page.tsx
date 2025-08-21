"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import "../../i18n-client";

const ComingSoon = () => {
  const { t } = useTranslation();

  const data = [
    {
      title: t("comingSoon.seamlessWallet.title"),
      description: t("comingSoon.seamlessWallet.description"),
      img: (
        <Image
          src="/user.png"
          alt="img"
          width={357.5}
          height={195}
          className="absolute top-[-7px] opacity-70"
        />
      ),
    },
    {
      title: t("comingSoon.governanceDAO.title"),
      description: t("comingSoon.governanceDAO.description"),
      img: (
        <Image
          src="/voting.png"
          alt="img"
          width={357.5}
          height={195}
          className="absolute top-[0px] left-[2px] opacity-70"
        />
      ),
    },
    {
      title: t("comingSoon.accountAbstraction.title"),
      description: t("comingSoon.accountAbstraction.description"),
      img: (
        <Image
          src="/starknet.png"
          alt="img"
          width={357.5}
          height={195}
          className="absolute top-[-115px] opacity-70 scale-20"
        />
      ),
    },
    {
      title: t("comingSoon.stakingAPY.title"),
      description: t("comingSoon.stakingAPY.description"),
      img: (
        <Image
          src="/lock.png"
          alt="img"
          width={357.5}
          height={195}
          className="absolute top-[-50px] opacity-70 scale-70"
        />
      ),
    },
    {
      title: t("comingSoon.paymasterIntegration.title"),
      description: t("comingSoon.paymasterIntegration.description"),
      img: (
        <Image
          src="/eth.png"
          alt="img"
          width={357.5}
          height={195}
          className="absolute top-[-40px] opacity-70 scale-75"
        />
      ),
    },
  ];

  return (
    <main className="flex w-full justify-center max-w-7xl mx-auto md:pt-10 sm:pt-8 sm:px-[20px]">
      <div className="grid grid-cols-1 mx-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-[16px] border-[1.11px] border-[#EFEFEF] dark:border-[#202020] bg-[#FFFFFF] dark:bg-[#151515] rounded-[20px] p-[20px]"
          >
            <div className="text-black dark:text-[#FDFBFF] text-[16px] sm:text-[18px] font-light leading-[120%] tracking-[-0.02em] font-inter">
              {item.title}
            </div>
            <div className="text-[#3A3A3A] dark:text-[#B2B2B2] text-[14px] sm:text-[16px] font-light leading-[130%] sm:leading-[120%] tracking-[-0.02em] font-inter">
              {item.description}
            </div>
            <div className="relative bg-[#EFEFEF] dark:bg-[#1D1D1D] rounded-[16px] overflow-hidden h-[120px]">
              {item.img}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ComingSoon;
