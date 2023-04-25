"use client";
import Image from "next/image";

import { IPhone } from "@/types";

const PhoneCard = ({ iphone }: { iphone: IPhone }) => {
  return (
    <div className="card w-96 bgn-base-100 shadow-xl">
      <figure>
        <Image
          src={`http://localhost:8080/${iphone.Image}.png`}
          alt={iphone.Generation}
          width={116}
          height={235}
        />
      </figure>
      <div className="card-body text-white">
        <h1 className="card-title text-3xl">{iphone.Generation}</h1>
        <div className="flex flex-wrap gap-1">
          {Array.from(new Set(iphone.Models.map((model) => model.Color))).map(
            (color) => (
              <span
                key={[iphone.Generation, color].join(":")}
                className="badge badge-primary badge-lg whitespace-nowrap rounded-md"
              >
                {color}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const Phones = ({ iphones }: { iphones: IPhone[] }) => {
  return (
    <>
      {iphones.map((iphone) => (
        <PhoneCard key={iphone.Identifier} iphone={iphone} />
      ))}
    </>
  );
};
