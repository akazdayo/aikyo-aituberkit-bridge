import { Firehose } from "@aikyo/firehose";
import {
  aiTuberKitReceiveDataSchema,
  aiTuberKitSendDataSchema,
  speakDataSchema,
} from "./types/firehose";

export async function createFirehoseServer(
  port: number = 8080,
  companionName: string,
) {
  // Create a new Firehose server
  const firehose = new Firehose(port);
  await firehose.start();

  await firehose.subscribe("queries", (data) => {
    // Validate incoming data
    const parsed = speakDataSchema.safeParse(data);
    if (parsed.success && parsed.data.params.from === companionName) {
      const validData = parsed.data;

      const transformed = aiTuberKitSendDataSchema.safeParse({
        id: validData.id,
        text: validData.params.body.message,
        role: "assistant",
        emotion: validData.params.body.emotion,
        type: "message",
      });
      if (transformed.success) {
        console.log("id: ", transformed.data.id);
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

  firehose.setReceiveHandler((data: Record<string, unknown>) => {
    const parsed = aiTuberKitReceiveDataSchema.safeParse(data);
    if (!parsed.success) throw new Error("Invalid data format");
    console.log("Received valid data:", parsed.data);

    if ("content" in parsed.data) {
      return {
        topic: "messages",
        body: {
          jsonrpc: "2.0",
          method: "message.send",
          params: {
            id: crypto.randomUUID(),
            from: "user",
            to: [companionName],
            message: parsed.data.content,
          },
        },
      };
    } else {
      return {
        topic: "queries",
        body: parsed.data,
      };
    }
  });
  return firehose;
}
