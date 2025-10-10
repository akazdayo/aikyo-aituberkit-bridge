import { kyokoCompanionCard, kyokoHistory } from "./cards/kyoko";
import { createCompanionServer } from "./utils/companion";
import { createFirehoseServer } from "./utils/firehose";

(async () => {
  createCompanionServer([{ agent: kyokoCompanionCard, history: kyokoHistory }], 5000);
  createFirehoseServer(8000, "companion_kyoko");
})();
