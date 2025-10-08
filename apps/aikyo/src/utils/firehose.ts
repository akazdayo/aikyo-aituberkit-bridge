import { Firehose } from "@aikyo/firehose";
import { aiTuberKitEmotionSchema, aiTuberKitSendDataSchema, speakDataSchema } from "./types/firehose";
import type { QueryResult } from "@aikyo/server";


export async function createFirehoseServer(
  port: number = 8080,
  fromName: string = "user",
) {
  // Create a new Firehose server
  const firehose = new Firehose(port);
  await firehose.start();

  await firehose.subscribe("queries", (data) => {
    // Validate incoming data
    const parsed = speakDataSchema.safeParse(data);
    if (parsed.success && parsed.data.params.from === fromName) {
      const validData = parsed.data;

      const transformed = aiTuberKitSendDataSchema.safeParse({
        id: validData.id,
        text: validData.params.body.message,
        role: "assistant",
        emotion: validData.params.body.emotion,
        type: "message",
      });
      if (transformed.success) {
        console.log("Broadcasting transformed data:", transformed.data);
        firehose.broadcastToClients(transformed.data);
      } else {
        console.error("Failed to transform data:", transformed.error);
      }
    }
  });

  await firehose.subscribe("messages", (data) => {
    firehose.broadcastToClients(data);
  });
  return firehose;
}
