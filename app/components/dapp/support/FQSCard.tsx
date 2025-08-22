"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

interface FAQsCardProps {
  href: string;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  className?: string;
}

export default function FAQsCard({
  href,
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  imageSrc = "/faq.png",
  className,
}: FAQsCardProps) {
  return (
    <Link href={href} passHref>
      <Card
        className={cn(
          "w-1/4 aspect-square border-none overflow-hidden relative transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-gradient-to-br hover:from-neutral-900 hover:to-neutral-800"
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-extralight opacity-60">
            {title}
          </CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <div className="h-full w-full absolute -bottom-20 -right-12">
          <Image
            src={imageSrc}
            alt="FAQs Illustration"
            fill
            className="object-cover scale-105"
          />
        </div>
      </Card>
    </Link>
  );
}
