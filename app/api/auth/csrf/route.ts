import { NextRequest } from "next/server";
import { getCsrfToken } from "next-auth/react";

export async function GET(req: NextRequest) {
  const csrfToken = await getCsrfToken();

  return new Response(
    JSON.stringify({
      csrfToken,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
