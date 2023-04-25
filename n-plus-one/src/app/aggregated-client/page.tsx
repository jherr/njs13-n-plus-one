import Image from "next/image";

import { IPhone } from "@/types";

import { Phones } from "@/components/PhonesClient";

export const revalidate = 60;

export default async function Home() {
  const iphonesReq = await fetch("http://localhost:3000/iphones");
  const iphones = (await iphonesReq.json()) as IPhone[];

  return (
    <main className="text-white grid md:grid-cols-3">
      <Phones iphones={iphones} />
    </main>
  );
}
