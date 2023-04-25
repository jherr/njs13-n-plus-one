import { IPhone } from "@/types";

import { PhoneCard } from "@/components/PhoneCardBad";

export const revalidate = 60;

const Phones = ({ iphones }: { iphones: IPhone[] }) => {
  return (
    <>
      {iphones.map((iphone) => (
        <PhoneCard
          key={iphone.Identifier}
          iphones={iphones}
          identifier={iphone.Identifier}
        />
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
