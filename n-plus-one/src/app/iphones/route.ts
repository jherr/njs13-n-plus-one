import { NextResponse } from "next/server";

const IPHONES_API = "http://localhost:8080";

const completeData = fetch(`${IPHONES_API}`)
  .then((res) => res.json())
  .then(async (identifiers: string[]) => {
    const data = [];
    for (const identifier of identifiers) {
      const iphoneReq = await fetch(`${IPHONES_API}/${identifier}`);
      data.push(await iphoneReq.json());
    }
    return data;
  });

export async function GET() {
  return NextResponse.json(await completeData);
}
