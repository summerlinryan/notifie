import { Unkey } from "@unkey/api";
import { env } from "process";

const unkey = new Unkey({
  rootKey: env.UNKEY_ROOT_KEY!,
});

export default unkey;
