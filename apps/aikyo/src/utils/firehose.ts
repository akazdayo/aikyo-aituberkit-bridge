import { Firehose } from "@aikyo/firehose";

export async function createFirehoseServer(
  port: number = 8080,
  fromName: string = "user",
) {
  const firehose = new Firehose(port);
  await firehose.start();

  await firehose.subscribe("queries", (data) => {
    if (
      "params" in data &&
      data.params.type === "speak" &&
      data.params.from === fromName &&
      data.params.body &&
      data.params.body.message
    ) {
      const emotion = data.params.body ? data.params.body.emotion : "neutral";

      const transformed = {
        id: data.id,
        text: data.params.body.message,
        role: "assistant",
        emotion,
        type: "message",
      };

      firehose.broadcastToClients(transformed);
    }
  });

  await firehose.subscribe("messages", (data) => {
    firehose.broadcastToClients(data);
  });
  return firehose;
}
