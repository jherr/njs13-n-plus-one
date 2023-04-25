import Image from "next/image";

import { IPhone } from "@/types";

export const revalidate = 60;

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

const Phones = ({ iphones }: { iphones: IPhone[] }) => {
  return (
    <>
      {iphones.map((iphone) => (
        <PhoneCard key={iphone.Identifier} iphone={iphone} />
      ))}
    </>
  );
};

export default async function Home() {
  const iphonesReq = await fetch("http://localhost:3000/iphones");
  const iphones = (await iphonesReq.json()) as IPhone[];

  return (
    <main className="text-white grid md:grid-cols-3">
      <Phones iphones={iphones} />
    </main>
  );
}
