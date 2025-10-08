import { z } from "zod";

export const aiTuberKitEmotionSchema = z.enum(["neutral", "happy", "angry", "sad", "relaxed", "surprised"]);

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

export const aiTuberKitSendDataSchema = z.object({
    text: z.string(),
    role: z.literal("assistant"),
    emotion: aiTuberKitEmotionSchema.default("neutral"),
    type: z.literal("message"),
})