import { kyokoCompanionCard, kyokoHistory } from "./cards/kyoko";
import { ayaCompanionCard, ayaHistory } from "./cards/aya";
import { createCompanionServer } from "./utils/companion";
import { createFirehoseServer } from "./utils/firehose";

(async () => {
  createCompanionServer([{ agent: kyokoCompanionCard, history: kyokoHistory }, { agent: ayaCompanionCard, history: ayaHistory }], 5000);
  createFirehoseServer(8000, "companion_kyoko");
  createFirehoseServer(8001, "companion_aya");
})();
