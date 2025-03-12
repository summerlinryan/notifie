import { type NextRequestWithUnkeyContext } from "@unkey/nextjs";
import openai from "openai";
import { env } from "process";
import { z } from "zod";
import { db } from "~/server/db";
import { withUnkeyAuth } from "../unkey";

const todoSchema = z.object({
  file: z.string(),
  line: z.number(),
  text: z.string(),
  target: z.string(),
});

const requestSchema = z.object({
  todos: z.array(todoSchema),
});

const OPENAI_SYSTEM_PROMPT = `
Pretend you're in this timezone: {timeZone} and today's date and time 
is {currentDate}. You are a helpful assistant that converts todo 
comments into delivery times. Respond only with an ISO date string for when the 
task should be completed based on the urgency in the text. If no urgency is specified, 
default to 24 hours from now.
`;

const chatClient = new openai.OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = withUnkeyAuth(async (req: NextRequestWithUnkeyContext) => {
  const request = await requestSchema.safeParseAsync(await req.json());

  if (!request.success) {
    return Response.json(
      { error: `Invalid request body: ${request.error.message}` },
      { status: 400 },
    );
  }

  const todosWithDeliveryTimes = await Promise.all(
    request.data.todos.map(async (todo) => {
      const deliverTime = await calculateDeliveryTime(todo);
      return {
        ...todo,
        deliverTime,
      };
    }),
  );

  await db.todo.createMany({
    data: todosWithDeliveryTimes,
  });

  return Response.json({ data: todosWithDeliveryTimes }, { status: 201 });
});

async function calculateDeliveryTime(
  todo: z.infer<typeof todoSchema>,
): Promise<Date> {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const completion = await chatClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content: OPENAI_SYSTEM_PROMPT.replace("{timeZone}", timeZone).replace(
          "{currentDate}",
          new Date().toLocaleString(),
        ),
      },
      {
        role: "user",
        content: todo.text,
      },
    ],
    model: "gpt-4o-mini",
  });

  return new Date(
    completion.choices[0]?.message?.content ??
      new Date(Date.now() + 1000 * 60 * 60 * 24),
  );
}
