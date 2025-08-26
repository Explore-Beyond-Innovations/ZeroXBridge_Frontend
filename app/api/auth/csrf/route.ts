import { NextRequest } from "next/server";
import { getCsrfToken } from "next-auth/react";

export async function GET(req: NextRequest) {
  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    return new Response(
      JSON.stringify({
        error: "Failed to generate CSRF token",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

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
