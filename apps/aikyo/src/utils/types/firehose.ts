import { MessageSchema, QueryResultSchema } from "@aikyo/server";
import { z } from "zod";

export const aiTuberKitEmotionSchema = z.enum([
  "neutral",
  "happy",
  "angry",
  "sad",
  "relaxed",
  "surprised",
]);

export const speakDataSchema = z.object({
  id: z.string(),
  params: z.object({
    type: z.literal("speak"),
    from: z.string(),
    body: z.object({
      message: z.string(),
      emotion: aiTuberKitEmotionSchema.default("neutral"),
    }),
  }),
});

export const sendMessageSchema = z.object({
  topic: z.literal("messages"),
  body: z.object({
    jsonrpc: z.literal("2.0"),
    method: z.literal("message.send"),
    params: z.object({
      id: z.string(),
      from: z.string(),
      to: z.set(z.string()),
      message: z.string(),
    }),
  }),
});

export type SendMessage = z.infer<typeof sendMessageSchema>;

export const aiTuberKitSendDataSchema = z.object({
  id: z.string(),
  text: z.string(),
  role: z.literal("assistant"),
  emotion: aiTuberKitEmotionSchema.default("neutral"),
  type: z.literal("message"),
});

export const aiTuberKitReceiveDataSchema = z.union([
  z.object({
    content: z.string(),
    type: z.literal("chat"),
  }),
  QueryResultSchema,
]);

export const RequestSchema = z.object({
  topic: z.string(),
  body: MessageSchema,
});

export type Request = z.infer<typeof RequestSchema>;
