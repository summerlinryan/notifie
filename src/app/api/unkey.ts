import { withUnkey, type NextRequestWithUnkeyContext } from "@unkey/nextjs";
import { env } from "process";

export function withUnkeyAuth(
  handler: (req: NextRequestWithUnkeyContext) => Promise<Response>,
) {
  return withUnkey(handler, {
    apiId: env.UNKEY_API_ID,
    handleInvalidKey: (req, result) => {
      return new Response("Invalid API key", { status: 401 });
    },
  });
}
