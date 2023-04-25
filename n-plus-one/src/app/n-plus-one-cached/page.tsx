import { cache } from "react";
import Image from "next/image";

import { IPhone } from "@/types";

export const revalidate = 60;

const getPhoneList = cache(async () => {
  const identifiersReq = await fetch("http://localhost:8080/");
  return (await identifiersReq.json()) as string[];
});

const getPhoneByIdentifier = cache(async (identifier: string) => {
  const phoneReq = await fetch(`http://localhost:8080/${identifier}`);
  return (await phoneReq.json()) as IPhone;
});

const PhoneCard = async ({ identifier }: { identifier: string }) => {
  const phone = await getPhoneByIdentifier(identifier);

  return (
    <div className="card w-96 bgn-base-100 shadow-xl">
      <figure>
        <Image
          src={`http://localhost:8080/${phone.Image}.png`}
          alt={phone.Generation}
          width={116}
          height={235}
        />
      </figure>
      <div className="card-body text-white">
        <h1 className="card-title text-3xl">{phone.Generation}</h1>
        <div className="flex flex-wrap gap-1">
          {Array.from(new Set(phone.Models.map((model) => model.Color))).map(
            (color) => (
              <span
                key={[phone.Generation, color].join(":")}
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

const Phones = ({ identifiers }: { identifiers: string[] }) => {
  return (
    <>
      {identifiers.map((identifier) => (
        /* @ts-expect-error Async Server Component */
        <PhoneCard key={identifier} identifier={identifier} />
      ))}
    </>
  );
};

export default async function Home() {
  const identifiers = await getPhoneList();

  return (
    <main className="text-white grid md:grid-cols-3">
      <Phones identifiers={identifiers} />
    </main>
  );
}
